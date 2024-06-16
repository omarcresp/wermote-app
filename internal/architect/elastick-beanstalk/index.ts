import { Input } from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { getEBSInstanceProfile } from "./profile";
import { getEBSRole } from "./role";
import { ISecret } from "../vault-secrets/types";
import { parseSecretEBS } from "../vault-secrets";
import { Bucket, BucketObject } from "@pulumi/aws/s3";

type ValidEC2InstanceTypes = "t4g.micro" | "t4g.small";

interface EBStackOptions {
  appName: string;
  env: string;
  type: "service" | "app";
  bucket: Bucket;
  instanceType: ValidEC2InstanceTypes;
  secrets: Promise<ISecret[]>;
  versionObject: Promise<BucketObject>;
  solutionName: string;
  ebConfig?: Input<aws.types.input.elasticbeanstalk.EnvironmentSetting>[];
}

export async function createEBStack({
  ebConfig = [],
  solutionName,
  env,
  appName,
  bucket,
  versionObject,
  type = "service",
  instanceType,
  secrets,
}: EBStackOptions) {
  const instanceProfile = getEBSInstanceProfile(appName, env);
  const serviceRole = getEBSRole(appName, env);

  const ebName = `wermote-${env}-${appName}-${type}`;
  const ebApp = new aws.elasticbeanstalk.Application(ebName, {
    name: ebName,
  });

  const ebVersion = new aws.elasticbeanstalk.ApplicationVersion(
    `version-${env}-${appName}`,
    {
      name: "manuella-5",
      application: ebApp,
      bucket,
      key: (await versionObject).key,
    },
  );

  const solutions = aws.elasticbeanstalk.getSolutionStackOutput({
    nameRegex: solutionName,
    mostRecent: true,
  });

  const envName = `${env}-${appName}`;
  const ebEnvironment = new aws.elasticbeanstalk.Environment(envName, {
    name: envName,
    application: ebApp.name,
    solutionStackName: solutions.name,
    version: ebVersion,
    settings: [
      {
        namespace: "aws:elasticbeanstalk:environment",
        name: "ServiceRole",
        value: serviceRole.name,
      },
      {
        namespace: "aws:autoscaling:launchconfiguration",
        name: "IamInstanceProfile",
        value: instanceProfile.name,
      },
      {
        namespace: "aws:elasticbeanstalk:healthreporting:system",
        name: "SystemType",
        value: "basic",
      },
      {
        namespace: "aws:autoscaling:launchconfiguration",
        name: "InstanceType",
        value: instanceType,
      },
      ...parseSecretEBS(await secrets),
      ...ebConfig,
    ],
  });

  return {
    ebApp,
    cname: ebEnvironment.cname,
    ebVersion: ebVersion.name,
  };
}

export { createDNSRecord } from "./dns";
