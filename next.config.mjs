/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a rule to handle SVG files from the "assets" directory
    config.module.rules.push({
      test: /\.(svg)$/,
      include: [/assets/], // Change the include path accordingly
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
