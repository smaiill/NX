#!/usr/bin/env node

// You will not have to use this fill
// This is file is only used to generate a .json file thats contains data
// About the methods/services that are exported, i use this to generate the documentation.

import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const __EXPORT_SERVICE_TOKEN = 'ExportService'
const __EXPORT_METHOD_TOKEN = 'ExportMethod'
const __DEBUG_FILE = 'apps/rc/server/modules/events/events.service.ts'
const __OUTPUT_FILE = '_doc.json'
const __DEBUG = false

const COLORS = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  ESCAPE: '\x1b[0m',
  CYAN: '\x1b[36m',
}

const _customLog = (color, content) => {
  console.log(color, content, COLORS.ESCAPE)
}

const PATHS = {
  client: 'apps/rc/client/modules',
  server: 'apps/rc/server/modules',
}

const findDirServiceFiles = (dir) => {
  const serviceFiles = []
  const dirSubFolders = fs.readdirSync(dir)

  for (const folder of dirSubFolders) {
    const files = fs.readdirSync(`${dir}/${folder}`)

    for (const file of files) {
      file.includes('service') && serviceFiles.push(`${dir}/${folder}/${file}`)
    }
  }

  return serviceFiles
}

const formatNodeParams = (nodeParams) => {
  const _params = {}
  for (const params of nodeParams) {
    const paramsName = params.name.escapedText
    const paramsType = params.type?.getText() ?? 'unknown'
    const hasDefaultValue = params.initializer !== undefined
    const defaultValue = (hasDefaultValue && params.initializer.getText()) ?? ''
    const isOptional = params.questionToken !== undefined

    _params[ts.isObjectBindingPattern(params.name) ? 'object' : paramsName] = {
      type: paramsType,
      hasDefaultValue,
      defaultValue,
      isOptional,
    }
  }
  return _params
}

async function main() {
  _customLog(COLORS.GREEN, '> Started the export')

  const exportedMethods = []

  const findExportMethods = (node) => {
    if (ts.isClassDeclaration(node)) {
      const classDecorators = ts.getDecorators(node)

      const serviceName =
        classDecorators &&
        classDecorators.find((_d) =>
          _d.expression.getText().includes(__EXPORT_SERVICE_TOKEN),
        ).expression.arguments[0].text

      for (const member of node.members) {
        if (ts.isMethodDeclaration(member)) {
          const methodDecorators = ts.getDecorators(member)
          const __methodDefaultName = member.name.text

          const isExported =
            methodDecorators &&
            methodDecorators.some((decorator) => {
              return decorator.expression
                .getText()
                .includes(__EXPORT_METHOD_TOKEN)
            })

          const _nodeParams = formatNodeParams(member.parameters)

          const methodName =
            (methodDecorators &&
              methodDecorators.find((_d) =>
                _d.expression.getText().includes(__EXPORT_METHOD_TOKEN),
              ).expression.arguments[0]?.text) ??
            `${__methodDefaultName
              .charAt(0)
              .toUpperCase()}${__methodDefaultName.slice(1)}`

          if (isExported) {
            exportedMethods.push({
              name: methodName,
              service: serviceName,
              file: node.parent.fileName,
              params: { ..._nodeParams },
            })
          }
        }
      }
    }

    ts.forEachChild(node, findExportMethods)
  }

  for (const [, _path] of Object.entries(PATHS)) {
    const files = findDirServiceFiles(_path)

    for (const file of files) {
      const sourceFile = ts.createSourceFile(
        file,
        fs.readFileSync(file).toString(),
        ts.ScriptTarget.Latest,
        true,
      )

      findExportMethods(sourceFile)
    }

    if (__DEBUG) {
      const sourceFile = ts.createSourceFile(
        __DEBUG_FILE,
        fs.readFileSync(__DEBUG_FILE).toString(),
        ts.ScriptTarget.Latest,
        true,
      )

      findExportMethods(sourceFile)
    }
  }

  fs.writeFile(
    path.resolve(process.cwd(), __OUTPUT_FILE),
    JSON.stringify(exportedMethods, null, 2),
    (error) => {
      if (error) {
        _customLog(COLORS.RED, `> An error has occurred: ${error}`)
        return
      }
      _customLog(
        COLORS.GREEN,
        `> Data writed to ${COLORS.CYAN}[${__OUTPUT_FILE}]${COLORS.GREEN} with success !`,
      )
    },
  )
}

main()
