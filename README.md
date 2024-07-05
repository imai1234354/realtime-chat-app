# リアルタイムチャットアプリケーション

このプロジェクトは、AWSサービスを使用したリアルタイムチャットアプリケーションを示します。ユーザー認証機能付きです。

## 使用技術

- AWS AppSync
- AWS Lambda
- Amazon DynamoDB
- Amazon Cognito
- AWS Amplify
- React

## プロジェクトフォルダ構造

realtime-chat-app/
│
├── amplify/
│ ├── .gitignore
│ ├── package.json
│ ├── src/
│ │ ├── index.js
│ │ └── App.js
│ └── public/
│ └── index.html
│
├── backend/
│ ├── app.py
│ └── requirements.txt
│
└── README.md

perl
コードをコピーする

## セットアップ手順

1. リポジトリをクローンします:
    ```
    git clone <リポジトリURL>
    cd realtime-chat-app
    ```

2. バックエンドのセットアップ:
    ```
    cd backend
    pip install -r requirements.txt
    ```

3. Amplifyプロジェクトを初期化およびデプロイ:
    ```
    cd amplify
    amplify init
    amplify add auth
    amplify add api
    amplify push
    ```

4. Reactアプリケーションを起動:
    ```
    npm install
    npm start
    ```

## 使用方法

- ユーザー認証後にチャットメッセージを送信できます。
- チャットメッセージはリアルタイムで他のユーザーにも表示されます。
