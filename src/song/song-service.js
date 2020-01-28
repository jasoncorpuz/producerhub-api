const SongService = {
    getAllSongs(db){
        return db
         .from('songs')
         .select('*')
    },
    getSongById(db, id) {
        return db
         .from('songs')
         .where('id', id)
         .select('*')
        //  .join('users', 'users.id', 'songs.user_id')
    },
    getSongByUser(db, userId) {
        return db
         .from('songs')
         .where('user_id', userId)
         .select('*')
    }
}

module.exports = SongService