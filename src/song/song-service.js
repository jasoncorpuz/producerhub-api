const SongService = {
    getAllSongs(db) {
        return db
            .from('songs')
            .select(
                'songs.id as id',
                'title',
                'user_id',
                'location',
                'users.username as username',
                'description'
            )
            .join('users', 'users.id', 'songs.user_id')
    },
    getSongById(db, id) {
        return db
            .from('songs')
            .where('id', id)
            .select(
                'songs.id as id',
                'title',
                'user_id',
                'location',
                'users.username as username',
                'description'
            )
            .join('users', 'users.id', 'songs.user_id')
        //  .join('users', 'users.id', 'songs.user_id')
    },
    getSongByUser(db, userId) {
        return db
            .from('songs')
            .where('user_id', userId)
            .select(
                'songs.id as id',
                'title',
                'user_id',
                'location',
                'users.username as username',
                'description'
            )
            .join('users', 'users.id', 'songs.user_id')
    },
    postSong(db, song) {
        return db
         .insert(song)
         .into('songs')
         .returning('*')
         .then(rows => rows[0])
    }
}

module.exports = SongService