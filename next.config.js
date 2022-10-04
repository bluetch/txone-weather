const public_url = process.env.PUBLIC_URL || "";
const api_path = process.env.API_PATH || "http://localhost:3000/api";
const api_key = process.env.API_KEY || "";

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: public_url,
    api_path: api_path,
    api_key: api_key,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
