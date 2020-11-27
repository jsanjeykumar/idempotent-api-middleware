module.exports = {
  apps: [
    {
      name: 'wallet-transfer',
      script: '.build/src/server.js',
      exec_mode: 'fork',
      watch: true,
      autorestart: true,
      time: true,
      env: {

      },
      env_prod: {

      }
    }
  ]
}
