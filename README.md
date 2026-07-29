# 分岐札

失敗した日の3分復帰手順を集めた、無料・登録不要の静的ライブラリです。

GitHub Pages向けの静的出力を使います。`main`へ反映すると、GitHub Actionsが全23ページを生成して公開します。

## ローカル確認

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/bunki-fuda \
NEXT_PUBLIC_SITE_URL=https://example.github.io/bunki-fuda \
npm run build
npm test
```
