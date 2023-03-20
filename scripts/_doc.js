#!/usr/bin/env node

// You will not have to use this fill
// This is file is only used to generate a .json file thats contains data
// About the methods/services that are exported, i use this to generate the documentation.

'use strict'

import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const __EXPORT_SERVICE_TOKEN = 'ExportService'
const __EXPORT_METHOD_TOKEN = 'ExportMethod'
const __DEBUG_FILE = 'apps/rc/server/modules/events/events.service.ts'
const __OUTPUT_FILE = '_doc.json'
const __DEBUG = false
const __NXPlayerMethodsFile = 'apps/rc/server/modules/player/player.class.ts'

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

// const program = ts.createProgram([PATHS.client], {})
// const typeChecker = program.getTypeChecker()

const uuid = () => {
  const dt = new Date().getTime()
  const _uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (value) => {
      const rtx = (dt + Math.random() * 16) % 16 | 0
      return (value == 'x' ? rtx : (rtx & 0x3) | 0x8).toString(16)
    },
  )

  return _uuid
}

const findDirServiceFiles = (dir, pathName) => {
  const serviceFiles = []
  const dirSubFolders = fs.readdirSync(dir)

  for (const folder of dirSubFolders) {
    const files = fs.readdirSync(`${dir}/${folder}`)

    for (const file of files) {
      if (file.includes('service')) {
        const fileName = file.split('.')[0]
        serviceFiles.push({
          dir: `${dir}/${folder}/${file}`,
          fileName: fileName.toLowerCase(),
          pathName,
        })
      }
    }
  }

  return serviceFiles
}

const formatNodeParams = (nodeParams, JSDoc) => {
  return nodeParams.map((param) => {
    const paramName = param.name.escapedText
    const paramType = param.type ? param.type.getText() : 'unknown'
    const hasDefaultValue = !!param.initializer
    const defaultValue = hasDefaultValue ? param.initializer.getText() : '-'
    const isOptional = !!param.questionToken

    let comment = ''
    if (JSDoc) {
      const paramTag = JSDoc.find(
        (tag) => tag.name && tag.name.getText() === paramName,
      )
      if (paramTag && paramTag.comment) {
        comment = paramTag.comment.trim()
      }
    }

    return {
      name: ts.isObjectBindingPattern(param.name) ? 'object' : paramName,
      type: paramType,
      hasDefaultValue,
      defaultValue,
      isOptional,
      comment,
    }
  })
}

const removeEmptyServices = (data) => {
  if (!Array.isArray(data)) return

  for (const item of data) {
    if (item.items && item.items.length === 0) {
      const serviceIndex = data.findIndex(
        (_service) => _service.uuid === item.uuid,
      )
      data.splice(serviceIndex, 1)
    } else {
      removeEmptyServices(item.items)
    }
  }
}

const getMethodExample = (JSDoc) => {
  const examples = []

  for (const _tag of JSDoc) {
    if (_tag.tagName.text === 'example') {
      examples.push(_tag.comment)
    }
  }

  return examples
}

const getNXPlayerMethods = async (file) => {
  const methods = []

  ts.forEachChild(file, (node) => {
    if (ts.isClassDeclaration(node)) {
      for (const member of node.members) {
        if (ts.isMethodDeclaration(member)) {
          const __methodDefaultName = member.name.text
          const sourceFile = member.getSourceFile()

          const returnType = member?.type?.getText() ?? 'void'

          const methodName = `${__methodDefaultName
            .charAt(0)
            .toUpperCase()}${__methodDefaultName.slice(1)}`

          const { line } = ts.getLineAndCharacterOfPosition(
            sourceFile,
            member.getStart(),
          )

          const JSDoc = ts.getJSDocTags(member)
          const _nodeParams = formatNodeParams(member.parameters, JSDoc)
          const returnTag = ts.getJSDocReturnTag(member)

          methods.push({
            name: methodName,
            file: node.parent.fileName,
            params: _nodeParams,
            return: {
              type: returnType,
              comment: returnTag?.comment ?? '',
            },
            uuid: uuid(),
            type: 'p_method',
            line,
            description: JSDoc[0]?.parent?.comment ?? '',
            examples: getMethodExample(JSDoc),
          })
        }
      }
    }
  })

  _customLog(
    COLORS.GREEN,
    `> Exported ${COLORS.CYAN}[${methods.length}]${COLORS.GREEN} player method`,
  )

  return methods
}

const main = async () => {
  _customLog(COLORS.GREEN, '> Started the export')

  const exportedMethods = []

  const findExportMethods = (node, pathName) => {
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
          const sourceFile = member.getSourceFile()

          const isExported =
            methodDecorators &&
            methodDecorators.some((decorator) => {
              return decorator.expression
                .getText()
                .includes(__EXPORT_METHOD_TOKEN)
            })

          const returnType = member?.type?.getText() ?? 'void'

          const methodName =
            (methodDecorators &&
              methodDecorators.find((_d) =>
                _d.expression.getText().includes(__EXPORT_METHOD_TOKEN),
              ).expression.arguments[0]?.text) ??
            `${__methodDefaultName
              .charAt(0)
              .toUpperCase()}${__methodDefaultName.slice(1)}`

          const { line } = ts.getLineAndCharacterOfPosition(
            sourceFile,
            member.getStart(),
          )

          if (isExported) {
            const JSDoc = ts.getJSDocTags(member)
            const _nodeParams = formatNodeParams(member.parameters, JSDoc)
            const returnTag = ts.getJSDocReturnTag(member)

            const path = exportedMethods.find(
              (_path) => _path.name === pathName,
            )
            const service = path.items.find(
              (_service) =>
                _service.name.toLowerCase() === serviceName.toLowerCase(),
            )

            service.items.push({
              name: methodName,
              service: serviceName,
              file: node.parent.fileName,
              params: _nodeParams,
              return: {
                type: returnType,
                comment: returnTag?.comment ?? '',
              },
              category: `${pathName.charAt(0).toUpperCase()}${pathName.slice(
                1,
              )}`,
              uuid: uuid(),
              type: 'method',
              line,
              description: JSDoc[0]?.parent?.comment ?? '',
              examples: getMethodExample(JSDoc),
            })
          }
        }
      }
    }

    ts.forEachChild(node, (_n) => findExportMethods(_n, pathName))
  }

  const NXPlayerMethodsSourceFile = ts.createSourceFile(
    __NXPlayerMethodsFile,
    fs.readFileSync(__NXPlayerMethodsFile).toString(),
    ts.ScriptTarget.Latest,
    true,
  )

  const NXPlayerMethodsArray = await getNXPlayerMethods(
    NXPlayerMethodsSourceFile,
  )

  for (const [pathName, _path] of Object.entries(PATHS)) {
    exportedMethods.push({
      name: pathName,
      _path,
      items: [],
    })
    const files = findDirServiceFiles(_path, pathName)

    if (!__DEBUG) {
      for (const { dir, pathName: _pathName, fileName } of files) {
        const path = exportedMethods.find((_path) => _path.name === _pathName)
        path.items.push({
          name: fileName,
          items: [],
          uuid: uuid(),
          type: 'service',
        })
        const sourceFile = ts.createSourceFile(
          dir,
          fs.readFileSync(dir).toString(),
          ts.ScriptTarget.Latest,
          true,
        )

        findExportMethods(sourceFile, pathName)
      }
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

  removeEmptyServices(exportedMethods)

  exportedMethods.push({
    name: 'nxPlayer',
    items: [...NXPlayerMethodsArray],
    uuid: uuid(),
  })

  fs.writeFile(
    path.resolve(process.cwd(), __OUTPUT_FILE),
    JSON.stringify(exportedMethods, null, 2),
    async (error) => {
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
