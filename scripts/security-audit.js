const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Security Audit Script
 * Runs comprehensive security checks on the project
 */

console.log("========================================");
console.log("Security Audit - Cultural Crowdfunding Platform");
console.log("========================================\n");

const results = {
  timestamp: new Date().toISOString(),
  checks: [],
  summary: {
    passed: 0,
    warnings: 0,
    failed: 0,
  },
};

/**
 * Run a security check and record results
 */
function runCheck(name, command, isCritical = true) {
  console.log(`\n[${name}]`);
  console.log("─".repeat(50));

  try {
    const output = execSync(command, {
      encoding: "utf8",
      stdio: "pipe",
    });

    console.log("✅ PASSED");
    if (output) {
      console.log(output);
    }

    results.checks.push({
      name,
      status: "passed",
      critical: isCritical,
      output: output || "No issues found",
    });
    results.summary.passed++;

    return true;
  } catch (error) {
    const status = isCritical ? "failed" : "warning";
    const symbol = isCritical ? "❌" : "⚠️";

    console.log(`${symbol} ${status.toUpperCase()}`);
    console.log(error.stdout || error.message);

    results.checks.push({
      name,
      status,
      critical: isCritical,
      output: error.stdout || error.message,
    });

    if (isCritical) {
      results.summary.failed++;
    } else {
      results.summary.warnings++;
    }

    return false;
  }
}

// 1. NPM Audit
runCheck(
  "NPM Dependency Vulnerabilities",
  "npm audit --audit-level=moderate",
  true
);

// 2. Solidity Linting
runCheck("Solidity Code Quality (Solhint)", "npm run lint:sol", true);

// 3. JavaScript Linting
runCheck(
  "JavaScript Code Quality (ESLint)",
  "npx eslint scripts/ test/ --ext .js",
  false
);

// 4. Code Formatting
runCheck("Code Formatting Check (Prettier)", "npm run prettier:check", false);

// 5. Contract Compilation
runCheck("Contract Compilation", "npx hardhat compile", true);

// 6. Gas Usage Analysis
if (process.env.REPORT_GAS === "true") {
  runCheck("Gas Usage Analysis", "npx hardhat test", false);
}

// 7. Check for hardcoded secrets
console.log("\n[Secrets Scan]");
console.log("─".repeat(50));
const secretPatterns = [
  /private.*key.*=.*["']0x[a-fA-F0-9]{64}["']/i,
  /mnemonic.*=.*["'][^"']+["']/i,
  /api.*key.*=.*["'][^"']+["']/i,
];

let secretsFound = false;
const jsFiles = execSync('find . -name "*.js" -not -path "*/node_modules/*"', {
  encoding: "utf8",
})
  .trim()
  .split("\n");

for (const file of jsFiles) {
  if (!file) {
    continue;
  }
  try {
    const content = fs.readFileSync(file, "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(content)) {
        console.log(`⚠️  Potential secret found in: ${file}`);
        secretsFound = true;
      }
    }
  } catch (err) {
    // Skip files that can't be read
  }
}

if (!secretsFound) {
  console.log("✅ No hardcoded secrets detected");
  results.checks.push({
    name: "Secrets Scan",
    status: "passed",
    critical: true,
    output: "No hardcoded secrets found",
  });
  results.summary.passed++;
} else {
  console.log("⚠️  Review files for potential secrets");
  results.checks.push({
    name: "Secrets Scan",
    status: "warning",
    critical: false,
    output: "Potential secrets detected - review required",
  });
  results.summary.warnings++;
}

// 8. Check .env.example exists
console.log("\n[Environment Configuration]");
console.log("─".repeat(50));
if (fs.existsSync(".env.example")) {
  console.log("✅ .env.example file exists");
  results.checks.push({
    name: "Environment Template",
    status: "passed",
    critical: false,
    output: ".env.example file present",
  });
  results.summary.passed++;
} else {
  console.log("❌ .env.example file missing");
  results.checks.push({
    name: "Environment Template",
    status: "failed",
    critical: true,
    output: ".env.example file not found",
  });
  results.summary.failed++;
}

// 9. Check gitignore for sensitive files
console.log("\n[Git Security]");
console.log("─".repeat(50));
if (fs.existsSync(".gitignore")) {
  const gitignoreContent = fs.readFileSync(".gitignore", "utf8");
  const requiredEntries = [".env", "node_modules", "*.key", "*.pem"];
  const missing = requiredEntries.filter((entry) => !gitignoreContent.includes(entry));

  if (missing.length === 0) {
    console.log("✅ .gitignore properly configured");
    results.checks.push({
      name: "Git Security",
      status: "passed",
      critical: true,
      output: ".gitignore includes sensitive file patterns",
    });
    results.summary.passed++;
  } else {
    console.log(`⚠️  Missing entries in .gitignore: ${missing.join(", ")}`);
    results.checks.push({
      name: "Git Security",
      status: "warning",
      critical: false,
      output: `Missing .gitignore entries: ${missing.join(", ")}`,
    });
    results.summary.warnings++;
  }
}

// Summary
console.log("\n========================================");
console.log("Security Audit Summary");
console.log("========================================");
console.log(`✅ Passed:   ${results.summary.passed}`);
console.log(`⚠️  Warnings: ${results.summary.warnings}`);
console.log(`❌ Failed:   ${results.summary.failed}`);
console.log(`Total Checks: ${results.checks.length}`);
console.log("========================================\n");

// Save results
const reportDir = path.join(__dirname, "..", "reports");
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir);
}

const reportFile = path.join(
  reportDir,
  `security-audit-${Date.now()}.json`
);
fs.writeFileSync(reportFile, JSON.stringify(results, null, 2));
console.log(`📁 Detailed report saved to: ${reportFile}\n`);

// Exit with error if critical checks failed
if (results.summary.failed > 0) {
  console.error("❌ Security audit failed with critical issues\n");
  process.exit(1);
} else if (results.summary.warnings > 0) {
  console.log("⚠️  Security audit completed with warnings\n");
  process.exit(0);
} else {
  console.log("✅ Security audit passed all checks\n");
  process.exit(0);
}
