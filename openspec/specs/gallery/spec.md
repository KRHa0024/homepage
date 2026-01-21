# Gallery Specification

## Purpose
ギャラリーページの仕様。Twitter/Xに投稿した画像を一覧表示し、モーダルでプレビューする機能を提供する。

## Requirements

### Requirement: Gallery Grid Display
ギャラリーページは画像をグリッドレイアウトで表示しなければならない（SHALL）。

グリッドレイアウト:
- モバイル（～640px）: 2カラム
- タブレット（640px～768px）: 3カラム
- デスクトップ（768px～）: 4カラム

各サムネイルはアスペクト比1:1（正方形）で表示する。

#### Scenario: Gallery grid displays correctly
- **WHEN** ユーザーがギャラリーページにアクセスする
- **THEN** 画像がグリッドレイアウトで表示される
- **AND** 各画像は正方形のサムネイルとして表示される

#### Scenario: Responsive grid layout
- **WHEN** 画面幅が変化する
- **THEN** グリッドのカラム数が画面幅に応じて変化する

### Requirement: Image Source
ギャラリーの画像はTwitter/XのCDNから取得しなければならない（SHALL）。

画像URL生成ルール:
- サムネイル: `https://pbs.twimg.com/media/{id}?format=jpg&name=small`
- プレビュー: `https://pbs.twimg.com/media/{id}?format=jpg&name=4096x4096`

画像IDは`lib/twitterImages.ts`で管理する。

#### Scenario: Thumbnail URL generation
- **WHEN** ギャラリーがサムネイルを表示する
- **THEN** `name=small`パラメータを使用したURLで画像を取得する

#### Scenario: Preview URL generation
- **WHEN** モーダルでプレビューを表示する
- **THEN** `name=4096x4096`パラメータを使用した高解像度URLで画像を取得する

### Requirement: Modal Preview
サムネイルをクリックするとモーダルでプレビュー表示しなければならない（SHALL）。

モーダルの仕様:
- 背景は半透明の黒（`bg-black/80`）
- 背景にブラー効果（`backdrop-blur-sm`）
- 画像は最大幅・最大高さを制限（90vh）
- フェードイン・フェードアウトアニメーション

アニメーション設定:
- アニメーション時間: 300ms
- イージング: `ease-out`（開く）/ `ease-in`（閉じる）

#### Scenario: Open modal preview
- **WHEN** ユーザーがサムネイルをクリックする
- **THEN** モーダルが300msのフェードインで表示される
- **AND** 高解像度の画像がロードされる

#### Scenario: Close modal by clicking background
- **WHEN** ユーザーがモーダルの背景をクリックする
- **THEN** モーダルが300msのフェードアウトで閉じる

#### Scenario: Close modal by clicking close button
- **WHEN** ユーザーが閉じるボタン（X）をクリックする
- **THEN** モーダルが300msのフェードアウトで閉じる

#### Scenario: Close modal by pressing Escape
- **WHEN** モーダルが表示されている状態でユーザーがEscapeキーを押す
- **THEN** モーダルが閉じる

### Requirement: Image Navigation
モーダル内で前後の画像に移動できなければならない（SHALL）。

ナビゲーションボタン:
- 左矢印: 前の画像へ（循環）
- 右矢印: 次の画像へ（循環）

ボタンスタイル:
- 背景: `bg-black/50`
- ホバー: `hover:bg-pink-500`
- サイズ: `w-10 h-10`（40px）
- トランジション: 300ms

キーボードナビゲーション:
- `←` 左矢印キー: 前の画像へ
- `→` 右矢印キー: 次の画像へ
- `Escape`: モーダルを閉じる

#### Scenario: Navigate to previous image
- **WHEN** ユーザーが左矢印ボタンをクリックする
- **THEN** 前の画像が表示される
- **AND** 最初の画像の場合は最後の画像に循環する

#### Scenario: Navigate to next image
- **WHEN** ユーザーが右矢印ボタンをクリックする
- **THEN** 次の画像が表示される
- **AND** 最後の画像の場合は最初の画像に循環する

#### Scenario: Navigate with left arrow key
- **WHEN** モーダル表示中にユーザーが左矢印キーを押す
- **THEN** 前の画像に移動する

#### Scenario: Navigate with right arrow key
- **WHEN** モーダル表示中にユーザーが右矢印キーを押す
- **THEN** 次の画像に移動する

### Requirement: Loading State
画像ロード中はローディングインジケータを表示しなければならない（SHALL）。

ローディングインジケータ:
- ピンク色の4点アニメーション
- 画像ロード完了後に非表示

#### Scenario: Show loading indicator
- **WHEN** プレビュー画像がロード中の場合
- **THEN** ローディングインジケータが表示される
- **AND** 画像は透明になる

#### Scenario: Hide loading indicator
- **WHEN** プレビュー画像のロードが完了した場合
- **THEN** ローディングインジケータが非表示になる
- **AND** 画像がフェードインで表示される

### Requirement: Image Loading Error
画像の読み込みに失敗した場合は適切なエラー表示をしなければならない（SHALL）。

エラー表示:
- サムネイル: プレースホルダー画像または背景色表示
- プレビュー: エラーメッセージ「画像を読み込めませんでした」

#### Scenario: Thumbnail loading error
- **WHEN** サムネイル画像の読み込みに失敗した場合
- **THEN** エラー状態が視覚的に表示される

#### Scenario: Preview loading error
- **WHEN** プレビュー画像の読み込みに失敗した場合
- **THEN** 「画像を読み込めませんでした」というメッセージが表示される

### Requirement: Navigation Back to Home
ギャラリーページからホームページへの導線を提供しなければならない（SHALL）。

#### Scenario: Navigate back to home
- **WHEN** ユーザーが「ホームに戻る」ボタンをクリックする
- **THEN** `/`（ホームページ）に遷移する

### Requirement: Empty State
画像がない場合は適切なメッセージを表示しなければならない（SHALL）。

#### Scenario: Display empty state
- **WHEN** 画像リストが空の場合
- **THEN** 「画像がありません」というメッセージが表示される

### Requirement: Accessibility
ギャラリーはアクセシビリティに配慮しなければならない（SHALL）。

- 全てのインタラクティブ要素に`aria-label`を設定
- サムネイルボタンにはフォーカスリングを表示
- モーダルのボタンにも`aria-label`を設定

サムネイルのホバー/フォーカススタイル:
- ボーダー: `border-transparent` → `border-pink-400`
- 背景: `pink-50`（軽いハイライト）
- フォーカスリング: `ring-2 ring-pink-500`

#### Scenario: Thumbnail accessibility
- **WHEN** ユーザーがキーボードでサムネイルにフォーカスする
- **THEN** フォーカスリング（`pink-500`）が表示される
- **AND** スクリーンリーダーが「画像N番を拡大表示」と読み上げる

#### Scenario: Thumbnail hover effect
- **WHEN** ユーザーがサムネイルにホバーする
- **THEN** ボーダーが`pink-400`になり、背景が`pink-50`に変化する

#### Scenario: Modal button accessibility
- **WHEN** モーダルが表示される
- **THEN** 閉じるボタン、前/次ボタンに適切な`aria-label`が設定される
