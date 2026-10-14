# 巴特夫 BATOV 官网

Astro 静态网站，中文在根目录 `/`，英文在 `/en/`。

## 常改的地方

- 公司信息（电话、邮箱、WhatsApp、英文名、备案号）：`src/data/site.ts`
- 产品系统、技术参数、选型规则：`src/data/systems.ts`
- 表单接收地址：`src/data/site.ts` 里的 `formEndpoint`
- 首页文字：`src/components/Home.astro`

方括号 `[ ]` 是等公司补充的内容，网页上会显示成黄色标记。不要用猜的数字替换。

## 本地运行

```sh
npm install
npm run dev      # 本地预览
npm run build    # 生成 dist/
```

## 预览地址

推送到 `main` 后，GitHub Actions 会把网站发布到 GitHub Pages 作为预览。
预览版设置了 noindex，不会被搜索引擎收录。正式上线时用正式域名构建
（`SITE_URL=https://batov.cn`，不设 `NOINDEX`）。
