const s3Configs = require("../configs_DO_NOT_GITHUB.json").s3;

const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Access = new S3Client({
  region: s3Configs.region,
  credentials: {
    accessKeyId: s3Configs.accessKey,
    secretAccessKey: s3Configs.secretAccessKey
  }
});

async function s3Upload(file) {
  let name = crypto.randomUUID()

  const uploadParams = {
    Bucket: s3Configs.name,
    Body: file,
    Key: name
  }

  let commandRes;

  try {
    const command = new PutObjectCommand(uploadParams);
    commandRes = await s3Access.send(command);
  } catch (e) {
    console.log("From s3.js: file upload failed!");
  }

  commandRes.key = name;
  return commandRes;
}

async function s3Download(fileKey) {
  const downloadParms = {
    Bucket: s3Configs.name,
    Key: fileKey,
  }

  const command = new GetObjectCommand(downloadParms);
  const commandRes = await s3Access.send(command);

  return commandRes.Body;
}

module.exports = {
  s3Upload,
  s3Download
};
