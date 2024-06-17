import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";
import * as path from "path";

import {
  createEBApp,
  createEBVersion,
  createEBEnvironment,
  createDNSRecord,
} from "@wermote/architect/elastick-beanstalk";
import { retrieveSecrets } from "@wermote/architect/vault-secrets";

const config = new pulumi.Config();

const appName = config.require("appName");
const env = config.require("env");

export const ebApp = createEBApp({
  env,
  appName,
  type: "app",
});

const bucket = new aws.s3.Bucket(`${env}-${appName}-service`);

const projectPath = path.resolve(__dirname, "..");
const BANNED_FILES = ["bin", "infra", "package.json"];
const projectFiles = fs
  .readdirSync(projectPath)
  .filter((f) => !BANNED_FILES.includes(f))
  .map((f) => path.resolve(projectPath, f));

export const ebVersion = createEBVersion({
  env,
  appName,
  bucket,
  ebApp,
  filesList: projectFiles,
});

const appSecrets = retrieveSecrets(appName, env);

export const ebCname = createEBEnvironment({
  ebApp,
  ebVersion,
  appName,
  env,
  instanceType: "t4g.micro",
  solutionName: "Go",
  secrets: appSecrets,
});

export const hostname = createDNSRecord({
  ebCname,
  env,
  appName,
  urlPrefix: "api",
});
