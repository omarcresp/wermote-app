import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

const config = new pulumi.Config();

const ENV = {
  appName: config.require('appName'),
  env: config.require('env'),
}

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket(`app-${ENV.env}-${ENV.appName}`);

// Export the name of the bucket
export const bucketName = bucket.id;
