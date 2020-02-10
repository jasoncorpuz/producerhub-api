const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    // seed users
    return[
        {
            id: 1, 
            username:'test user 1',
            password:"Password.1"
        },
        {
            id: 2, 
            username:'test user 2',
            password:"Password.1"
        },
        {
            id: 3, 
            username:'test user 3',
            password:"Password.1"
        },
        {
            id: 4, 
            username:'test user 4',
            password:"Password.1"
        }
    ]
}

function makeSongsArray(){
  return [
    {
      id: 1,
      title: 'test title',
      location: 'somelocation.com',
      user_id: 1, 
      description:'Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Cursus turpis massa tincidunt dui ut ornare. Felis donec et odio pellentesque.'
    },
    {
      id: 2,
      title: 'test title',
      location: 'somelocation.com',
      user_id: 2, 
      description:'Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Cursus turpis massa tincidunt dui ut ornare. Felis donec et odio pellentesque.'
    },
    {
      id: 3,
      title: 'test title',
      location: 'somelocation.com',
      user_id: 3, 
      description:'Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Cursus turpis massa tincidunt dui ut ornare. Felis donec et odio pellentesque.'
    },
  ]
}

function createLikes(){
  return [
    {
      id: 1, 
      user_id: 1, 
      song_id: 2
    }, 
    {
      id: 2, 
      user_id: 2, 
      song_id: 3
    }, 
    {
      id: 3, 
      user_id: 4, 
      song_id: 3
    }, 
    {
      id: 4, 
      user_id: 3, 
      song_id: 2
    }, 
  ]
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.username,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
            songs,
            likes,
            users
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE songs_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE likes_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('songs_id_seq', 0)`),
          trx.raw(`SELECT setval('likes_id_seq', 0)`),
          trx.raw(`SELECT setval('users_id_seq', 0)`),
        ])
      )
    )
  }

  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      password: bcrypt.hashSync(user.password, 1)


    }))
    return db.into('users').insert(preppedUsers)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }
  
module.exports = {
    cleanTables,
    makeUsersArray,
    makeAuthHeader,
    seedUsers,
    makeSongsArray,
    createLikes
}