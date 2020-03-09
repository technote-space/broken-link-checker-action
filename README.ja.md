# Broken Link Checker Action

[![CI Status](https://github.com/technote-space/broken-link-checker-action/workflows/CI/badge.svg)](https://github.com/technote-space/broken-link-checker-action/actions)
[![codecov](https://codecov.io/gh/technote-space/broken-link-checker-action/branch/master/graph/badge.svg)](https://codecov.io/gh/technote-space/broken-link-checker-action)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/broken-link-checker-action/badge)](https://www.codefactor.io/repository/github/technote-space/broken-link-checker-action)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/broken-link-checker-action/blob/master/LICENSE)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

リンク切れを検知して Issue を作成する `GitHub Actions` です。

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
- [スクリーンショット](#%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88)
- [オプション](#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)
- [Author](#author)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 使用方法
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
        uses: technote-space/broken-link-checker-action@v1
```

## スクリーンショット
![issue](https://raw.githubusercontent.com/technote-space/broken-link-checker-action/images/issue.png)

## オプション
| name | description | default | required | e.g. |
|:---:|:---|:---:|:---:|:---:|
| TARGET | Target link | `${{github.event.repository.html_url}}` | true | `https://example.com` |
| RECURSIVE | Recursive? | | | `true` |
| TITLE | Issue title | `Broken link found (${URL})` | true | `${URL} is broken` |
| BODY | Issue body | see [action.yml](action.yml) | true | |
| LABELS | Labels | | | |
| ASSIGNEES | Assignees | | | |
| GITHUB_TOKEN | Access token | `${{github.token}}` | true | `${{secrets.ACCESS_TOKEN}}` |

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
