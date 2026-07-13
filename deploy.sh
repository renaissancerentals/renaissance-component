#!/bin/bash

set -euo pipefail

# Step 1: Verify the build
echo "🛠️ Verifying build and running tests..."
npm run build --if-present
npm test --if-present

# Step 2: Bump npm patch version
echo "🔢 Bumping npm patch version..."
NEW_VERSION=$(npm version patch --no-git-tag-version)
echo "✅ New version generated: $NEW_VERSION"

# Step 3: Run deploy script
echo "🚀 Running deployment script..."
npm run deploy

# Step 4: Stage all changes (source code, package files, and deploy artifacts)
echo "➕ Staging all changes..."
git add .

# Step 5: Prompt for commit message
echo ""
read -rp "✍️ Enter your commit message: " USER_MSG
COMMIT_MSG="$USER_MSG ($NEW_VERSION)"

# Step 6: Commit everything together
echo "📦 Committing all changes with message: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Step 7: Create git tag matching the version
git tag "$NEW_VERSION"

# Step 8: Push to GitHub
echo "📤 Pushing code and tags to origin main..."
git push origin main
git push origin "$NEW_VERSION"

# Step 9: Publish to npm registry
echo "🚀 Publishing to npm registry..."
npm publish --access public

echo "🎉 Release complete: $NEW_VERSION"
