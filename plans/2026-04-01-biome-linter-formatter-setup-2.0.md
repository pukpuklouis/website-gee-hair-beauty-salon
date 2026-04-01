# Biome Linter & Formatter 完整設置計劃

## 目標

為 Gee Hair Beauty Salon 專案設置完整的 Biome linting 和 formatting 工作流程，確保程式碼品質和一致性。

## 當前狀態

**已完成：**
- Biome 2.4.10 已安裝
- 基礎 biome.jsonc 配置存在
- VCS 整合已啟用

**待完成：**
- npm scripts 設置
- 優化 Astro/React/TypeScript 配置
- Git hooks（可選）

---

## 實施計劃

### 階段一：優化 Biome 配置

- [ ] **Task 1.1: 更新 biome.jsonc 配置**
  - 添加 Astro 檔案支援（.astro 副檔名）
  - 配置 React/JSX 設定（jsxRuntime: "automatic"）
  - 設置更完整的 linting rules
  - 優化 formatter 設定（行寬、引號風格等）
  - 確保與專案風格一致（double quotes, tabs）
  
  **理由：** 當前配置缺少 Astro 支援和完整的 linting rules，需要針對專案技術棧優化

- [ ] **Task 1.2: 設置檔案排除規則**
  - 排除 `dist/`、`.astro/`、`.wrangler/` 目錄
  - 排除 TinaCMS 生成的檔案（`tina/__generated__/`）
  - 排除 node_modules 和其他建置產物
  - 使用正確的 `files.includes` 語法
  
  **理由：** 避免 lint 檢查不應該被檢查的生成檔案和建置產物

### 階段二：添加 npm scripts

- [ ] **Task 2.1: 添加 lint 指令**
  - `lint`: 檢查程式碼問題（不修正）
  - `lint:fix`: 自動修正可修正的問題
  
  **理由：** 提供手動檢查和修正程式碼的能力

- [ ] **Task 2.2: 添加 format 指令**
  - `format`: 格式化所有檔案（寫入變更）
  - `format:check`: 檢查格式但不修改（用於 CI）
  
  **理由：** 統一程式碼格式，確保團隊一致性

- [ ] **Task 2.3: 添加 check 指令（組合）**
  - `check`: 同時執行 lint + format 檢查
  - `check:fix`: 自動修正所有問題
  
  **理由：** 提供一次性檢查所有問題的便利指令

### 階段三：Git Hooks（可選但建議）

- [ ] **Task 3.1: 安裝 simple-git-hooks**
  - 使用 pnpm 安裝 simple-git-hooks（比 husky 更輕量）
  - 或選擇使用 Husky + lint-staged
  
  **理由：** 在 commit 前自動執行 lint，防止不合格程式碼進入代碼庫

- [ ] **Task 3.2: 配置 pre-commit hook**
  - 設置對 staged 檔案執行 biome check --fix
  - 只檢查暫存的檔案（提升效能）
  
  **理由：** 自動修正提交的程式碼，確保代碼庫品質

- [ ] **Task 3.3: 添加 lint-staged 配置（如果使用 Husky）**
  - 配置只對 .ts, .tsx, .js, .jsx, .astro 檔案執行檢查
  - 自動修正並重新 stage 變更
  
  **理由：** 優化 git hook 效能，只檢查相關檔案

### 階段四：驗證與測試

- [ ] **Task 4.1: 執行初始檢查**
  - 運行 `pnpm run check` 查看當前問題
  - 運行 `pnpm run check:fix` 自動修正
  - 檢查是否有無法自動修正的問題
  
  **理由：** 確認配置正確運作，識別需要手動處理的問題

- [ ] **Task 4.2: 驗證 npm scripts 運作正常**
  - 測試所有新增的 npm scripts
  - 確認輸出清晰易懂
  
  **理由：** 確保開發者能順利使用所有指令

---

## 驗證標準

- [ ] 執行 `pnpm run lint` 能正確檢查程式碼問題
- [ ] 執行 `pnpm run format` 能正確格式化所有支援的檔案
- [ ] 執行 `pnpm run check` 能同時檢查 lint 和 format
- [ ] Git hooks（如果設置）能在 commit 前自動檢查
- [ ] TinaCMS 生成的檔案被正確排除
- [ ] Astro 檔案能被正確處理

---

## 潛在風險與緩解策略

1. **風險：現有程式碼有大量格式不一致**
   - **緩解：** 先執行 `check:fix` 自動修正大部分問題，再手動處理剩餘問題
   - **建議：** 在單獨的 commit 中進行格式化，不要與功能變更混合

2. **風險：Astro 檔案支援可能不完整**
   - **緩解：** Biome 對 Astro 的支援正在改進中，當前可以處理大部分情況
   - **替代：** 如果遇到問題，可以在 biome.jsonc 中排除 .astro 檔案

3. **風險：團隊成員不熟悉 Biome**
   - **緩解：** 文檔說明常用指令，設置 editor integration 降低手動操作需求
   - **建議：** 在 README 中添加簡短的使用說明

4. **風險：Git hooks 可能影響 commit 速度**
   - **緩解：** 使用 lint-staged 只檢查暫存的檔案
   - **替代：** 可以使用 `git commit --no-verify` 跳過（緊急情況）

---

## 替代方案

### 方案 A：僅設置基本功能（最輕量）
- 只添加 npm scripts
- 不設置 git hooks
- **優點：** 快速、簡單
- **缺點：** 依賴開發者手動執行，容易遺漏

### 方案 B：使用 ESLint + Prettier（傳統方案）
- 保留 Biome 或替換為 ESLint + Prettier
- **優點：** 生態系統成熟，規則豐富
- **缺點：** 配置複雜，速度較慢，需要多個工具

### 方案 C：完整 Biome 設置（推薦）
- 完整配置 Biome
- Git hooks
- **優點：** 速度快、一體化、開發體驗好
- **缺點：** 需要初始設置時間

---

## 建議執行順序

1. **立即執行：** 階段一 + 階段二（配置 + npm scripts）
2. **建議執行：** 階段三（Git hooks）- 確保代碼品質
3. **最後執行：** 階段四（驗證）- 確認一切正常

---

## 配置檔案清單

需要創建或修改的檔案：

1. `biome.jsonc` - 更新配置
2. `package.json` - 添加 scripts
3. `package.json` - 添加 simple-git-hooks（可選）

---

## 完成後的使用方式

```bash
# 檢查所有問題
pnpm run check

# 自動修正所有問題
pnpm run check:fix

# 只檢查 lint
pnpm run lint

# 只格式化
pnpm run format

# CI 環境使用（不修改檔案）
pnpm run format:check
```

---

## 編輯器支援說明

由於您使用 Zed 和 Antigravity，以下是相關資訊：

**Zed Editor:**
- Zed 原生支援 Biome（無需安裝擴充功能）
- 會自動讀取 `biome.jsonc` 配置
- 支援 format on save 和 linting

**Antigravity:**
- 請參考 Antigravity 文檔確認 Biome 整合方式

**通用方式:**
- 所有 npm scripts 都可以在終端機執行
- 建議在 git hooks 中自動執行檢查
