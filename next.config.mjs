// next.config.mjs

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap", // Assuming your sitemap route is served from the "/api/sitemap" route
      },
    ];
  },
};

export default nextConfig;
