CREATE TABLE songs (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL, 
    location TEXT NOT NULL, 
    user_id INTEGER
    REFERENCES users(id) ON DELETE CASCADE NOT NULL, 
    description TEXT NOT NULL
);

-- CREATE INDEX "idx_song__likes" ON "songs" ("likes");

-- CREATE INDEX "idx_song__users" ON "songs" ("users");

ALTER TABLE "likes" ADD CONSTRAINT "fk_likes_songs" FOREIGN KEY ("song_id") REFERENCES "songs" ("id") ON DELETE CASCADE;

-- ALTER TABLE "songs" ADD CONSTRAINT "fk_songs__likes" FOREIGN KEY ("likes") REFERENCES "likes" ("id") ON DELETE CASCADE;

-- ALTER TABLE "songs" ADD CONSTRAINT "fk_songs__users" FOREIGN KEY ("users") REFERENCES "users" ("id") ON DELETE CASCADE;