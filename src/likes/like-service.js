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
    }
}

module.exports = LikeService