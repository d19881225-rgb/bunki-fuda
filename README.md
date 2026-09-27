# 分岐札

止まった日に再開の入口を作る、無料・登録不要の静的ライブラリです。全20枚を検索・カテゴリで探せます。日常語やかなの表記ゆれに対応し、3手順は自分のメモへコピーできます。手順の所要時間は2〜5分が目安です。

GitHub Pages向けの静的出力を使います。`main`へ反映すると、GitHub Actionsが全23ページを生成し、23件のテスト通過後に公開します。外部AIへの問い合わせ、入力の保存、会員登録はありません。

公開URL：https://d19881225-rgb.github.io/bunki-fuda/

改善計画書：[2026年9月28日の計画と実施結果](docs/improvement-plan-2026-09-28.md)

今回の優先順位：[第2段階の計画と実施結果](docs/improvement-plan-2026-09-28-phase2.md)

外観の基準と確認結果：[外観改善計画書](docs/design-plan-2026-09-28.md)。温かい白と深い緑、余白付きのカード、実物の札プレビューを使用しています。

## ローカル確認

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/bunki-fuda \
NEXT_PUBLIC_SITE_URL=https://d19881225-rgb.github.io/bunki-fuda \
npm run build
npm test
node scripts/preview-server.mjs
```

プレビュー：http://127.0.0.1:4318/bunki-fuda/。Windowsでは`set NEXT_PUBLIC_BASE_PATH=/bunki-fuda`で環境変数を設定できます。共有画像のベクター原稿は`public/social-preview.svg`、再生成は`node scripts/create-social-image.mjs`です。
