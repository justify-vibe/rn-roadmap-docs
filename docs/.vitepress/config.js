import { defineConfig } from 'vitepress'

export default defineConfig({
  base: "/rn-roadmap-docs/",
  lang: 'zh-CN',
  title: 'RN 路线图',
  description: '从零开始用 React Native 做一个 App — 完整学习指南',
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#6c63ff' }],
  ],

  themeConfig: {
    logo: '📱',
    siteTitle: 'RN 路线图',

    nav: [
      { text: '快速开始', link: '/guide/intro' },
      { text: '五个阶段', link: '/phases/phase-1' },
      { text: '工具总览', link: '/tools/overview' },
      {
        text: '外部资源',
        items: [
          { text: 'React Native 官方文档', link: 'https://reactnative.dev' },
          { text: 'Expo 文档', link: 'https://expo.dev' },
          { text: 'React 官方文档', link: 'https://react.dev' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始之前',
          items: [
            { text: '📖 路线图介绍', link: '/guide/intro' },
            { text: '⚡ 新手注意事项', link: '/guide/warnings' },
            { text: '🏆 推荐实战项目', link: '/guide/project' },
          ]
        }
      ],
      '/phases/': [
        {
          text: '学习阶段',
          items: [
            { text: '阶段一 · 基础知识储备', link: '/phases/phase-1' },
            { text: '阶段二 · React Native 入门', link: '/phases/phase-2' },
            { text: '阶段三 · 进阶功能开发', link: '/phases/phase-3' },
            { text: '阶段四 · 完整项目开发', link: '/phases/phase-4' },
            { text: '阶段五 · 打包 & 发布上架', link: '/phases/phase-5' },
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具 & 资源',
          items: [
            { text: '🛠 核心工具总览', link: '/tools/overview' },
            { text: '📚 学习资源推荐', link: '/tools/resources' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/justify-vibe/rn-roadmap-docs.git' }
    ],

    footer: {
      message: '每天 1~2 小时，坚持 3 个月，你一定能做出自己的 App',
      copyright: 'React Native 学习路线图'
    },

    editLink: {
      pattern: 'https://github.com/justify-vibe/rn-roadmap-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
  }
})
