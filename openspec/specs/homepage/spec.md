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

- ボーダーがピンク色に変化
- 背景がピンク系に変化
- シャドウが強調される
- 画像が微妙にズーム

#### Scenario: Link card hover effect
- **WHEN** ユーザーがリンクカードにホバーする
- **THEN** ボーダーがピンク色になり、背景がピンク系に変化する

#### Scenario: Work card hover effect
- **WHEN** ユーザーがWorkカードにホバーする
- **THEN** 画像が微妙にズームし、シャドウが強調される
