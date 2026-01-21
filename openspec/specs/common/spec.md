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

フォント最適化設定:
- `display: 'swap'`（FOUT許容、パフォーマンス優先）
- `subsets: ['latin']`（サブセット読み込み）

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

### Requirement: Dark Mode Support
アプリケーションはダークモードをサポートしなければならない（SHALL）。

テーマ設定:
- ライトテーマ:
  - 背景: `#ffffff`
  - テキスト: `#171717`
  - アクセント: `pink-500`
- ダークテーマ:
  - 背景: `#111827`（gray-900）
  - テキスト: `#ededed`
  - アクセント: `pink-400`

切り替えモード（3種類）:
- `system`: システム設定に従う（`prefers-color-scheme`メディアクエリ）
- `light`: 常にライトテーマ
- `dark`: 常にダークテーマ

状態管理:
- Context API（ThemeContext）でアプリ全体のテーマ状態を管理
- `localStorage`にユーザー設定を保存（キー: `theme`）
- ページ遷移時も状態を維持

フラッシュ防止:
- `_document.tsx`でHTML/bodyに初期背景色をインラインスタイルで設定
- 同期スクリプトでDOM読み込み時に即座にテーマクラスを適用
- マウント完了前はThemeToggleボタンを透明にして表示

#### Scenario: Light theme display
- **WHEN** ユーザーがライトモードを選択している場合
- **THEN** ライトテーマの色が適用される

#### Scenario: Dark theme display
- **WHEN** ユーザーがダークモードを選択している場合
- **THEN** ダークテーマの色が適用される

#### Scenario: System theme detection
- **WHEN** ユーザーがシステム設定モードを選択している場合
- **THEN** OSのダークモード設定に応じたテーマが適用される

#### Scenario: Theme persistence
- **WHEN** ユーザーがテーマを切り替えてページをリロードする
- **THEN** 選択したテーマが維持される

#### Scenario: Page transition without flash
- **WHEN** ダークモード中にページ遷移する
- **THEN** 白いフラッシュなしでページが表示される

### Requirement: Theme Toggle
アプリケーションはテーマ切り替えボタンを提供しなければならない（SHALL）。

ボタン仕様:
- 位置: 画面右上固定（`fixed top-4 right-4`）
- スタイル: 丸型ボタン（`rounded-full`）
- アイコン: 現在のモードに応じて変化
  - `system`: モニターアイコン（Monitor）
  - `light`: 太陽アイコン（Sun）
  - `dark`: 月アイコン（Moon）

動作:
- クリックでモードを循環（system → light → dark → system）
- ホバー時にピンク色のハイライト

#### Scenario: Theme toggle click
- **WHEN** ユーザーがテーマ切り替えボタンをクリックする
- **THEN** テーマが次のモードに切り替わる
- **AND** アイコンが新しいモードに応じて変化する

#### Scenario: Theme toggle icon display
- **WHEN** 現在のモードがsystemの場合
- **THEN** モニターアイコンが表示される

#### Scenario: Theme toggle accessibility
- **WHEN** ユーザーがテーマ切り替えボタンにフォーカスする
- **THEN** フォーカスリングが表示される
- **AND** aria-labelに現在のモード名が含まれる

### Requirement: Responsive Breakpoints
アプリケーションは統一されたブレークポイントを使用しなければならない（SHALL）。

ブレークポイント定義:
- `sm`: 640px（小型タブレット）
- `md`: 768px（タブレット/デスクトップ）

各ページのグリッドカラム数:
- ホームページ: 1カラム（～md）→ 2カラム（md～）
- ギャラリー: 2カラム（～sm）→ 3カラム（sm～md）→ 4カラム（md～）

#### Scenario: Breakpoint consistency
- **WHEN** 同じ画面幅で複数のページを表示する
- **THEN** 全てのページで一貫したブレークポイントが適用される

### Requirement: Unified Keyboard Navigation
アプリケーションは統一されたキーボードナビゲーションを提供しなければならない（SHALL）。

キーボード操作:
- `Tab`: フォーカス移動（順方向）
- `Shift + Tab`: フォーカス移動（逆方向）
- `Enter` / `Space`: インタラクティブ要素の起動
- `Escape`: モーダルを閉じる

#### Scenario: Tab navigation
- **WHEN** ユーザーがTabキーを押す
- **THEN** フォーカスが次のインタラクティブ要素に移動する

#### Scenario: Activate element with Enter
- **WHEN** ユーザーがインタラクティブ要素にフォーカスしてEnterキーを押す
- **THEN** その要素が起動される（クリックと同等の動作）

#### Scenario: Activate element with Space
- **WHEN** ユーザーがボタン要素にフォーカスしてSpaceキーを押す
- **THEN** そのボタンが起動される

#### Scenario: Close modal with Escape
- **WHEN** モーダルが表示されている状態でユーザーがEscapeキーを押す
- **THEN** モーダルが閉じる

### Requirement: Error Handling
アプリケーションは適切なエラーハンドリングを実装しなければならない（SHALL）。

エラー処理:
- 画像読み込み失敗時: プレースホルダー表示またはエラーメッセージ
- タイムアウト時: 再試行オプションまたはエラー表示

#### Scenario: Image loading failure
- **WHEN** 画像の読み込みに失敗した場合
- **THEN** エラー状態が適切に表示される
- **AND** ユーザーに状況が伝わる

#### Scenario: Network timeout
- **WHEN** ネットワークタイムアウトが発生した場合
- **THEN** エラー状態が表示される

### Requirement: WCAG Compliance
アプリケーションはWCAGアクセシビリティ基準に準拠しなければならない（SHALL）。

準拠項目:
- カラーコントラスト: 4.5:1以上（WCAG AA基準）
- フォーカスインジケータ: 視覚的に明確なフォーカスリング
- 代替テキスト: 全ての意味のある画像に`alt`属性を設定

#### Scenario: Color contrast compliance
- **WHEN** テキストと背景が表示される
- **THEN** コントラスト比が4.5:1以上を満たす

#### Scenario: Focus indicator visibility
- **WHEN** ユーザーがキーボードで要素にフォーカスする
- **THEN** 視覚的に明確なフォーカスリングが表示される
