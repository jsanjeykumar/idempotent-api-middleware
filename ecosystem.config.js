module.exports = {
  apps: [
    {
      name: 'ideompotentcy-validator',
      script: '.build/src/server.js',
      exec_mode: 'fork',
      watch: true,
      autorestart: true,
      time: true,
      env: {
        NODE_ENV: 'dev',
        PORT: 3095
      },
      env_prod: {

      }
    }
  ]
}
