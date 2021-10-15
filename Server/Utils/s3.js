import AWS from "aws-sdk";

//AWS s3 Bucket config
const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY ="AKIA5QI24B6IKFHYN6GP",
    secretAccessKey: process.env.AWS_S3_SECRET_KEY = "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",
    region: "ap-south-1",
});

export const s3Upload = (options) => {
    return new Promise((resolve, reject) =>
      s3Bucket.upload(options, (error, data) => {
        if (error) return reject(error);
        return resolve(data);
      })
    );
  };