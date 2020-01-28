const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function () {
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

    describe('GET /api/songs', () => {
        context('given there are songs in the database', () => {
            const testUsers = helpers.makeUsersArray()
            const testSongs = helpers.makeSongsArray()

            beforeEach(
                async() => {
                    await db.into('users').insert(testUsers)
                    await db.into('songs').insert(testSongs)
                }
            )

            it('gets all songs', () => {
                return supertest(app)
                 .get('/api/songs')
                 .expect(200)
            })
        })
    })

    describe('GET /api/songs/:id', () => {
        context('given there are songs in the database', () => {
            const testUsers = helpers.makeUsersArray()
            const testSongs = helpers.makeSongsArray()

            beforeEach(
                async() => {
                    await db.into('users').insert(testUsers)
                    await db.into('songs').insert(testSongs)
                }
            )

            it('gets song by id', () => {
                const testId = 1
                const testSong = [testSongs[testId - 1]]

                return supertest(app)
                 .get(`/api/songs/${testId}`)
                 .expect(200, testSong)
            })
        })
    })
    describe('GET /api/songs/user/:id', () => {
        context('given there are songs in the database', () => {
            const testUsers = helpers.makeUsersArray()
            const testSongs = helpers.makeSongsArray()

            beforeEach(
                async() => {
                    await db.into('users').insert(testUsers)
                    await db.into('songs').insert(testSongs)
                }
            )

            it('gets song by user id', () => {
                const testId = 1
                const testSong = [testSongs[testId - 1]]

                return supertest(app)
                 .get(`/api/songs/${testId}`)
                 .expect(200)
            })
        })
    })

})