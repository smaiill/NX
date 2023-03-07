// ! I know i need to refactor this code but its not important for now :) !

import { exec } from 'child_process'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFile,
  rmdirSync,
  writeFile,
} from 'node:fs'
import { resolve } from 'node:path'
import manifestData from '../misc/fxmanifest'
const dir = resolve(__dirname, '../dist')
const configDir = resolve(__dirname, '../dist/config')
const manifestDir = resolve(dir, 'fxmanifest.lua')

existsSync(dir) && rmdirSync(dir, { recursive: true })

console.log('\x1b[36mCreating build files...', '\x1b[0m')
exec('cd apps/rc && pnpm build', (error, _, stderr) => {
  if (error || stderr) return

  writeFile(manifestDir, manifestData, (err) => {
    if (err) {
      return console.log(
        '\x1b[31m',
        `ERROR while creating manifest file: ${err}`,
        '\x1b[0m',
      )
    }
    mkdirSync(configDir)
    readdirSync(resolve(__dirname, '../config')).forEach(async (configFile) => {
      readFile(
        resolve(__dirname, `../config/${configFile}`),
        'utf8',
        (err, data) => {
          if (err) {
            console.error(
              '\x1b[31m',
              `ERROR while reading file: ${configFile}`,
              '\x1b[0m',
            )
            console.log(err)
            return
          }
          writeFile(resolve(configDir, configFile), data, (err) => {
            if (err) return console.log(err)

            readFile(resolve(__dirname, '../nx.sql'), 'utf8', (err, data) => {
              if (err) return

              writeFile(resolve(dir, 'nx.sql'), data, (err) => {
                if (err) {
                  console.error(
                    '\x1b[31m',
                    `ERROR while creating file: 'nx.sql'`,
                    '\x1b[0m',
                  )
                  return
                }

                exec('cd apps/ui && yarn build', (error, stdout, stderr) => {
                  console.log(
                    '\x1b[32mRelease folder was created with success !',
                    '\x1b[0m',
                  )

                  if (error || stderr) return
                })
              })
            })
          })
        },
      )
    })
  })
})
