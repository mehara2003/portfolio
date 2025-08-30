/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export a fully static site that GitHub Pages can host
  output: 'export',
  images: { unoptimized: true },
};
module.exports = nextConfig;
