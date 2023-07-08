const astroturfAltLoaderMatcher = /astroturf\/inline-loader/

function traverse(rules) {
  for (const rule of rules) {
    if (typeof rule.loader === 'string' && rule.loader.includes('css-loader')) {
      if (
        rule.options &&
        rule.options.modules &&
        typeof rule.options.modules.getLocalIdent === 'function'
      ) {
        const nextGetLocalIdent = rule.options.modules.getLocalIdent
        rule.options.modules.getLocalIdent = (context, localIdentName, localName, options) => {
          const nextLocalIdent = nextGetLocalIdent(context, localIdentName, localName, options)

          return astroturfAltLoaderMatcher.test(context.request)
            ? `${nextLocalIdent}_${context.resourceQuery.slice(1)}`
            : nextLocalIdent
        }
      }
    }
    if (typeof rule.use === 'object') {
      traverse(Array.isArray(rule.use) ? rule.use : [rule.use])
    }
    if (Array.isArray(rule.oneOf)) {
      traverse(rule.oneOf)
    }
  }
}

const nextConfig = {
  webpack(config) {
    // traverse(config.module.rules)

    config.module.rules.push({
      exclude: /node_modules/,
      test: /\.(jsx?|tsx?|mjs)$/,
      use: [
        {
          loader: 'astroturf/loader',
          options: {
            extension: '.module.scss',
            // useAltLoader: true,
          },
        },
      ],
    })

    return config
  },
}

/** @type {import('next').NextConfig} */
// const nextConfig = withAstroturf()
// {
//   webpack: (config) => {
//     config.module.rules.push(
//       ...[
//         {
//           test: /(\.tsx)|(\.jsx)$/,
//           use: [
//             {
//               loader: 'astroturf/loader',
//               options: {
//                 extension: '.module.scss',
//               },
//             },
//           ],
//         },
//       ],
//     )
//     return config
//   },
// }

module.exports = nextConfig
