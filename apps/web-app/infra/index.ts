import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as fs from 'fs';
import * as path from 'path';
import * as zl from 'zip-lib';

import {
  createEBStack,
  createDNSRecord,
} from '@wermote/architect/elastick-beanstalk';
import { retrieveSecrets } from '@wermote/architect/vault-secrets';

const config = new pulumi.Config();

const appName = config.require('appName');
const env = config.require('env');

export const appSecrets = retrieveSecrets(appName, env);

const bucket = new aws.s3.Bucket(`app-${env}-${appName}`);

const distPath = path.resolve(__dirname, '../dist');
const serverPath = path.resolve(distPath, 'web-app/server');

const serverFiles = fs.readdirSync(serverPath);

const zip = new zl.Zip();

serverFiles.forEach((file) => {
  const filePath = path.resolve(serverPath, file);

  zip.addFile(filePath);
});

const distPackage = path.resolve(__dirname, 'dist-package.json');
zip.addFile(distPackage, 'package.json');

const zipFile = path.resolve(distPath, 'application.zip');
const zipPromise = zip.archive(zipFile);

async function uploadToBucket() {
  await zipPromise;

  return new aws.s3.BucketObject(`object-${env}-${appName}`, {
    bucket,
    key: 'application.zip',
    source: new pulumi.asset.FileAsset(zipFile),
  });
}

const versionObject = uploadToBucket();

export const ebStack = createEBStack({
  env,
  appName,
  bucket,
  versionObject,
  type: 'app',
  solutionName: '64bit.*Node.js 20',
  secrets: appSecrets,
  instanceType: 't4g.micro',
});

export const hostname = createDNSRecord({
  ebStack,
  appName,
  env,
});
