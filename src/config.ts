import chalk = require('chalk')
import * as fs from 'fs'
import * as path from 'path'

/**
 * The configuration file's content
 * For details on what these options do, see the project's README
 */
export interface Config {
  readonly verbose?: boolean
  readonly noColor?: boolean

  readonly apiInputPath: string
  readonly sdkOutput: string
  readonly sdkInterfacePath: string

  readonly magicTypes?: MagicType[]
  readonly jsonOutput?: string
  readonly jsonPrettyOutput?: boolean
  readonly prettierConfig?: string

  readonly prettify?: boolean
  readonly overwriteOldOutputDir?: boolean
  readonly generateDefaultSdkInterface?: boolean
  readonly generateTimestamps?: boolean

  readonly rejectIfNodeModules?: boolean
}

/**
 * Magic type used to replace a non-compatible type in the generated SDK
 */
export interface MagicType {
  readonly nodeModuleFilePath: string
  readonly typeName: string
  readonly placeholderContent: string
}

/**
 * Load an existing configuration file and decode it
 * @param configPath
 */
function loadConfigFile(configPath: string): Config {
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red('Config file was not found at path: ' + chalk.yellow(path.resolve(configPath))))
    process.exit(4)
  }

  const text = fs.readFileSync(configPath, 'utf8')

  try {
    return JSON.parse(text)
  } catch (e) {
    console.error(chalk.red('Failed to parse configuration file: ' + e))
    process.exit(3)
  }
}

export const configPath = process.argv[2]

if (!configPath) {
  console.error(chalk.red('Please provide a path to the configuration file'))
  process.exit(2)
}

export const config = loadConfigFile(configPath)
