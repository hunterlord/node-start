module.exports = {
  apps: [
    {
      name: 'server-dev',
      script: './src/app/index.js',
      watch: ['./src/app'],
      ignoreWatch: ['node_modules'],
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'server',
      script: './dist/app/index.js',
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'front-dev',
      script: './node_modules/webpack-dev-server/bin/webpack-dev-server.js',
      watch: false,
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'front',
      script: './node_modules/webpack/bin/webpack.js',
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'user',
      key: '~/.ssh/id_rsa',
      // Multi host in a js array
      host: ['127.0.0.1'],
      ref: 'origin/master',
      repo: 'git@github.com:hunterlord/node-start.git',
      path: '~/node/node-start',
      'pre-setup': 'rm -rf ~/node/node-start/source',
      'post-setup': "echo 'commands or a script path to be run on the host after cloning the repo'",
      'post-deploy': 'pm2 startOrRestart process.config.js --only server',
      'pre-deploy-local': "echo 'This is a local executed command'"
    }
  }
};
