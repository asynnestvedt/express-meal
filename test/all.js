const express = require('express')
const path = require('path')
const app = express()
const loader = require('../../express-meal')
const http = require('http')

const chai = require('chai')
const chaiHttp = require('chai-http')

const router = loader.getRouter({
    cwd: path.join(__dirname, './modules'),
    glob: '**/*routes*.js'
})

/**
 * FIXME: Tests fail due to server "listening" before routes fully set up.
 * This also occurred when using glob.sync which makes me suspect that
 * express binds the routes asynchronously. We could wrap it all in a promise
 * But that would necessitate a change to how we're loading the module.
 * Console logging below to demonstrate 
 */

app.use('/prefix', router)
const server = http.createServer(app)
server.listen(3838,() => {
    console.debug(`server listening?: ${server.listening}`)
    console.debug(`# of routes configured: ${router.stack.length}`)
    setTimeout(()=>console.debug(`# of routes configured: ${router.stack.length}`),1000)

    chai.should()
    chai.use(chaiHttp)
    
    describe('GET /prefix/compliance/', () => {
        it('it should have status 200', (done) => {
    
        chai
            .request(server)
            .get('/prefix/compliance/')
            .end((err, res) => {
                res.should.have.status(200)
                done(err)
            })
        })
    })
    
    describe('GET /prefix/compliance/valuables/assets', () => {
        it('it should have status 200', (done) => {

        chai
            .request(app)
            .get('/prefix/compliance/valuables/assets')
            .end((err, res) => {
                res.should.have.status(200)
                done(err)
            })
        })
    })
})

