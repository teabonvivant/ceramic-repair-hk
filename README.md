# 瓷器修補知識庫

網站原始碼、文章資料與圖片資源。

公開網站：https://ceramic-repair-hk.teabonvivant.chatgpt.site/

## 本機開發

需要 Node.js 22.13.0 或以上。

```sh
npm ci
npm run dev
```

## 建置與檢查

```sh
npm run check
```

網站使用 React、Vinext、Vite 與 Cloudflare Worker 執行環境。現有網站繼續由 Sites 託管；上傳此倉庫不會自動部署或變更公開網站。

## 原始碼版本

- Sites 專案：appgprj_6a5ec4a911188191bdf035e4d674ec42
- 來源 commit：c7232c1b45906fb63b0e4afde3f829472933f1ca
- 備份日期：2026-09-28

此倉庫以目前版本建立獨立快照，保留執行及建置所需檔案，排除內部設計審查截圖、依賴套件、快取及建置輸出。