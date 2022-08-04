//
// ! I know i need to refactor this code but its not important for now :) !
//
const fs = require('node:fs')
const path = require('node:path')
const process = require('child_process')
const dir = path.resolve(__dirname, '../dist')
const NXbuildFolderName = path.resolve(__dirname, '../NX')
const configDir = path.resolve(__dirname, '../dist/config')
const manifestDir = path.resolve(dir, 'fxmanifest.lua')
const configFilesDir = path.resolve(dir, 'config')
const manifestData = require('../misc/fxmanifest')

fs.existsSync(dir) && fs.rmdirSync(dir, { recursive: true })

console.log('\x1b[36mCreating build files...', '\x1b[0m')
process.exec('cd rc && yarn build', (error, stdout, stderr) => {
  if (error || stderr) return

  fs.writeFile(manifestDir, manifestData, (err) => {
    if (err) {
      return console.log(
        '\x1b[31m',
        `ERROR while creating manifest file: ${err}`,
        '\x1b[0m'
      )
    }
    fs.mkdirSync(configDir)
    fs.readdirSync(path.resolve(__dirname, '../config')).forEach(
      async (configFile) => {
        fs.readFile(
          path.resolve(__dirname, `../config/${configFile}`),
          'utf8',
          (err, data) => {
            if (err) {
              console.error(
                '\x1b[31m',
                `ERROR while reading file: ${configFile}`,
                '\x1b[0m'
              )
              console.log(err)
              return
            }
            fs.writeFile(path.resolve(configDir, configFile), data, (err) => {
              if (err) return console.log(err)

              fs.readFile(
                path.resolve(__dirname, '../import.sql'),
                'utf8',
                (err, data) => {
                  if (err) return

                  fs.writeFile(path.resolve(dir, 'import.sql'), data, (err) => {
                    if (err) {
                      console.error(
                        '\x1b[31m',
                        `ERROR while creating file: 'import.sql'`,
                        '\x1b[0m'
                      )
                      return
                    }

                    process.exec(
                      'cd ui && yarn build',
                      (error, stdout, stderr) => {
                        if (error || stderr) return
                        console.log(
                          '\x1b[32mBuild folder was created with succes !',
                          '\x1b[0m'
                        )
                      }
                    )
                  })
                }
              )
            })
          }
        )
      }
    )
  })
})
