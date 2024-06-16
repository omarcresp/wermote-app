import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import {
  createEBStack,
  createDNSRecord,
} from "@wermote/architect/elastick-beanstalk";
import { retrieveSecrets } from "@wermote/architect/vault-secrets";

const config = new pulumi.Config();

const ENV = {
  appName: config.require("appName"),
  env: config.require("env"),
};

export const appSecrets = retrieveSecrets(ENV.appName, ENV.env)

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket(`${ENV.env}-${ENV.appName}-service`);

export const ebStack = createEBStack({
  appName: ENV.appName,
  env: ENV.env,
  type: 'service',
  solutionName: "Go",
  secrets: appSecrets,
  ebConfig: [
    {
      namespace: "aws:autoscaling:launchconfiguration",
      name: "InstanceType",
      value: "t4g.micro",
    },
  ],
});

export const hostname = createDNSRecord({
  ebStack,
  env: ENV.env,
  appName: ENV.appName,
  urlPrefix: "api",
});
