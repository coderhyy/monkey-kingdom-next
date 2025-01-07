# Monkey Kingdom NFT

基于 Next.js 开发的 Solana NFT 铸造网站,支持多语言(中英文)。

## 主要特性

- 🎨 支持 Solana NFT 铸造
- 🌐 中英文国际化支持
- 👛 集成 Solana 钱包连接
- 🎯 Candy Machine v3 支持
- 💅 响应式设计,支持移动端
- ⚡ Next.js 13+ App Router

## 技术栈

- Next.js 15.1
- React 19
- Solana Web3.js
- Metaplex Candy Machine
- TailwindCSS
- i18next

## 开始使用

1. 克隆项目并安装依赖:

```bash
git clone https://github.com/coderhyy/monkey-kingdom-next.git

cd monkey-kingdom-next

pnpm install
```

2. 配置环境变量:

创建 .env.local 文件:

```bash
NEXT_PUBLIC_NETWORK=devnet

NEXT_PUBLIC_CANDY_MACHINE_PUBLIC_KEY=your_candy_machine_address

NEXT_PUBLIC_DESTINATION_PUBLIC_KEY=your_destination_wallet
```

3. 运行开发服务器:

```bash
pnpm dev
```

4. 打开 [http://localhost:3000](http://localhost:3000)

## 部署

推荐使用 Vercel 部署。详见 [部署文档](https://nextjs.org/docs/deployment)

## License

MIT
