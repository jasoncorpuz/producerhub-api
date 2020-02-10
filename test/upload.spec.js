const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe('Upload Endpoint', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnet from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('post /api/upload', () =>{
        it('uploads song to cloud storage', () => {
            // const song = uploadMe
            // const fd = new FormData()
    
    
            // fd.append('element1', ' ')
            // fd.append('element2', song)

            return supertest(app)
             .post('/api/upload')
            //  .field('Content-Type', 'multipart/form-data')
             .field('element1', 'test')
             .attach('element2', 'test/download.jpg')
             .expect(200)
        })
    })      
    

})