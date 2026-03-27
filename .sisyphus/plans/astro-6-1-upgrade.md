# Astro 6.1 升級 + Cloudflare Workers 部署計劃

## TL;DR

> **目標**: 將網站從 Astro 5.16.16 升級到 6.1，並部署到 Cloudflare Workers（而非 Pages）
>
> **交付物**:
> - Astro 6.1 升級完成的代碼庫
> - Cloudflare Workers 部署配置
> - 成功上線的網站
>
> **估計工作量**: Medium
> **平行執行**: YES - 3 waves
> **關鍵路徑**: 評估準備 → 升級 Astro → 遷移適配 → 部署驗證

---

## Context

### 原始需求
用戶想要：
1. 將現有 Astro 5.x 專案升級到 Astro 6.1
2. 部署到 Cloudflare Pages

### 研究發現

**當前專案狀態**:
- Astro 版本: ^5.16.16
- 整合: MDX, React, Sitemap, TinaCMS (^3.3.2), @tanstack/react-virtual
- 內容集合: Blog, Page, GlobalConfig (MDX + JSON)
- 自定義 Tina directive (`astro-tina-directive`)
- 嚴格 TypeScript 配置

**Astro 6.x 重大變化**:
| 類別 | 變化 |
|------|------|
| Node.js | 必須 22.12.0+ |
| Vite | 升級到 7.0 |
| Zod | 升級到 4.0（`z.email()` 替代 `z.string().email()`） |
| Shiki | 升級到 4.0 |
| ViewTransitions | 改用 `<ClientRouter />` |
| 內容集合 | 舊版 `src/content/config.ts` → Content Layer API |
| Cloudflare | Pages 支持已移除，改用 Workers |

**Cloudflare 部署選項**:
- Astro 6.x + Cloudflare adapter v13+ = Cloudflare Workers 部署
- Wrangler CLI 是官方推薦的部署工具
- 靜態網站無需 adapter，SSR 需要

### 範圍邊界

**包含**:
- Astro 核心升級到 6.1
- 所有官方整合升級（@astrojs/*）
- Node.js 版本檢查/升級
- Zod 4 語法更新
- Content Layer API 遷移（如需要）
- Cloudflare Workers adapter 安裝和配置
- Wrangler 部署配置
- 環境變數配置

**不包含**:
- TinaCMS 版本升級（单独议题，需要单独测试）
- 主题/设计变更
- 功能新增或重构
- 其他第三方整合的版本更新

---

## Work Objectives

### Core Objective
將 Astro 5.16.16 升級到 6.1，並成功部署到 Cloudflare Workers

### Definition of Done
- [ ] `npm run build` 成功，無錯誤
- [ ] `npx wrangler deploy` 成功
- [ ] 網站可透過 Cloudflare Workers URL 訪問
- [ ] 內容集合（blog、page）正常載入
- [ ] RSS 和 Sitemap 生成正常

### Must Have
- Node.js 22.12.0+
- @astrojs/cloudflare v13+
- wrangler.jsonc 配置
- 正確的構建命令和輸出目錄

### Must NOT Have
- Cloudflare Pages 配置（已棄用）
- 舊版 `<ViewTransitions />` 組件
- 破壞現有內容集合的變更

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: NO (升級項目，現有測試可能需要更新)
- **Framework**: N/A

### QA Policy
每個任務必須包含 agent-executed QA scenarios。驗證方式：

- **Build 驗證**: `npm run build` → 檢查 dist/ 輸出
- **Wrangler 驗證**: `npx wrangler deploy --dry-run` 或本地預覽
- **功能驗證**: curl 檢查頁面載入、RSS、Sitemap

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (評估與準備):
├── Task 1: 檢查 Node.js 版本並升級（如需要）
├── Task 2: 備份專案（git commit）
└── Task 3: 執行 Astro 官方升級工具

Wave 2 (核心升級):
├── Task 4: 手動修復 Zod 4 語法（如有）
├── Task 5: 遷移 ViewTransitions → ClientRouter
├── Task 6: 更新內容集合（如需要）
└── Task 7: 驗證 local dev server 正常

Wave 3 (Cloudflare 部署):
├── Task 8: 安裝並配置 @astrojs/cloudflare adapter
├── Task 9: 創建 wrangler.jsonc 配置
├── Task 10: 配置環境變數和 secrets
└── Task 11: 部署到 Cloudflare Workers 並驗證

Wave FINAL (驗證):
└── Task F1: 最終驗證 - 完整功能測試
```

### Dependency Matrix

- **1**: — — 2, 3
- **2**: 1 — 3
- **3**: 1, 2 — 4, 5, 6, 7
- **4**: 3 — 7
- **5**: 3 — 7
- **6**: 3 — 7
- **7**: 4, 5, 6 — 8, 9, 10
- **8**: 7 — 11
- **9**: 7 — 11
- **10**: 7 — 11
- **11**: 8, 9, 10 — F1
- **F1**: 11 — —

---

## TODOs

- [x] 1. **Node.js 版本檢查與升級**

  **What to do**:
  - 檢查當前 Node.js 版本：`node --version`
  - 如果低於 22.12.0，升級 Node.js（使用 nvm 或官網安裝包）
  - 驗證升級後版本： `node --version`
  - 更新 package.json engines 欄位（如需要）

  **Must NOT do**:
  - 不要跳過版本檢查，Node 22.12.0+ 是 Astro 6.x 的硬性要求

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: 簡單的版本檢查和配置更新

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Task 2, 3
  - **Blocked By**: None (can start immediately)

  **References**:
  - `package.json:engines` - Node 版本約束位置
  - Official Node.js: https://nodejs.org/

  **Acceptance Criteria**:
  - [ ] `node --version` 返回 v22.x.x 或更高
  - [ ] `npm run build` 在當前 Node 版本下能執行

  **QA Scenarios**:

  \`\`\`
  Scenario: Node.js 版本符合要求
    Tool: Bash
    Preconditions: 乾淨的 terminal 環境
    Steps:
      1. Run: node --version
      2. Parse output to extract version number
    Expected Result: Version starts with "v22." and is >= 22.12.0
    Failure Indicators: Version starts with v18 or v20, or < v22.12.0
    Evidence: .sisyphus/evidence/task-1-node-version.txt

  Scenario: 升級 Node.js（如需要）
    Tool: Bash
    Preconditions: 當前 Node < 22.12.0
    Steps:
      1. If nvm available: nvm install 22 && nvm use 22
      2. Otherwise: Download and install from nodejs.org
      3. Verify: node --version
    Expected Result: New version >= 22.12.0
    Failure Indicators: Installation failed, version still low
    Evidence: .sisyphus/evidence/task-1-node-upgrade.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-1-node-version.txt - Node version output

  **Commit**: NO

---

- [x] 2. **備份專案**

  **What to do**:
  - 確保所有本地更改已提交：`git status`
  - 創建備份 commit（如果有待提交的更改）
  - 可選：創建 git tag `pre-upgrade-5.16.16`

  **Must NOT do**:
  - 不要在此步驟修改任何代碼
  - 不要推送 remote（除非用戶明確要求）

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Git 操作，無需特殊技能

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 3
  - **Blocked By**: Task 1

  **References**:
  - `.git/` - Git repository

  **Acceptance Criteria**:
  - [ ] `git status` 無未提交的更改（或已提交）
  - [ ] 或已創建備份 commit

  **QA Scenarios**:

  \`\`\`
  Scenario: 確認 git 狀態乾淨
    Tool: Bash
    Preconditions: N/A
    Steps:
      1. Run: git status --porcelain
      2. Check output is empty
    Expected Result: No output (no uncommitted changes)
    Failure Indicators: Untracked or modified files present
    Evidence: .sisyphus/evidence/task-2-git-status.txt

  Scenario: 創建備份 commit（如需要）
    Tool: Bash
    Preconditions: 有未提交的更改
    Steps:
      1. Run: git add -A && git commit -m "chore: backup before Astro 6 upgrade"
    Expected Result: Commit created successfully
    Failure Indicators: Commit failed
    Evidence: .sisyphus/evidence/task-2-backup-commit.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-2-git-status.txt - Git status output

  **Commit**: NO

---

- [x] 3. **執行 Astro 官方升級工具**

  **What to do**:
  - 運行 `npx @astrojs/upgrade`（官方升級工具）
  - 接受所有建議的更改
  - 檢查輸出中的 breaking changes 警告
  - 運行 `npm install` 更新 lockfile
  - 檢查並解決任何 peer dependency 警告

  **Must NOT do**:
  - 不要手動修改 package.json（讓工具處理）
  - 不要忽略嚴重錯誤

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: 運行官方工具，步驟明確

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 4, 5, 6, 7
  - **Blocked By**: Task 1, 2

  **References**:
  - Official upgrade guide: https://docs.astro.build/en/guides/upgrade-to/v6/
  - `package.json` - 依賴管理

  **Acceptance Criteria**:
  - [ ] `npm run build` 在升級後仍能執行（可能有 deprecation warnings）
  - [ ] Astro 版本已更新到 6.x
  - [ ] @astrojs/* 整合已更新

  **QA Scenarios**:

  \`\`\`
  Scenario: 成功執行 Astro 升級工具
    Tool: Bash
    Preconditions: Node 22.12.0+, 乾淨 git 狀態
    Steps:
      1. Run: npx @astrojs/upgrade
      2. If interactive, accept default options
      3. Run: npm install
      4. Run: cat package.json | grep '"astro"'
    Expected Result: astro version shows ^6.x.x
    Failure Indicators: Upgrade failed, version still 5.x
    Evidence: .sisyphus/evidence/task-3-upgrade-output.txt

  Scenario: 驗證升級後的構建
    Tool: Bash
    Preconditions: Astro upgraded
    Steps:
      1. Run: npm run build 2>&1
      2. Check for critical errors (ignore warnings)
    Expected Result: Build completes with 0 errors
    Failure Indicators: Build fails with errors (not warnings)
    Evidence: .sisyphus/evidence/task-3-build-output.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-3-upgrade-output.txt - Astro upgrade tool output
  - [ ] task-3-build-output.txt - npm run build output

  **Commit**: YES
  - Message: `chore(deps): upgrade to Astro 6.x`
  - Files: package.json, package-lock.json
  - Pre-commit: N/A

---

- [x] 4. **修復 Zod 4 語法**

  **What to do**:
  - 搜索項目中所有 Zod schema 定義
  - 檢查 `z.string().email()` → 需要改為 `z.email()`
  - 檢查 `.default()` 與 transform 組合
  - 更新所有受影響的 schema

  **Must NOT do**:
  - 不要修改業務邏輯
  - 不要改變 validation 規則（只更新語法）

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: Zod 語法替換，模式明確

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:
  - Zod 4 migration: https://zod.dev/v4/changelog
  - `tina/config.ts` - Tina CMS config 可能包含 schemas
  - Content collection schemas

  **Acceptance Criteria**:
  - [ ] `npm run build` 無 Zod 相關錯誤
  - [ ] 所有 email validation 使用 `z.email()` 或 `z.string().email()`（兩者皆可）

  **QA Scenarios**:

  \`\`\`
  Scenario: 檢查 Zod 使用情況
    Tool: mgrep
    Preconditions: Astro upgraded to 6.x
    Steps:
      1. Search for "z.string().email()" in codebase
      2. Search for "z.string().url()" in codebase
      3. Document findings
    Expected Result: List of files needing updates (if any)
    Failure Indicators: N/A (informational)
    Evidence: .sisyphus/evidence/task-4-zod-usage.txt

  Scenario: 驗證 Zod 4 兼容性
    Tool: Bash
    Preconditions: Any Zod changes applied
    Steps:
      1. Run: npm run build 2>&1 | grep -i zod
    Expected Result: No Zod-related errors
    Failure Indicators: Zod validation errors in build output
    Evidence: .sisyphus/evidence/task-4-build-zod-check.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-4-zod-usage.txt - Zod usage search results
  - [ ] task-4-build-zod-check.txt - Build output grep for Zod

  **Commit**: YES (if changes made)
  - Message: `fix(schemas): update Zod syntax for v4`
  - Files: Updated schema files
  - Pre-commit: `npm run build`

---

- [x] 5. **遷移 ViewTransitions → ClientRouter**

  **What to do**:
  - 搜索項目中所有 `<ViewTransitions />` 使用
  - 替換為 `<ClientRouter />`
  - 移除任何 `import { ViewTransitions } from 'astro:transitions'`
  - 添加 `import { ClientRouter } from 'astro:transitions'`

  **Must NOT do**:
  - 不要刪除過渡動畫相關的 CSS（如果有的話）
  - 不要改變過渡行為（只是 component 名稱變更）

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: 簡單的 component 名稱替換

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:
  - Astro 6 migration: https://docs.astro.build/en/guides/upgrade-to/v6/#view-transitions
  - `src/layouts/` - Layout files likely contain ViewTransitions
  - `src/components/` - Any component using ViewTransitions

  **Acceptance Criteria**:
  - [ ] 無 `<ViewTransitions />` 殘留
  - [ ] `<ClientRouter />` 已正確導入和使用
  - [ ] `npm run build` 成功

  **QA Scenarios**:

  \`\`\`
  Scenario: 搜索 ViewTransitions 使用
    Tool: mgrep
    Preconditions: N/A
    Steps:
      1. Search for "ViewTransitions" in codebase
      2. List all files using this component
    Expected Result: List of files to update
    Failure Indicators: N/A (informational)
    Evidence: .sisyphus/evidence/task-5-viewtransitions-search.txt

  Scenario: 驗證 ClientRouter 正確替換
    Tool: Bash
    Preconditions: ViewTransitions replaced with ClientRouter
    Steps:
      1. Run: npm run build 2>&1
      2. Check for "ViewTransitions" warnings or errors
    Expected Result: Build succeeds, no ViewTransitions warnings
    Failure Indicators: Warnings about deprecated ViewTransitions
    Evidence: .sisyphus/evidence/task-5-build-output.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-5-viewtransitions-search.txt - Search results
  - [ ] task-5-build-output.txt - Build output

  **Commit**: YES (if changes made)
  - Message: `refactor(transitions): migrate to ClientRouter`
  - Files: Updated layout/component files
  - Pre-commit: `npm run build`

---

- [x] 6. **更新內容集合（如需要）**

  **What to do**:
  - 檢查 `src/content/config.ts` 是否存在（舊版 API）
  - 如果存在，評估是否需要遷移到 Content Layer API
  - 檢查 `src/content.config.ts`（新版）
  - 確保 content collections 正常運作

  **Must NOT do**:
  - 不要修改內容結構
  - 不要改變現有內容

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - Reason: 可能涉及複雜的 content layer API 遷移

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:
  - Content Layer API: https://docs.astro.build/en/guides/content-layer/
  - `src/content/config.ts` - Legacy content config (if exists)
  - `src/content.config.ts` - New content layer config (if exists)
  - `src/content/` - Content collections

  **Acceptance Criteria**:
  - [ ] 內容集合正常載入
  - [ ] Blog posts 能夠訪問
  - [ ] `npm run build` 成功

  **QA Scenarios**:

  \`\`\`
  Scenario: 檢查內容集合配置
    Tool: Bash
    Preconditions: N/A
    Steps:
      1. Check if src/content/config.ts exists
      2. Check if src/content.config.ts exists
      3. List contents of src/content/
    Expected Result: Understanding of which content API is in use
    Failure Indicators: N/A (informational)
    Evidence: .sisyphus/evidence/task-6-content-config.txt

  Scenario: 驗證內容集合功能
    Tool: Bash
    Preconditions: Content config updated
    Steps:
      1. Run: npm run build 2>&1
      2. Check for content collection errors
    Expected Result: Build succeeds, no content errors
    Failure Indicators: Content collection validation errors
    Evidence: .sisyphus/evidence/task-6-build-output.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-6-content-config.txt - Content config analysis
  - [ ] task-6-build-output.txt - Build output

  **Commit**: YES (if changes made)
  - Message: `refactor(content): migrate to content layer api`
  - Files: Updated content config files
  - Pre-commit: `npm run build`

---

- [x] 7. **驗證 Local Dev Server**

  **What to do**:
  - 運行 `npm run dev` 啟動本地開發服務器
  - 訪問 http://localhost:4321
  - 檢查首頁、Blog 頁面是否正常
  - 檢查終端是否有 deprecation warnings
  - 正常關閉服務器（Ctrl+C）

  **Must NOT do**:
  - 不要跳過這一步
  - 不要忽視任何錯誤

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: 標準驗證步驟

  **Parallelization**:
  - **Can Run In Parallel**: NO (must run sequentially)
  - **Blocks**: Task 8, 9, 10
  - **Blocked By**: Task 4, 5, 6

  **References**:
  - `package.json` - dev script
  - `localhost:4321` - Local dev URL

  **Acceptance Criteria**:
  - [ ] `npm run dev` 成功啟動
  - [ ] http://localhost:4321 可訪問
  - [ ] 首頁正常渲染
  - [ ] 無 Critical 錯誤（warnings 可接受）

  **QA Scenarios**:

  \`\`\`
  Scenario: 啟動本地開發服務器
    Tool: Bash (with timeout)
    Preconditions: All wave 2 tasks completed
    Steps:
      1. Run: timeout 30 npm run dev 2>&1 || true
      2. Capture output for first 20 lines
    Expected Result: Server starts on port 4321
    Failure Indicators: Port in use, dependency errors, module not found
    Evidence: .sisyphus/evidence/task-7-dev-server.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-7-dev-server.txt - Dev server output

  **Commit**: NO

---

- [x] 8. **安裝並配置 Cloudflare Adapter**

  **What to do**:
  - 運行 `npx astro add cloudflare` 添加 @astrojs/cloudflare
  - 或手動安裝：`npm install @astrojs/cloudflare`
  - 更新 astro.config.mjs 添加 adapter
  - 確保 output 設置正確（'static' 或 'server'）

  **Must NOT do**:
  - 不要刪除現有的整合
  - 不要改變 output 模式（如果目前是 static，保持 static）

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: 標準 adapter 配置

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 9, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Task 7

  **References**:
  - @astrojs/cloudflare docs: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
  - `astro.config.mjs` - Current config
  - Official adapter: https://github.com/withastro/adapters/tree/main/packages/cloudflare

  **Acceptance Criteria**:
  - [ ] @astrojs/cloudflare 已安裝
  - [ ] astro.config.mjs 包含 cloudflare adapter
  - [ ] `npm run build` 成功

  **QA Scenarios**:

  \`\`\`
  Scenario: 安裝 Cloudflare adapter
    Tool: Bash
    Preconditions: npm run build working
    Steps:
      1. Run: npx astro add cloudflare
      2. Or manually: npm install @astrojs/cloudflare
      3. Check package.json for new dependency
    Expected Result: @astrojs/cloudflare in dependencies
    Failure Indicators: Installation failed
    Evidence: .sisyphus/evidence/task-8-adapter-install.txt

  Scenario: 驗證 adapter 配置
    Tool: Bash
    Preconditions: Adapter installed
    Steps:
      1. Run: cat astro.config.mjs | grep -A5 cloudflare
      2. Run: npm run build 2>&1
    Expected Result: Adapter configured, build succeeds
    Failure Indicators: Missing adapter export, build errors
    Evidence: .sisyphus/evidence/task-8-build-output.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-8-adapter-install.txt - Adapter installation output
  - [ ] task-8-build-output.txt - Build output

  **Commit**: YES
  - Message: `feat(cloudflare): add @astrojs/cloudflare adapter`
  - Files: package.json, astro.config.mjs
  - Pre-commit: `npm run build`

---

- [x] 9. **創建 Wrangler 配置**

  **What to do**:
  - 創建 `wrangler.jsonc` 配置文件
  - 設置 name, compatibility_date, assets
  - 確保 output directory 正確（dist）
  - 添加 nodejs_compat flag（如需要）

  **Must NOT do**:
  - 不要包含 secrets（使用 wrangler secret）
  - 不要設置不正確的相容性日期

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: 配置文件創建

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Task 7

  **References**:
  - Wrangler config: https://developers.cloudflare.com/wrangler/configuration/
  - `dist/` - Build output directory

  **Acceptance Criteria**:
  - [ ] wrangler.jsonc 存在
  - [ ] name 設置正確
  - [ ] assets 指向 dist/
  - [ ] compatibility_date 設置

  **QA Scenarios**:

  \`\`\`
  Scenario: 創建 wrangler.jsonc
    Tool: Read
    Preconditions: dist/ exists from build
    Steps:
      1. Create wrangler.jsonc with proper config
      2. Verify: cat wrangler.jsonc
    Expected Result: Valid wrangler config
    Failure Indicators: Invalid JSON, missing fields
    Evidence: .sisyphus/evidence/task-9-wrangler-config.txt

  Scenario: 驗證 wrangler 配置
    Tool: Bash
    Preconditions: wrangler.jsonc created
    Steps:
      1. Run: npx wrangler deploy --dry-run 2>&1 || true
      2. Check for config validation errors
    Expected Result: No config validation errors
    Failure Indicators: Schema validation errors
    Evidence: .sisyphus/evidence/task-9-wrangler-validate.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-9-wrangler-config.txt - wrangler.jsonc content
  - [ ] task-9-wrangler-validate.txt - Validation output

  **Commit**: YES
  - Message: `feat(cloudflare): add wrangler configuration`
  - Files: wrangler.jsonc
  - Pre-commit: N/A

---

- [x] 10. **配置環境變數和 Secrets**

  **What to do**:
  - 檢查專案需要的環境變數（SITE_URL, PUBLIC_TINA_CLIENT_ID, TINA_TOKEN 等）
  - 創建 `.dev.vars` 用於本地開發
  - 說明如何使用 `wrangler secret put` 設置生產 secrets

  **Must NOT do**:
  - 不要在 wrangler.jsonc 或代碼中硬編碼 secrets
  - 不要提交 `.dev.vars` 到 git（應該被 .gitignore 忽略）

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: 環境變數配置

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 8, 9)
  - **Blocks**: Task 11
  - **Blocked By**: Task 7

  **References**:
  - `.gitignore` - Check for .dev.vars
  - Wrangler secrets: https://developers.cloudflare.com/workers/secrets/
  - Environment variables in Astro: https://docs.astro.build/en/guides/environment-variables/

  **Acceptance Criteria**:
  - [ ] 識別所有需要的環境變數
  - [ ] `.dev.vars.example` 或文檔說明如何配置
  - [ ] 生產 secrets 使用 `wrangler secret put`

  **QA Scenarios**:

  \`\`\`
  Scenario: 識別環境變數需求
    Tool: grep
    Preconditions: N/A
    Steps:
      1. Search for process.env in codebase
      2. Search for import.meta.env in codebase
      3. List all required variables
    Expected Result: List of required env vars
    Failure Indicators: N/A (informational)
    Evidence: .sisyphus/evidence/task-10-env-vars.txt

  Scenario: 創建本地開發 vars 文件
    Tool: Bash
    Preconditions: .gitignore checked
    Steps:
      1. Create .dev.vars.example with placeholder values
      2. Verify .dev.vars is in .gitignore
    Expected Result: Example file created, gitignore updated
    Failure Indicators: .dev.vars not ignored
    Evidence: .sisyphus/evidence/task-10-dev-vars.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-10-env-vars.txt - Environment variables list
  - [ ] task-10-dev-vars.txt - .dev.vars.example creation

  **Commit**: YES
  - Message: `docs(cloudflare): add environment variable documentation`
  - Files: .dev.vars.example (if created)
  - Pre-commit: N/A

---

- [ ] 11. **部署到 Cloudflare Workers 並驗證**

  **What to do**:
  - 確保所有 changes 已 commit
  - 運行 `npx wrangler deploy`
  - 獲取部署的 Workers URL
  - 使用 curl 驗證部署成功

  **Must NOT do**:
  - 不要忽視部署錯誤
  - 不要跳過驗證步驟

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - Reason: 部署步驟

  **Parallelization**:
  - **Can Run In Parallel**: NO (must run after 8, 9, 10)
  - **Blocks**: Task F1
  - **Blocked By**: Task 8, 9, 10

  **References**:
  - `npx wrangler deploy` - Official deployment
  - Cloudflare Workers URL format: https://<name>.<subdomain>.workers.dev

  **Acceptance Criteria**:
  - [ ] `npx wrangler deploy` 成功
  - [ ] 獲得 Workers URL
  - [ ] curl 訪問 URL 成功
  - [ ] RSS 和 Sitemap 可訪問

  **QA Scenarios**:

  \`\`\`
  Scenario: 部署到 Cloudflare Workers
    Tool: Bash (with timeout)
    Preconditions: All tasks completed, committed
    Steps:
      1. Run: npx wrangler deploy 2>&1
      2. Capture deployment output
    Expected Result: Deployment successful, URL returned
    Failure Indicators: Deployment failed, auth errors
    Evidence: .sisyphus/evidence/task-11-deploy-output.txt

  Scenario: 驗證部署的網站
    Tool: Bash
    Preconditions: Deployment successful
    Steps:
      1. Extract Workers URL from deployment output
      2. Run: curl -s -o /dev/null -w "%{http_code}" <workers-url>/
      3. Run: curl -s <workers-url>/rss.xml | head -5
      4. Run: curl -s <workers-url>/sitemap-index.xml | head -5
    Expected Result: HTTP 200, valid RSS and Sitemap
    Failure Indicators: HTTP 4xx/5xx, invalid content
    Evidence: .sisyphus/evidence/task-11-verify-curl.txt
  \`\`\`

  **Evidence to Capture**:
  - [ ] task-11-deploy-output.txt - Full deployment output
  - [ ] task-11-verify-curl.txt - curl verification results

  **Commit**: NO (deployment 不是 commit)

---

## Final Verification Wave

- [ ] F1. **Final Verification** — `unspecified-high`
  
  執行完整驗證：
  - `npm run build` → 成功
  - `npx wrangler deploy` → 成功
  - 訪問部署的網站 → 正常顯示
  - 檢查 Blog 頁面 → 正常載入
  - 檢查 RSS feed → 可訪問
  - 檢查 Sitemap → 可訪問

  **QA Scenarios**:

  \`\`\`
  Scenario: 完整 Build 驗證
    Tool: Bash
    Preconditions: All tasks completed
    Steps:
      1. Run: npm run build 2>&1
      2. Check exit code
    Expected Result: Build completes with 0 errors
    Failure Indicators: Build errors, missing dependencies
    Evidence: .sisyphus/evidence/final-build.txt

  Scenario: 部署驗證
    Tool: Bash
    Preconditions: Build successful
    Steps:
      1. Run: npx wrangler deploy 2>&1
      2. Extract URL from output
    Expected Result: Deployment successful
    Failure Indicators: Deployment failed
    Evidence: .sisyphus/evidence/final-deploy.txt

  Scenario: 網站功能驗證
    Tool: Bash
    Preconditions: Deployment successful
    Steps:
      1. Get Workers URL
      2. curl homepage → HTTP 200
      3. curl /rss.xml → valid XML
      4. curl /sitemap-index.xml → valid XML
      5. curl /blog → HTML page
    Expected Result: All endpoints return expected content
    Failure Indicators: 4xx/5xx errors, missing content
    Evidence: .sisyphus/evidence/final-verify-curl.txt
  \`\`\`

  **Output**: `VERDICT: PASS/FAIL`

---

## Commit Strategy

- **1**: `chore(deps): upgrade to astro 6.1` — package.json, package-lock.json
- **2**: `feat(cloudflare): add workers deployment` — wrangler.jsonc, astro.config.mjs
- **3**: `fix(content): migrate to content layer api` — content collection updates

---

## Success Criteria

### Verification Commands
```bash
node --version                    # Expected: v22.x.x
npm run build                     # Expected: 0 errors
npx wrangler deploy               # Expected: success URL
curl <workers-url>/              # Expected: HTML page
curl <workers-url>/rss.xml       # Expected: RSS XML
```

### Final Checklist
- [ ] 所有 Must Have 滿足
- [ ] 所有 Must NOT Have 不存在
- [ ] 升級後 local dev 正常
- [ ] Cloudflare Workers 部署成功
- [ ] 內容正常顯示
