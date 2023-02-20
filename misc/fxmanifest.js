module.exports = `
fx_version "cerulean"
game 'gta5'

name 'NX'
description "FiveM framework."
repository 'https://github.com/niiyy/NX'
author "niiyy"
version '1.0.0'

client_script "client/client.min.js"
server_script "server/server.min.js"

ui_page 'ui/index.html'

files {
  'ui/index.html',
  'config/*.json',
  'ui/**/*'
}
`
