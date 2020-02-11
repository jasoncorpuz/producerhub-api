# Producer Hub API
live: https://murmuring-shore-33614.herokuapp.com/api

This API allows users to upload songs to an Amazon s3 bucket, get & post songs and get & post likes.

## Users Endpoint

Get '/users'\
Returns all users.
```

[
    {
        "id": 1,
        "username": "Dua Lipa"
    },
    {
        "id": 2,
        "username": "John Coltrane"
    },
    ...
]

```
Get '/users/:userId'\
Returns user with specified id.

```
[
    {
        "id": 1,
        "username": "Dua Lipa"
    }
]

```

## Likes Endpoint

Get '/likes'\
Returns all likes. 

```
[
    {
        "id": 1,
        "user_id": 1,
        "song_id": 1
    },
    {
        "id": 2,
        "user_id": 2,
        "song_id": 1
    },
    ...
]

```

Get '/likes/user/:userId'\
Returns likes by specified user with corresponding userId.

```
[
    {
        "id": 1,
        "user_id": 1,
        "song_id": 1
    },
    {
        "id": 8,
        "user_id": 1,
        "song_id": 3
    },
    {
        "id": 11,
        "user_id": 1,
        "song_id": 4
    }
]
```

Get '/likes/song/:songId'\
Returns likes by song using songId.

```
[
    {
        "id": 1,
        "user_id": 1,
        "song_id": 1
    },
    {
        "id": 2,
        "user_id": 2,
        "song_id": 1
    },
    ...
]
```

## Songs Endpoints

Get '/songs'\
Returns all songs. 

```
[
    {
        "id": 1,
        "title": "Rach Rhapsody",
        "user_id": 1,
        "location": "https://test-300.s3-us-west-1.amazonaws.com/KVCL_Ind_Perc_Ens_4_125_Loop_5-8_13.wav",
        "username": "Dua Lipa",
        "description": "Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim."
    },
    {
        "id": 2,
        "title": "Under Shreksure",
        "user_id": 2,
        "location": "https://test-300.s3-us-west-1.amazonaws.com/OS_LFS_115_Cmin_Worn_Chords_Extended.wav",
        "username": "John Coltrane",
        "description": "Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim."
    },
    ...
]

```

Get '/songs/:songId'\
Returns specified song by it's id.

```
[
    {
        "id": 1,
        "title": "Rach Rhapsody",
        "user_id": 1,
        "location": "https://test-300.s3-us-west-1.amazonaws.com/KVCL_Ind_Perc_Ens_4_125_Loop_5-8_13.wav",
        "username": "Dua Lipa",
        "description": "Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim."
    }
]
```

Get '/songs/user/:userId'\
Returns all songs by specfied user via user id.

```
[
    {
        "id": 1,
        "title": "Rach Rhapsody",
        "user_id": 1,
        "location": "https://test-300.s3-us-west-1.amazonaws.com/KVCL_Ind_Perc_Ens_4_125_Loop_5-8_13.wav",
        "username": "Dua Lipa",
        "description": "Vitae turpis massa sed elementum tempus egestas sed. Justo donec enim diam vulputate ut pharetra sit amet. Consectetur purus ut faucibus pulvinar elementum integer enim."
    },
    {
        "id": 7,
        "title": "Legend",
        "user_id": 1,
        "location": "https://test-300.s3.amazonaws.com/t3.mp3",
        "username": "Dua Lipa",
        "description": "I am not an icon living!"
    },
    ...
]
```

## Upload Endpoint

POST '/upload'\
Posts file to Amazon S3 Bucket.\ 
Returns location of upload. \
Example upload example in React (use form data)

```
    uploadSong() {
        //after a file is saved into state

        const song = this.state.file
        const fd = new FormData()


        fd.append('element1', ' ')
        fd.append('element2', song)


        ApiService.upload(fd)
          //handle response here... 
    }
```

Return Data \

```
[
    {
    "location": "https://test-300.s3.amazonaws.com/t3.mp3"
    }
]

```

