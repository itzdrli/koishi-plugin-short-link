import { Context, Schema } from 'koishi'

export const name = 'short-link'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command("surl <url>", "生成短链接", { authority: 0 })
    .action(async ({ session }, url) => {
      if (!url) return "请输入链接"
      if (!url.startsWith("http")) {
        return "请提供正确的链接 (http:// 或 https:// 开头)"
      }

      const response = await fetch('https://l-i.biz/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
      });
      if (!response) {
        return "请求失败"
      }
      const data = await response.json()
      return data.url
    })
}
