# Common Specification

## Purpose
アプリケーション全体に共通する仕様を定義する。フォント設定、ページメタデータ、カラースキーム、画像最適化、ローディングアニメーションなど、全ページで共有される基本的なUI/UX要素を規定する。

## Requirements

### Requirement: Page Metadata
全ページは適切なメタデータを設定しなければならない（SHALL）。

メタデータ:
- タイトル: 「くろはにほへと」
- 説明: 「ホームページ」
- ファビコン: 複数サイズ対応（SVG、PNG、ICO）
- Apple Touch Icon
- Web App Manifest

#### Scenario: Page title display
- **WHEN** ユーザーがページにアクセスする
- **THEN** ブラウザのタブに「くろはにほへと」と表示される

#### Scenario: Favicon display
- **WHEN** ユーザーがページにアクセスする
- **THEN** ブラウザのタブに適切なファビコンが表示される

### Requirement: Typography
アプリケーションは2種類のフォントを使用しなければならない（SHALL）。

フォント設定:
- 本文: Noto Sans JP（ウェイト: 300, 400, 500, 600, 700）
- 見出し: M PLUS Rounded 1c（ウェイト: 900）

M PLUS Rounded 1cは`.m-plus-rounded`クラスで適用する。

#### Scenario: Body text font
- **WHEN** 本文テキストが表示される
- **THEN** Noto Sans JPフォントが適用される

#### Scenario: Heading font
- **WHEN** `.m-plus-rounded`クラスが付いた要素が表示される
- **THEN** M PLUS Rounded 1cフォント（太字）が適用される

### Requirement: Color Scheme
アプリケーションは白基調のカラースキームを使用しなければならない（SHALL）。

カラーパレット:
- 背景: 白（`#ffffff`）
- テキスト: グレー系（`text-gray-700`, `text-gray-500`）
- アクセント: ピンク（`pink-400`, `pink-500`, `pink-700`）
- ボーダー: グレー（`border-gray-200`, `border-gray-300`）

CSS変数で定義:
- `--background`: `#ffffff`
- `--foreground`: `#171717`

#### Scenario: Light theme display
- **WHEN** ユーザーがページにアクセスする
- **THEN** 白背景に黒/グレーのテキストで表示される

#### Scenario: Accent color on interaction
- **WHEN** ユーザーがインタラクティブ要素にホバー/フォーカスする
- **THEN** ピンク色のアクセントが表示される

### Requirement: Image Optimization
外部画像はNext.js Imageコンポーネントで最適化しなければならない（SHALL）。

許可されたドメイン:
- `pbs.twimg.com`（Twitter/X画像CDN）

#### Scenario: External image loading
- **WHEN** Twitter/X画像を表示する
- **THEN** Next.js Imageコンポーネントで最適化されて表示される

#### Scenario: Unauthorized domain blocking
- **WHEN** 許可されていないドメインの画像を読み込もうとする
- **THEN** Next.jsがエラーをスローする

### Requirement: Loading Animation
ローディング状態にはカスタムアニメーションを使用しなければならない（SHALL）。

ローダーの仕様:
- 35px四方
- ピンク色（`#f6339a`）の4点
- 0.5秒周期のアニメーション

#### Scenario: Loader animation
- **WHEN** ローディング状態が表示される
- **THEN** ピンク色の4点が回転するアニメーションが表示される
