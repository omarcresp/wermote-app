// import * as pulumi from "@pulumi/pulumi";
// import * as aws from "@pulumi/aws";
// import { Bucket, BucketObject } from "@pulumi/aws/s3";
// import * as eb from "@pulumi/aws/elasticbeanstalk";
//
// import { getEBSInstanceProfile } from "./profile";
// import { getEBSRole } from "./role";
// import { ISecret } from "../vault-secrets/types";
// import { parseSecretEBS } from "../vault-secrets";
//
// type ValidEC2InstanceTypes = "t4g.micro" | "t4g.small";
//
// interface EBEnvironmentOptions {
//   appName: string;
//   env: string;
//   type: "service" | "app";
//   bucket: Bucket;
//   instanceType: ValidEC2InstanceTypes;
//   secrets: Promise<ISecret[]>;
//   versionObject: Promise<BucketObject>;
//   solutionName: string;
//   ebConfig?: pulumi.Input<aws.types.input.elasticbeanstalk.EnvironmentSetting>[];
//   ebVersion: eb.ApplicationVersion;
//   ebApp: eb.Application;
// }
//
//
//
//
// export async function createEBStack({
//   ebConfig = [],
//   solutionName,
//   env,
//   appName,
//   bucket,
//   versionObject,
//   type = "service",
//   instanceType,
//   secrets,
// }: EBEnvironmentOptions) {
//   const instanceProfile = getEBSInstanceProfile(appName, env);
//   const serviceRole = getEBSRole(appName, env);
//
//   const ebName = `wermote-${env}-${appName}-${type}`;
//   const ebApp = new aws.elasticbeanstalk.Application(ebName, {
//     name: ebName,
//   });
//
//   const ebVersion = new aws.elasticbeanstalk.ApplicationVersion(
//     `version-${env}-${appName}`,
//     {
//       name: process.env.VERSION,
//       application: ebApp,
//       bucket,
//       key: (await versionObject).key,
//     },
//   );
//
//   const solutions = aws.elasticbeanstalk.getSolutionStackOutput({
//     nameRegex: solutionName,
//     mostRecent: true,
//   });
//
//   const envName = `${env}-${appName}`;
//   const ebEnvironment = new aws.elasticbeanstalk.Environment(envName, {
//     name: envName,
//     application: ebApp.name,
//     solutionStackName: solutions.name,
//     version: ebVersion,
//     settings: [
//       {
//         namespace: "aws:elasticbeanstalk:environment",
//         name: "ServiceRole",
//         value: serviceRole.name,
//       },
//       {
//         namespace: "aws:autoscaling:launchconfiguration",
//         name: "IamInstanceProfile",
//         value: instanceProfile.name,
//       },
//       {
//         namespace: "aws:elasticbeanstalk:healthreporting:system",
//         name: "SystemType",
//         value: "basic",
//       },
//       {
//         namespace: "aws:autoscaling:launchconfiguration",
//         name: "InstanceType",
//         value: instanceType,
//       },
//       ...parseSecretEBS(await secrets),
//       ...ebConfig,
//     ],
//   });
//
//   return {
//     ebApp,
//     cname: ebEnvironment.cname,
//     ebVersion: ebVersion.name,
//   };
// }

export { createDNSRecord } from "./dns";
export { createEBApp } from "./application"
export { createEBEnvironment } from "./environment"
export { createEBVersion } from "./version"
