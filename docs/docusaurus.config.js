const package = require('../package')

module.exports = {
  title: package.name,
  tagline: package.description,
  url: package.homepage,
  baseUrl: '/react-notable/',
  favicon: 'img/favicon.ico',
  organizationName: package.author, // Usually your GitHub org/user name.
  projectName: package.name, // Usually your repo name.
  themeConfig: {
    navbar: {
      title: package.name,
      style: 'dark',
      logo: {
        alt: package.name,
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/Table',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'examples/home',
          label: 'Examples',
          position: 'left'
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: package.repository.url,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `MIT © ${new Date().getFullYear()} ${package.name}, ${package.author} Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
