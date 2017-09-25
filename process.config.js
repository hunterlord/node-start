module.exports = {
  apps: [
    {
      name: 'server-dev',
      script: './src/app/index.js',
      watch: ['./src/app'],
      ignoreWatch: ['node_modules'],
      env: {
        NODE_ENV: 'DEVELOP'
      }
    },
    {
      name: 'server',
      script: './dist/app/index.js',
      watch: false,
      env: {
        NODE_ENV: 'PROD'
      }
    },
    {
      name: 'front-dev',
      script: './node_modules/webpack-dev-server/bin/webpack-dev-server.js',
      watch: false,
      env: {
        NODE_ENV: 'DEVELOP'
      }
    },
    {
      name: 'front',
      script: './node_modules/webpack/bin/webpack.js',
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'PROD'
      }
    }
  ]
};
