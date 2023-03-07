import { context } from 'esbuild'

const __pServer = {
  name: 'nx__watch__server',
  setup(build) {
    build.onEnd((res) => {
      if (res.errors.length > 0) {
        console.log('\x1b[31m%s\x1b[0m', 'Error while compiling [-SERVER-]')
      } else {
        console.log(
          '\x1b[36m%s\x1b[0m',
          `Build with success \x1b[32m[SERVER]\x1b[0m : ${new Date().toLocaleString()}`,
        )
      }
    })
  },
}

const __pClient = {
  name: 'nx__watch__client',
  setup(build) {
    build.onEnd((res) => {
      if (res.errors.length > 0) {
        console.log('\x1b[31m%s\x1b[0m', 'Error while compiling [-CLIENT-]')
      } else {
        console.log(
          '\x1b[36m%s\x1b[0m',
          `Build with success \x1b[32m[CLIENT]\x1b[0m : ${new Date().toLocaleString()}`,
        )
      }
    })
  },
}

const ctxServer = await context({
  bundle: true,
  entryPoints: ['./server/index.ts'],
  outfile: '../../dist/server/server.min.js',
  sourcemap: 'external',
  platform: 'node',
  plugins: [__pServer],
  loader: {
    '.ts': 'ts',
    '.js': 'js',
  },
})

const ctxClient = await context({
  bundle: true,
  entryPoints: ['./client/index.ts'],
  outfile: '../../dist/client/client.min.js',
  sourcemap: 'external',
  platform: 'node',
  plugins: [__pClient],
  loader: {
    '.ts': 'ts',
    '.js': 'js',
  },
})

await ctxServer.watch()
await ctxClient.watch()
