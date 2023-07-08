/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      ...[
        {
          test: /(\.tsx)|(\.jsx)$/,
          use: [
            {
              loader: 'astroturf/loader',
              options: { extension: '.module.scss' },
            },
          ],
        },
      ],
    )
    return config
  },
}

module.exports = nextConfig
