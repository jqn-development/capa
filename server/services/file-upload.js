const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: 'eu-central-1' // region of your bucket
});

const s3 = new aws.S3();
const upload = multer({
	limits: { fieldSize: 25 * 1024 * 1024 },
	storage: multerS3({
		s3: s3,
		bucket: 'capa-user-photos',
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, cb) {
			cb(null, file.originalname)
		}
	})
})

module.exports = upload;
