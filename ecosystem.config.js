module.exports = {
  apps : [{
    name: 'my_react_app',
    script: 'npm',
    //script: 'index.js',
    //env: {
    //node_path: './src',
    //port: 3000,
    //node_env: 'production',
    //},
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'run start:production',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {},
    staging: {
      user : 'bitnami',
      host : '127.0.0.1',
      ref  : 'origin/master',
      repo : 'git@github.com:2xaronl/socket-io-client.git',
      path : '/home/bitnami/projects/socket-io-client',
      key  : '/home/bitnami/LightsailDefaultPrivateKey-us-west-2.pem',
      ssh_options: ['ForwardAgent=yes'],
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {}
  }
};
