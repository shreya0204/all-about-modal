#!/bin/bash
set -x
set -euo pipefail

cp -r ./assets/screenshots/* ./assets/

# Cleanup.
rm -f README.md
rm -rf .tests
rm -rf .github
rm -rf bin
rm -f .nvmrc
rm -f .gitignore
rm -f .wp-env.json
rm -f LICENSE
rm -f package.json
rm -f package-lock.json
rm -f composer.lock
rm -f phpcs.xml.dist
rm -rf tests
rm -f .browserslistrc
rm -f .editorconfig
rm -f .eslintignore
rm -f .eslintrc.json
rm -f .lintstagedrc.js
rm -f .npmrc
rm -f .stylelintignore
rm -f .stylelintrc.json
rm -f .wp-env.json
rm -f babel.config.js
rm -f composer.json
rm -f phpunit.xml.dist
rm -f webpack.config.js

set +x
