import { writeFileSync } from 'fs'
import { relative, resolve } from 'path'

import { parallel, task } from 'gulp'

import { version, author, license, repository, contributors, workspaces } from './package.json'

const pascalCase = (str: string): string => str
    .replace(/(\w)(\w*)/g, (_0, _1, _2) => _1.toUpperCase() + _2.toLowerCase())
    .replace(/[-.]/g, '')

const getPackageNameSuffix = (workspacePath: string): string => workspacePath
        .split('/')
        .filter(_ => _)
        .pop()!!

const toJsonString = (obj: object): string =>
    JSON.stringify(obj, null, 2)

const rewriteFile = (relativePath: string, content: string): void =>
    writeFileSync(resolve(__dirname, relativePath), content)

const Template = {

    packageJson (name: string, dependencies: Record<string, string> = {}): string {
        return toJsonString({
            name,
            version,
            author,
            license,
            repository,
            contributors,
            dependencies,
        })
    },

    tsConfig (path: string): string  {
        return  toJsonString({
            extends: relative(resolve(__dirname, path),  'tsconfig.json'),
            compileOptions: {
                outDir: './dist'
            }
        })
    },

    caseFile (dashCaseName: string) {
        const name = pascalCase(dashCaseName)

        const statuses = `${name}Statuses`
        const flares = `${name}Flares`

        return `
            import { ${statuses}, FlaresConstructor } from '@flares/${dashCaseName}';
        
            const ${flares} = new FlaresConstructor(${statuses})
        
            export {
                ${statuses},
                ${flares},
                ${flares} as F
            }
        `
    }

}
/*
task('setup:packages', cb => {
    for (const path of workspaces) {
        const dashCaseSuffix = getPackageNameSuffix(path)

        rewriteFile(resolve(path, 'package.json'), Template.packageJson(`@flares/${dashCaseSuffix}`))
    }
    cb()
})

task('setup:tsconfig', (cb: () => void) => {
    for (const path of workspaces) {
        const dashCaseName = getPackageNameSuffix(path)
        const pascalCaseName = pascalCase(dashCaseName)

        rewriteFile(resolve(path, 'package.json'), Template.tsConfig(pascalCaseName)))
    }
    cb()
})*/

// task('setup:api:code', () => {
//
// })
//
//
//
//
// task('setup:api', () => {
//
// })
//
//
// task('setup', parallel(
//
// ))