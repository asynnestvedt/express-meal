const Router = require ('express').Router
const globParser = require("glob")
const path = require('path')

module.exports = {
    getRouter: function(params) {
        let { cwd, glob } = params

        const rootRouter = Router()

        const globDoneCB = (er, filelist) => {
            if (er) {
                throw new Error(`express-meal filesystem error: ${er.toString()}`)
            }
                
            filelist.forEach(file => {
                const parsedPath = path.parse(file.replace(cwd,''))
                const collapsableRouter = Router({ mergeParams: true })
                collapsableRouter.use(parsedPath.dir, require(file))
                rootRouter.use('/', collapsableRouter)
                console.debug(`using router at ${file}`)
            })
        }

        const filelist = globParser(glob, {absolute: true}, globDoneCB)

        return  rootRouter
    }
}