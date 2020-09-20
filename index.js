var AWS = require('aws-sdk');
const ytdl = require('ytdl-core');

/*
docker run -p 9000:9000 \
  -e "MINIO_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE" \
  -e "MINIO_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" \
  minio/minio server /data
*/

(async () => {
  var s3  = new AWS.S3({
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    endpoint: 'http://127.0.0.1:9000',
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  });

  VIDEO_ID = 'A02s8omM_hI';
  BUCKET_NAME = 'ytdl';

  const info = await ytdl.getInfo(VIDEO_ID);
  const stream = ytdl(`http://www.youtube.com/watch?v=${VIDEO_ID}`);
  s3.upload({ Bucket: BUCKET_NAME, Key: VIDEO_ID, Body: stream }, function(err, data) {
    if (err) {
      console.error(err);
    }
    else {
      console.log("Success");
    }
  });
})().catch(e => {
  console.error(e);
});
