/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       has: [
  //         {
  //           type: "host",
  //           value: "app.click.me", // Subdomain for the app
  //         },
  //       ],
  //       destination: "/:path*", // App routes will live here
  //     },
  //     {
  //       source: "/:slug",
  //       has: [
  //         {
  //           type: "host",
  //           value: "click.me", // Root domain for URL shortening
  //         },
  //       ],
  //       destination: "/api/shortener/:slug", // Handles shortened URLs
  //     },
  //   ];
  // },
};

export default nextConfig;
