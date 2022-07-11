fx_version "cerulean"

description "FiveM framework."
author "niiyy"
version '1.0.0'

games {
  "gta5",
}

client_script "dist/client/client.min.js"
server_script "dist/server/server.min.js"


ui_page 'ui/dist/index.html'

files {
  'ui/dist/index.html',
  'config/*.json',
  'ui/dist/**/*'
}
