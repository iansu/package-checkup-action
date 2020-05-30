# Package Checkup Action

[![Build status](https://github.com/iansu/package-checkup-action/workflows/CI/badge.svg)](https://github.com/iansu/package-checkup-action/actions)

GitHub Action to check for vulnerable, outdated or unused dependencies in JavaScript or TypeScript projects.

This Action posts a comment on all Pull Requests with information about outdated packages, packages with security issues and unused packages as specified in `package.json`.

## Requirements

Supported package managers are [npm](https://www.npmjs.com/) and [Yarn](https://classic.yarnpkg.com/lang/en/) v1.

## Usage

Create a file in your repo named `.github/workflows/package-checkup.yml` with the following contents:

```yml
name: Package Checkup

on:
  pull_request:
    types: ['opened', 'edited', 'reopened', 'synchronize']

jobs:
  title:
    name: checkup
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Check dependencies
        uses: package-checkup-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Settings

The following properties can be set under `with` in the workflow:

| Name                 | Description                                | Default | Required |
| -------------------- | ------------------------------------------ | ------- | -------- |
| showOutdatedPackages | Show a list of outdated packages           | true    | No       |
| token                | GitHub token used to post a comment on PRs |         | Yes      |

## Credits

Made with :tumbler_glass: by [Ian Sutherland](https://iansutherland.ca) ([@iansu](https://twitter.com/iansu)). This project is released under the [MIT](/LICENSE) license.
