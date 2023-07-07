const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin-next')

const { ENTRY_ORDER, default: InjectPlugin } = require('webpack-inject-plugin')

function injectEnvVars(envVars) {
  function makeInjectEnvVarsScript(vars) {
    console.info('inject process.env', vars)
    const script = `
    if (!globalThis.process) {
      globalThis.process = {};
    }
    if (!globalThis.process.env) {
      globalThis.process.env = {};
    }
    Object.assign(globalThis.process.env, ${JSON.stringify(vars)});
  `
    return script
  }

  const injectPlugin = new InjectPlugin(() => makeInjectEnvVarsScript(envVars), {
    entryOrder: ENTRY_ORDER.Last,
  })
  return injectPlugin
}

/*
 * Skip nestjs dependencies that are not essential for using its DI
 */
const ignoreNestjsOptionalDependenciesPluginInstance = new webpack.IgnorePlugin({
  checkResource(resource) {
    const lazyImports = [
      '@nestjs/microservices',
      '@nestjs/platform-express',
      '@nestjs/grahpql',
      '@nestjs/microservices/microservices-module',
      '@nestjs/websockets/socket-module',
      'cache-manager',
      'class-validator',
      'class-transformer',
    ]
    // if (resource.startsWith('@nestjs/')) {
    //   return false
    // }
    if (!lazyImports.includes(resource)) {
      return false
    }
    try {
      require.resolve(resource)
    } catch (err) {
      return true
    }
    return false
  },
})

const makeBaseConfig = function (env, argv) {
  /** @type {import('webpack').Configuration} */
  const config = {
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: argv.mode === 'development',
            },
          },
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin({})],
    },
    stats: {
      assets: false,
      builtAt: true,
      children: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      entrypoints: true,
      errorDetails: false,
      hash: false,
      modules: false,
      reasons: false,
      timings: true,
      version: false,
      warnings: true,
      warningsCount: true,
    },
    target: 'node',
  }

  if (argv.mode === 'development') {
    config.ignoreWarnings = [
      {
        // Warns about `require(dynamicExpression)` which is bad for optimizations.
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ]
  }

  if (process.env.ON_INITIAL_BUILD_END) {
    const wpShellPlugin = new WebpackShellPlugin({
      onBuildEnd: {
        blocking: false,
        parallel: true,
        scripts: [process.env.ON_INITIAL_BUILD_END],
      },
    })

    config.plugins.push(wpShellPlugin)
  }

  return config
}

module.exports.makeBaseConfig = makeBaseConfig
module.exports.ignoreNestjsOptionalDependenciesPluginInstance =
  ignoreNestjsOptionalDependenciesPluginInstance
module.exports.injectEnvVars = injectEnvVars
