# 🚀 快速入門 - 5分鐘設定指南

## Step 1: 安裝Node.js (2分鐘)
1. 前往 https://nodejs.org/ 下載LTS版本
2. 執行安裝,保持預設設定
3. 重新開啟CMD,確認安裝:
   ```bash
   node --version
   ```

## Step 2: 安裝Puppeteer (2分鐘)
```bash
cd "C:\Users\elaine_ye_hhgalaxy\Desktop\Antigracity\hhg-company-os本機"
npm install puppeteer
```

## Step 3: 測試爬蟲 (1分鐘)
### 方法A: 爬取單一商品
```bash
node monitor.js https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=3170438
```

### 方法B: 批量爬取
1. 編輯 `config/target-urls.json`:
   ```json
   {
     "targets": [
       {
         "url": "https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=3170438",
         "label": "測試商品",
         "enabled": true
       }
     ]
   }
   ```

2. 執行:
   ```bash
   node monitor.js --batch
   ```

## 成功標誌 ✅
- 看到 `✅ 成功: 1 個`
- `data/products.js` 有新數據
- 截圖目錄有新圖片

---

## 常用指令

### 單一商品爬取
```bash
node monitor.js <Momo商品URL>
```

### 批量爬取(從配置檔)
```bash
node monitor.js --batch
```

### 一鍵執行(Windows)
雙擊 `run-scraper.bat`

---

## 疑難排解
❌ **"找不到模組 'puppeteer'"**
→ 執行: `npm install puppeteer`

❌ **"Timeout"**
→ 檢查網路連線,確認商品URL有效

❌ **價格顯示 $0**
→ Momo可能改版,需要更新選擇器(參考完整教學文檔)

---

## 下一步
✅ 設定Windows定時任務 → 參考 `documentation/scraper-setup-guide.md`
✅ 新增更多監測商品 → 編輯 `config/target-urls.json`
✅ 查看UI顯示 → 打開 `index.html`,切換到競品追蹤區
