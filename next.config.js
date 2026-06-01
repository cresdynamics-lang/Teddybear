/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "teddybearhaven.co.ke",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
