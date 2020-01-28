const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Likes Endpoint', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    
    context('given there is information in the db', () => {
        const testUsers = helpers.makeUsersArray()
        const testSongs = helpers.makeSongsArray()
        const testLikes = helpers.createLikes()
        const testId = 1
        const songId = 2
        const testUser = testUsers[testId -1]

        beforeEach(
            async () => {
                await db.into('users').insert(testUsers)
                await db.into('songs').insert(testSongs)
                await db.into('likes').insert(testLikes)

            }
        )

        it('gets all songs', () => {
            return supertest(app)
             .get('/api/likes')
             .expect(testLikes)
        })

        it('gets likes by user id', () => {
            return supertest(app)
             .get(`/api/likes/user/${testId}`)
             .expect(200)
        })

        it('gets likes by song id', () => {
            return supertest(app)
             .get(`/api/likes/song/${songId}`)
             .expect(200)
        })
    })
})