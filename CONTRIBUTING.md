# Contributing

## Development

### Prerequisites

- [mise](https://mise.jdx.dev/) (Node.js, pnpm のバージョン管理)

### Setup

```bash
mise install   # mise.toml に基づいて Node.js と pnpm をインストール
pnpm install   # 依存パッケージをインストール
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm test` | Run tests |
| `pnpm run build` | Build CJS + ESM |
| `pnpm run lint` | Lint check |
| `pnpm run format` | Auto-fix lint/format |

### Git Hooks (Husky)

- **pre-commit**: `pnpm run lint`
- **pre-push**: `pnpm run test`

## Branch Strategy

```
feature/* ──PR──> develop ──merge──> master ──auto──> npm publish
```

- **develop**: 開発ブランチ。PRのマージ先。CI (lint + test) がNode.js 20/22/24で実行される
- **master**: リリースブランチ。pushされると自動的にバージョンアップ + npm publishが実行される

## Release Flow

### Automatic (default)

`develop` を `master` にマージすると、以下が自動実行される:

1. Node.js 20/22/24 でlint + test (マトリクス)
2. `pnpm version patch` でバージョンをインクリメント
3. バージョンコミット + タグを `master` にpush
4. npm registryにpublish

### Manual (minor/major release)

GitHub Actions の **workflow_dispatch** から手動実行:

1. [Actions](../../actions/workflows/npmpublish.yml) > "Run workflow" をクリック
2. "Version bump type" で `patch` / `minor` / `major` を選択
3. "Run workflow" を実行

### Dependabot

- 毎週月曜 9:00 (JST) に依存関係の更新PRが `develop` に作成される
- semver minor/patch の更新はテスト通過後に自動マージされる
