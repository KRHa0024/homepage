# Homepage Specification

## Purpose
ホームページ（トップページ）の仕様を定義する。ユーザーがサイトにアクセスした際に最初に表示されるページであり、プロフィール表示、各種SNSへのリンク集、制作物ポートフォリオ（Works）を提供する。

## Requirements

### Requirement: Profile Section
ホームページはプロフィールセクションを表示しなければならない（SHALL）。

プロフィールセクションには以下の要素を含む:
- プロフィール画像（丸型、影付き）
- 名前（「くろ～は」）
- 読み方（「kuroha」）
- ひとこと紹介文
- ギャラリーページへのボタン

#### Scenario: Profile section displays correctly
- **WHEN** ユーザーがホームページにアクセスする
- **THEN** プロフィール画像、名前、読み方、ひとことが表示される
- **AND** ギャラリーへのボタンが表示される

#### Scenario: Gallery button navigation
- **WHEN** ユーザーがGalleryボタンをクリックする
- **THEN** `/galleries`ページに遷移する

### Requirement: Links Section
ホームページはリンク集セクションを表示しなければならない（SHALL）。

リンク集には以下のSNS/サービスへのリンクを含む:
- Twitter
- VRChat
- Discord
- Booth
- ほしいも（Amazon Wishlist）
- GitHub

各リンクカードはアイコン、タイトル、外部リンクアイコンを持つ。

#### Scenario: Link cards display correctly
- **WHEN** ユーザーがホームページにアクセスする
- **THEN** 各リンクカードがグリッドレイアウトで表示される
- **AND** 各カードにアイコンとタイトルが表示される

#### Scenario: Link card click opens external link
- **WHEN** ユーザーがリンクカードをクリックする
- **THEN** 対応するURLが新しいタブで開く
- **AND** `noopener,noreferrer`属性が設定される

#### Scenario: Link card keyboard accessibility
- **WHEN** ユーザーがリンクカードにフォーカスしてEnterキーを押す
- **THEN** 対応するURLが新しいタブで開く

### Requirement: Works Section
ホームページは制作物（Works）セクションを表示しなければならない（SHALL）。

Worksセクションには制作物のカードを含み、各カードは:
- サムネイル画像（アスペクト比16:9）
- タイトル
- 外部リンク（オプション）

グリッドレイアウト:
- モバイル（～768px）: 1カラム
- タブレット/デスクトップ（768px～）: 2カラム
- gap: `1.5rem`（24px）

対応画像形式:
- JPG/JPEG
- PNG
- GIF（アニメーション対応）
- WebP

#### Scenario: Work cards display correctly
- **WHEN** ユーザーがホームページにアクセスする
- **THEN** 制作物カードがグリッドレイアウトで表示される
- **AND** 各カードにサムネイル画像とタイトルが表示される

#### Scenario: Work card with link click
- **WHEN** URLを持つWorkカードをユーザーがクリックする
- **THEN** 対応するURLが新しいタブで開く

#### Scenario: Work card without link
- **WHEN** URLを持たないWorkカードが表示される
- **THEN** カードはクリック不可となる

#### Scenario: GIF image display
- **WHEN** WorkカードにGIF画像が設定されている場合
- **THEN** アニメーションが再生されて表示される

### Requirement: Footer
ホームページはフッターを表示しなければならない（SHALL）。

フッターには以下を含む:
- 著作権表示（動的に現在年を表示）
- アイコンのクレジット表示

#### Scenario: Footer displays correctly
- **WHEN** ユーザーがホームページにアクセスする
- **THEN** フッターに現在年の著作権表示が表示される
- **AND** アイコンのクレジット（かなめなか様）が表示される

### Requirement: Responsive Design
ホームページはレスポンシブデザインを実装しなければならない（SHALL）。

- モバイル: シングルカラムレイアウト
- タブレット/デスクトップ: 2カラムグリッドレイアウト

#### Scenario: Mobile layout
- **WHEN** 画面幅が768px未満の場合
- **THEN** カードがシングルカラムで表示される

#### Scenario: Desktop layout
- **WHEN** 画面幅が768px以上の場合
- **THEN** カードが2カラムグリッドで表示される

### Requirement: Hover Effects
カードにはホバーエフェクトを適用しなければならない（SHALL）。

LinkCard:
- ボーダー: `border-gray-200` → `border-pink-400`
- 背景: `transparent` → `pink-50`
- シャドウ: `shadow-sm` → `shadow-md`

WorkCard:
- ボーダー: `border-gray-200` → `border-pink-400`
- 画像: `scale(1)` → `scale(1.05)`（0.3秒トランジション）
- シャドウ: `shadow-lg` → `shadow-xl`

#### Scenario: Link card hover effect
- **WHEN** ユーザーがリンクカードにホバーする
- **THEN** ボーダーが`pink-400`になり、背景が`pink-50`に変化する

#### Scenario: Work card hover effect
- **WHEN** ユーザーがWorkカードにホバーする
- **THEN** 画像が1.05倍にズームし、シャドウが強調される

### Requirement: Homepage Accessibility
ホームページはアクセシビリティに配慮しなければならない（SHALL）。

aria-label設定:
- LinkCard: `aria-label="${title}に移動"`
- WorkCard: `aria-label="${title}を開く"`（URLがある場合）

フォーカスリング:
- 色: `pink-500`
- スタイル: `ring-2 ring-offset-2`

#### Scenario: Link card accessibility
- **WHEN** ユーザーがキーボードでリンクカードにフォーカスする
- **THEN** ピンク色のフォーカスリングが表示される
- **AND** スクリーンリーダーが「${title}に移動」と読み上げる

#### Scenario: Work card accessibility
- **WHEN** ユーザーがキーボードでWorkカードにフォーカスする
- **THEN** ピンク色のフォーカスリングが表示される

#### Scenario: Keyboard activation with Space
- **WHEN** ユーザーがカードにフォーカスしてSpaceキーを押す
- **THEN** カードが起動される（クリックと同等の動作）

#### Scenario: Keyboard activation with Enter
- **WHEN** ユーザーがカードにフォーカスしてEnterキーを押す
- **THEN** カードが起動される（クリックと同等の動作）
