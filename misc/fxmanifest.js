module.exports = `
fx_version "cerulean"
game 'gta5'

name 'NX'
description "FiveM framework."
repository 'https://github.com/niiyy/NX'
author "niiyy"
version '0.0.1'

client_script "client/client.min.js"
server_script "server/server.min.js"

ui_page 'ui/index.html'

files {
  'ui/index.html',
  'ui/**/*',
  'config/*.json'
}
`
