fx_version "cerulean"

description "FiveM framework."
author "niiyy & Af0xz"
version '1.0.0'

games {
  "gta5",
}

client_script "dist/client/client.min.js"
server_script "dist/server/server.min.js"

shared_scripts {
  'rc/shared/load.file.ts',
  'rc/shared/**/*'
}

ui_page 'ui/dist/index.html'

files {
  'ui/dist/index.html',
  'config/*.json',
  'ui/dist/**/*'
}
