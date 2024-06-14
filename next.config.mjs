/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "gatherer.wizards.com",
        pathname: "/Handlers/Image.ashx",
      },
      {
        protocol: "https",
        hostname: "images.ygoprodeck.com",
        pathname: "/images/cards/44553392.jpg",
      },
    ],
  },
};

export default nextConfig;
