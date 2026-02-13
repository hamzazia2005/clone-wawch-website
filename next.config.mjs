const nextConfig = {
  images: {
    remotePatterns: [
      // Local development (Strapi)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "1337",
      },
      // AWS S3 bucket for static images
      {
        protocol: "https",
        hostname: "wawcd-website.s3.ap-south-1.amazonaws.com",
      },
      // Cloudinary CDN
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dno9rw4ax/**",
      },
      // Strapi backend (production)
      {
        protocol: "https",
        hostname: "strapi.wawcd.com",
      },
    ],
  },
  env: {
    STRAPI_BE_URL: process.env.STRAPI_BE_URL,
    STRAPI_ACCESS_TOKEN: process.env.STRAPI_ACCESS_TOKEN,
    STRAPI_POST_TOKEN: process.env.NEXT_PUBLIC_STRAPI_POST_TOKEN,
    WAWCD_URL: process.env.WAWCD_URL,
    NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
  },
  trailingSlash: true,
  reactStrictMode: true,
  //Added this code to fix the issue of the PRICING VIOLATION error
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'payment=*, camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
