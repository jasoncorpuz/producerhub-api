require('dotenv').config()

const Busboy = require('busboy');
const express = require('express')
const AWS = require('aws-sdk')

const uploadRouter = express.Router()

const BUCKET_NAME = process.env.BUCKET_NAME
const IAM_USER_KEY = process.env.IAM_USER_KEY
const IAM_USER_SECRET = process.env.IAM_USER_SECRET

uploadRouter
    .post('/', function (req, res, next) {
        // This grabs the additional parameters so in this case passing     
        // in "element1" with a value.
        
        const element1 = req.body.element1;
        let location = ''
        var busboy = new Busboy({ headers: req.headers });
        // The file upload has completed
        busboy.on('finish', function () {
            
            
            const file = req.files.element2;
            
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

    })

module.exports = uploadRouter