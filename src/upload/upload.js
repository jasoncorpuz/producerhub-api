require('dotenv').config()

const Busboy = require('busboy');
const express = require('express')
const AWS = require('aws-sdk')

const uploadRouter = express.Router()

const BUCKET_NAME = 'test-300'
// const IAM_USER_KEY = 'AKIAUESC257KEPPXM3NI'
const IAM_USER_KEY = 'AKIAUESC257KFDS3OJFT'
const IAM_USER_SECRET = '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'

uploadRouter
    .post('/', function (req, res, next) {
        // This grabs the additional parameters so in this case passing     
        // in "element1" with a value.
        console.log(req.body)
        const element1 = req.body.element1;
        let location = ''
        var busboy = new Busboy({ headers: req.headers });
        // The file upload has completed
        busboy.on('finish', function () {
            console.log('Upload finished');
            console.log(element1)
            const file = req.files.element2;
            console.log(file);
            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME
            });
            s3bucket.createBucket(function () {
                var params = {
                    Bucket: BUCKET_NAME,
                    Key: file.name,
                    Body: file.data
                };
                s3bucket.upload(params, function (err, data) {
                    if (err) {
                        console.log('error in callback');
                        console.log(err);
                    }
                    location = data.Location;
                    
                    //store this in database
                    res.status(200).json({
                        location: location
                    })
                }); 
            });
        })
        req.pipe(busboy);
        console.log(location)


    })

module.exports = uploadRouter