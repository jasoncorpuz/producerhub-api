const LikeService =  {
    getLikeByUser(db, userId) {
        return db 
         .from('likes')
         .select('*')
         .where('user_id', userId)
    }, 
    
    getLikeBysSong(db, songId) {
        return db 
         .from('likes')
         .select('*')
         .where('song_id', songId)
    }, 

    getAllLikes(db){
        return db
         .from('likes')
         .select('*')
    },
    postLike(db, like) {
        return db
         .into('likes')
         .insert(like)
         .returning('*')
         .then(rows => rows[0])
    }
}

module.exports = LikeService