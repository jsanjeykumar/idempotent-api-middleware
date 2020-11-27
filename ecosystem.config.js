module.exports = {
  apps: [
    {
      name: 'ideompotent-a',
      script: '.build/src/validator.js',
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
