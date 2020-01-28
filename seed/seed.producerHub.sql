BEGIN;

TRUNCATE
    users,
    likes,
    songs
    RESTART IDENTITY CASCADE;

INSERT INTO users (username, password)
VALUES 
    ('Dua Lipa','$2a$12$B3746Q.72JlSFuNCvH7xC.pKF0rszVp2sWLBZYSF.EzUuVxNCvPjG'),
    ('John Coltrane','$2a$12$B3746Q.72JlSFuNCvH7xC.pKF0rszVp2sWLBZYSF.EzUuVxNCvPjG'),
    ('Legolas','$2a$12$B3746Q.72JlSFuNCvH7xC.pKF0rszVp2sWLBZYSF.EzUuVxNCvPjG'),
    ('Mulan','$2a$12$B3746Q.72JlSFuNCvH7xC.pKF0rszVp2sWLBZYSF.EzUuVxNCvPjG'),
    ('Snape','$2a$12$B3746Q.72JlSFuNCvH7xC.pKF0rszVp2sWLBZYSF.EzUuVxNCvPjG');

INSERT INTO songs (title, location, user_id, description)
VALUES
    ('Rach Rhapsody', 'somelocation.com', 1 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('Under Shreksure', 'somelocation.com', 2 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('Trappers Delight', 'somelocation.com', 3, 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('New City Path', 'somelocation.com', 3 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('The Campfire Song Song', 'somelocation.com', 4 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('Elvis is Actually Bad', 'somelocation.com', 5 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.');

INSERT INTO likes (song_id, user_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 3),
    (2, 4),
    (2, 5),
    (3, 1),
    (3, 2),
    (3, 3),
    (4, 1),
    (4, 2),
    (4, 3);
    
COMMIT; 