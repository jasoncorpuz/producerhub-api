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
    ('Rach Rhapsody', 'https://test-300.s3-us-west-1.amazonaws.com/KVCL_Ind_Perc_Ens_4_125_Loop_5-8_13.wav', 1 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('Under Shreksure', 'https://test-300.s3-us-west-1.amazonaws.com/OS_LFS_115_Cmin_Worn_Chords_Extended.wav', 2 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('Trappers Delight', 'https://test-300.s3-us-west-1.amazonaws.com/OS_MDNB_174_Fm_Popcorn.wav', 3, 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('New City Path', 'https://test-300.s3-us-west-1.amazonaws.com/PG_115_Guitarloops_24_Am.wav', 3 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('The Campfire Song Song', 'https://test-300.s3-us-west-1.amazonaws.com/PL_EHV2_05_C_Piano_125_C%23min_Tail.wav', 4 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.'),
    ('Elvis is Actually Bad', 'https://test-300.s3-us-west-1.amazonaws.com/Perc_Loops_RadioPerc_120.wav', 5 , 'Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim.');

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