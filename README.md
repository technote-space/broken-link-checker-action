# Broken Link Checker Action

[![CI Status](https://github.com/technote-space/broken-link-checker-action/workflows/CI/badge.svg)](https://github.com/technote-space/broken-link-checker-action/actions)
[![codecov](https://codecov.io/gh/technote-space/broken-link-checker-action/branch/main/graph/badge.svg)](https://codecov.io/gh/technote-space/broken-link-checker-action)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/broken-link-checker-action/badge)](https://www.codefactor.io/repository/github/technote-space/broken-link-checker-action)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/broken-link-checker-action/blob/main/LICENSE)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

GitHub Actions that detects broken links in a page with a specified URL and creates issues.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [Usage](#usage)
- [Screenshot](#screenshot)
- [Options](#options)
- [Author](#author)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
e.g. `.github/workflows/broken-link-check.yml`

```yaml
on:
  schedule:
    - cron: 0 0 1 * * # run monthly
  repository_dispatch: # run manually
    types: [check-link]
  # push:
  # ...

name: Broken Link Check
jobs:
  check:
    name: Broken Link Check
    runs-on: ubuntu-latest
    steps:
      - name: Broken Link Check
        uses: technote-space/broken-link-checker-action@v2
```

## Screenshot
![issue](https://raw.githubusercontent.com/technote-space/broken-link-checker-action/images/issue.png)

## Options
| name | description | default | required | e.g. |
|:---:|:---|:---:|:---:|:---:|
| TARGET | Target link | `https://github.com/${{ github.repository }}` | true | `https://example.com` |
| RECURSIVE | Recursive? | | | `true` |
| TITLE | Issue title | `Broken link found (${URL})` | true | `${URL} is broken` |
| BODY | Issue body | see [action.yml](action.yml) | true | |
| LABELS | Labels | | | |
| ASSIGNEES | Assignees | | | |
| GITHUB_TOKEN | Access token | `${{github.token}}` | true | `${{secrets.ACCESS_TOKEN}}` |

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
