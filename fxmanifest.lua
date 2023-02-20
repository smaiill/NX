fx_version "cerulean"
game 'gta5'

name 'NX'
description "FiveM framework."
repository 'https://github.com/niiyy/NX'
author "niiyy"
version '1.0.0'


client_script "dist/client/client.min.js"
server_script "dist/server/server.min.js"


ui_page 'dist/ui/index.html'

files {
  'dist/ui/index.html',
  'dist/ui/**/*',
  'config/*.json'
 
}

dependency {
	"skinchanger",
}