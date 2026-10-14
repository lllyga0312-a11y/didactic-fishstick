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

## 网站留言怎么送到公司

表单提交到 `worker/` 里的 Cloudflare Worker（`batov-inquiry`）。它挡掉垃圾留言，
再把每条留言推到飞书群机器人和邮箱，自己不保存任何内容。

- 部署：在 GitHub 的 Actions 页面手动运行 "Deploy inquiry forwarder"。
  需要仓库密钥 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`、`FEISHU_WEBHOOK`。
- 部署后把 Worker 地址填进 `src/data/site.ts` 的 `formEndpoint`。
- 邮件：batov.cn 转到 Cloudflare 并开通 Email Routing 后，在 `worker/wrangler.toml`
  填 `MAIL_FROM`、`MAIL_TO`，取消 `send_email` 的注释，再部署一次。
