import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as fs from 'fs';
import * as path from 'path';

import {
  createEBVersion,
  createEBEnvironment,
  createEBApp,
  createDNSRecord,
} from '@wermote/architect/elastick-beanstalk';
import { retrieveSecrets } from '@wermote/architect/vault-secrets';

const config = new pulumi.Config();

const appName = config.require('appName');
const env = config.require('env');

export const ebApp = createEBApp({
  env,
  appName,
  type: 'app',
});

const bucket = new aws.s3.Bucket(`${env}-${appName}-app`);

const distPath = path.resolve(__dirname, '../dist');
const serverPath = path.resolve(distPath, 'web-app/server');

const serverFiles = fs
  .readdirSync(serverPath)
  .map((file) => path.resolve(serverPath, file));

const distPackage = path.resolve(__dirname, 'package.json');
serverFiles.push(distPackage);

export const ebVersion = createEBVersion({
  env,
  appName,
  bucket,
  ebApp,
  filesList: serverFiles,
});

const appSecrets = retrieveSecrets(appName, env);

export const ebCname = createEBEnvironment({
  ebApp,
  ebVersion,
  appName,
  env,
  instanceType: 't4g.micro',
  solutionName: '64bit.*Node.js 20',
  secrets: appSecrets,
});

export const hostname = createDNSRecord({
  ebCname,
  appName,
  env,
});
