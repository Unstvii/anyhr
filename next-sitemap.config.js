// const fetchProducts = require('./fetchProducts');

module.exports = {
  siteUrl: 'https://anyhr.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/**', '/user/**'],
  transform: async (config, path) => {
    if (path === '/catalog') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    const products = await axios.get(`${baseUrl}/api/products`);
    return products.map(product => ({
      loc: `/product/${product.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  }
};
