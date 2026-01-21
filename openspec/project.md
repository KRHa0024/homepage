# Project Context

## Purpose
くろ～は（kuroha）の個人ホームページ。SNSリンク集、制作物ポートフォリオ、写真ギャラリーを提供するポートフォリオサイト。

## Tech Stack
- Next.js 15.3.4 (Pages Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- lucide-react (アイコン)

## Project Conventions

### Code Style
- TypeScriptを使用し、型定義を明示する
- コンポーネントは関数コンポーネントで記述
- CSSはTailwind CSSのユーティリティクラスを使用
- ファイル名はkebab-caseまたはPascalCase（コンポーネント）

### Architecture Patterns
- Next.js Pages Router構成
- ページごとに独立したコンポーネント
- データ（画像ID等）は`lib/`ディレクトリに分離
- 静的生成（SSG）を使用

### Directory Structure
```
pages/           # ページコンポーネント
  _app.tsx       # アプリ共通設定（ThemeProvider、ThemeToggle配置）
  _document.tsx  # HTMLドキュメント設定（テーマ初期化スクリプト）
  index.tsx      # ホームページ
  galleries.tsx  # ギャラリーページ
components/      # 共通コンポーネント
  ThemeToggle.tsx # テーマ切り替えボタン
contexts/        # React Context
  ThemeContext.tsx # テーマ状態管理（useThemeフック含む）
lib/             # データ・ユーティリティ
  twitterImages.ts
styles/          # グローバルスタイル
  globals.css
public/          # 静的アセット
  favicons/      # ファビコン
  *.gif, *.png   # Work画像
```

### Testing Strategy
- 現在テストは未実装

### Git Workflow
- mainブランチで管理
- コミットメッセージは絵文字プレフィックス（gitmoji）を使用

## Domain Context
- VRChat関連のクリエイター向けポートフォリオサイト
- 日本語ユーザーを主なターゲット
- 写真はTwitter/X画像IDを使用して外部から取得

## Important Constraints
- 画像は`pbs.twimg.com`からのみ外部読み込み許可
- ダークモードはContext APIで状態管理し、手動切り替えとシステム設定連動の両方に対応
- ページ遷移時のテーマフラッシュ防止のため、_document.tsxで同期的にテーマを適用

## External Dependencies
- Twitter/X画像CDN: `pbs.twimg.com/media/`
- Google Fonts: Noto Sans JP, M PLUS Rounded 1c
