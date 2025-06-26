# 画像解析アプリ（フロントエンド）

このアプリは、画像をアップロードし、アップロード済みの画像を一覧表示・二値化できる React アプリです。主に以下の機能を提供します。

- ローカル画像のアップロード（Base64形式でサーバへ送信）
- 画像の一覧表示とプレビュー
- 任意の画像に対する二値化処理（しきい値調整可能）
- コンテキストAPIによる状態管理

## 主な機能

### ホーム画面 `/`

![home](docs/home.png)

- ファイル選択 & プレビュー
- 画像のアップロード（`uploadImage`）
- アップロード済み画像一覧の取得（`fetchImages`）

### 詳細画面 `/image`

![image](docs/image.png)

- 選択画像の表示
- 二値化処理実行（`binarizeImage`）

## プロジェクト作成手順

1. 新しいVite + Reactアプリケーションを作成します（TypeScriptテンプレートを使用）
    - `npm create vite@latest analyze-image-frontend -- --template react-ts`

2. 依存関係をインストールします
    - `npm install`

3. 必要なパッケージをインストールします
    - `npm install react-router-dom @types/react-router-dom`

4. アプリを起動します
    - `npm run dev`

## フォルダ構成

```text
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Button.module.css
│   │   ├── Button.tsx
│   │   ├── ErrorMessage.module.css
│   │   ├── ErrorMessage.tsx
│   │   ├── LoadingIndicator.module.css
│   │   └── LoadingIndicator.tsx
│   │
│   ├── pages/
│   │   ├── Home.module.css
│   │   ├── Home.tsx
│   │   ├── Image.module.css
│   │   └── image.tsx
│   │
│   ├── models/
│   │   └── ImageModel.ts
│   │
│   ├── services/
│   │   └── ImageService.ts
│   │
│   ├── context/
│   │   └── ImageContext.tsx
│   │
│   ├── hooks/
│   │   └── useImages.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
│
└── package.json
```

## バックエンドAPI 仕様

以下のエンドポイントを使用します（デフォルトは http://localhost:8000/api）:

| メソッド | エンドポイント         | 説明                         |
| -------- | ---------------------- | ---------------------------- |
| POST     | `/images/register`     | Base64画像のアップロード     |
| GET      | `/images`              | アップロード済み画像一覧取得 |
| GET      | `/images/:image_id`    | 指定画像の取得               |
| POST     | `/processing/binarize` | 二値化処理を実行             |

