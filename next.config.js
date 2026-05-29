/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product uploads use native <img> in public/images/ — any dimension is OK
    unoptimized: true,
  },
};

module.exports = nextConfig;
