# ROVE — GitHub Pages 中英文商城

公开网址：https://chenzhiheng1019-cyber.github.io/rove-bilingual-store/

# ROVE — Move Beyond

完整的虚构城市户外鞋品牌商城，适用于大学课程展示。使用 React、TypeScript、Vite、Tailwind CSS、React Router 和 Lucide React。

## 运行

推荐 Node.js 22 或以上版本。

```bash
npm install
npm run dev
```

打开终端给出的本地地址。

## 构建与部署

```bash
npm run build
npm run preview
```

将 `dist/` 部署到支持静态网站的服务。必须配置 SPA 路由回退：所有非资源请求返回 `/index.html`，这样直接打开 `/product/1` 或 `/checkout` 也能正常显示。项目内提供 `vercel.json` 和 `public/_redirects`，分别支持 Vercel 和 Netlify 的路由配置。

不要直接双击 `dist/index.html`；请通过 HTTP 服务运行。

## 已实现

- 16 款鞋履、4 个分类、性别 / 配色 / 价格筛选、4 种排序。
- 搜索名称、分类、主配色、描述；大小写不敏感。
- 商品图集、3 个配色选择、36–45 尺码、售罄尺寸、数量、快捷加购。
- 购物袋抽屉与独立购物车页面、更新数量、删除、实时金额。
- 满 ¥800 免运费，否则 ¥20；空购物车金额为 0。
- 模拟登录、注册、字段校验、记住登录状态、退出登录。
- 结账地址校验、保存订单、清空购物车、订单确认和账户订单列表。
- 首页、品牌故事、技术介绍、帮助页、404 与商品不存在状态。
- 手机菜单、筛选抽屉、滑动图集、结账摘要折叠。
- Toast、表单标签、键盘焦点、弹层焦点约束与 Escape 关闭。
- 页面标题和描述、ROVE favicon、减少动画偏好。

## 演示说明

ROVE 是虚构品牌。登录仅验证格式，不是真实身份认证；不保存密码，也不连接支付或物流。请使用演示密码。

登录手机号：任意 11 位数字；密码至少 6 个字符。

数据仅保存在当前浏览器：

- `rove_cart`：购物车
- `rove_user`：记住登录时的模拟账户；不记住时改用 sessionStorage
- `rove_orders`：已确认订单

账户订单列表按下单账户的手机号筛选，收货电话可以不同。数据不跨浏览器同步。清除浏览器存储会删除演示记录。

Newsletter 只展示本地提交反馈，不发送邮件。社交链接进入帮助说明，避免假冒真实品牌账号。

商品图为 AI 生成概念素材；商品详情由侧面、鞋面细节、中底细节与户外场景组成，并非实物商业摄影或性能认证。

## 结构

`src/components/` 复用组件；`src/pages/` 路由页面；`src/context/` 购物车、账户和提示状态；`src/data/` 商品数据；`src/types/` 类型；`src/utils/` 金额、存储、校验；`public/assets/` 本地品牌图片。

## 验收

详见 `ACCEPTANCE.md`。已在浏览器中实际执行完整购物流程，并检查 375×812、390×844、768×1024、1440×900 四个尺寸。

## 中英文版本

首次访问显示中文 / English 选择界面，导航栏可随时切换。`rove_language` 保存语言偏好。切换不会清空购物车、账户或正在填写的表单。中文支持“越野”“徒步”“黑色”等关键词搜索。翻译字典位于 `src/i18n/zh.ts`，型号名称保留品牌原名。

## GitHub Pages 自动发布

`npm run build:pages` 构建子路径版本。推送 main 分支会触发 GitHub Actions，自动构建并发布。常规 `npm run build` 仍用于根路径托管。

商品和场景图片通过 BASE_URL 解析，React Router 使用相同的 basename。深层链接经 404.html 重定向回首页，再恢复原来的路径、查询参数和锚点。初始深层请求会返回 404，恢复后的应用页面正常显示。

本版本的浏览器存储使用 rove_bilingual_ 前缀，避免与同一个 GitHub 用户域名下的其他商城演示混用数据。原网站的购物车、订单和语言偏好不会自动迁移。

GitHub Pages 的网络可达性仍取决于访问者网络，不能保证所有地区和运营商可用。
