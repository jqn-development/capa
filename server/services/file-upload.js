const multer = require('multer');
const path = require('path')
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: 'eu-central-1' // region of your bucket
});

const s3 = new aws.S3();
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'capa-user-photos',
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, cb) {
			console.log(file);
			cb(null, Date.now().toString()+path.extname(file.originalname))
		}
	})
})

module.exports = upload;
