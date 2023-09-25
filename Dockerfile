# ベースイメージを指定
# node:18 だと OpenSSL のエラーが解消できなかったので node:16 を使用
FROM node:16

# OpenSSLをインストール
RUN apt-get update && apt-get install -y openssl

# OpenSSL の設定ファイルを指定
ENV OPENSSL_CONF=/etc/ssl/

# 作業ディレクトリを指定
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm cache clean --force
RUN npm install

# ソースコードをコピー
COPY . .

# ビルド
RUN npm run build

# ポートを公開
# EXPOSE 3000

# コンテナ起動時に実行するコマンドを指定
CMD [ "npm", "start" ]

# CA 証明書を更新
RUN update-ca-certificates
