#!/usr/bin/node

import { panic } from 'typescript-core'

import { analyzerCli } from './analyzer'
import { rawCmdArgs } from './cmdargs'
import { setupEnv } from './env'
import generatorCli from './generator'

setupEnv()

switch (process.argv[2]) {
  case 'analyze':
    analyzerCli({
      input: rawCmdArgs._[1] ?? rawCmdArgs['input'] ?? rawCmdArgs['i'],
      output: rawCmdArgs._[2] ?? rawCmdArgs['output'] ?? rawCmdArgs['o'],
      pretty: !!rawCmdArgs['pretty'],
      //allowAllImportExt: !!rawCmdArgs['allow-all-import-ext'],
    })
    break

  case 'generate':
    generatorCli({
      input: rawCmdArgs._[1] ?? rawCmdArgs['input'] ?? rawCmdArgs['i'] ?? panic('Please provide an input path'),
      output: rawCmdArgs._[2] ?? rawCmdArgs['output'] ?? rawCmdArgs['o'] ?? panic('Please provide an output path'),
      configScriptPath:
        rawCmdArgs['config-script-path'] ??
        rawCmdArgs['c'] ??
        panic('Please provide a path for the file providing the configuration (-c <path>)'),
      configNameToImport: rawCmdArgs['config-name-to-import'] ?? rawCmdArgs['n'],
      allowAllImportExt: !!rawCmdArgs['allow-all-import-ext'],
      prettify: !!rawCmdArgs['prettify'],
      prettierConfig: rawCmdArgs['prettier-config'],
    })
    break

  default:
    console.error('ERROR: Unknown action provided (must be either "analyze" or "generate")')
    process.exit(1)
}
