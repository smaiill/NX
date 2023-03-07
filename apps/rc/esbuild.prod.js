import { build } from 'esbuild'

build({
  entryPoints: ['./client/index.ts'],
  outfile: '../../dist/client/client.min.js',
  bundle: true,
  // minify: true,
  sourcemap: true,
  platform: 'node',
  loader: {
    '.ts': 'ts',
    '.js': 'js',
  },
})
  .then(() => {
    console.log(
      '\x1b[32m[CLIENT]\x1b[0m --',
      '\x1b[36mClient build finished with success\x1b[0m',
    )
  })
  .catch((err) => {
    console.error('\x1b[31m%s\x1b[0m', 'Client build failed :', err)
    process.exit(1)
  })

build({
  entryPoints: ['./server/index.ts'],
  outfile: '../../dist/server/server.min.js',
  bundle: true,

  // ! This causes an syntaxe error !
  // minify: true,
  minifyWhitespace: true,
  sourcemap: true,
  platform: 'node',
  loader: {
    '.ts': 'ts',
    '.js': 'js',
  },
})
  .then(() => {
    console.log(
      '\x1b[32m[SERVER]\x1b[0m --',
      '\x1b[36mServer build finished with success\x1b[0m',
    )
  })
  .catch((err) => {
    console.error('\x1b[31m%s\x1b[0m', 'Server build failed :', err)
    process.exit(1)
  })
