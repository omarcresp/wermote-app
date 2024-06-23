import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as eb from "@pulumi/aws/elasticbeanstalk";

import { getEBSInstanceProfile } from "./profile";
import { getEBSRole } from "./role";
import { ISecret } from "../vault-secrets/types";
import { parseSecretEBS } from "../vault-secrets";

type ValidEC2InstanceTypes = "t4g.micro" | "t4g.small";

interface EBEnvironmentOptions {
  appName: string;
  env: string;
  instanceType: ValidEC2InstanceTypes;
  secrets: pulumi.Output<ISecret[]>;
  solutionName: string;
  ebConfig?: pulumi.Input<aws.types.input.elasticbeanstalk.EnvironmentSetting>[];
  ebVersion: Promise<eb.ApplicationVersion>;
  ebApp: eb.Application;
}

export async function createEBEnvironment({
  appName,
  env,
  solutionName,
  secrets,
  ebConfig = [],
  instanceType,
  ebVersion,
  ebApp,
}: EBEnvironmentOptions) {
  const instanceProfile = getEBSInstanceProfile(appName, env);
  const serviceRole = getEBSRole(appName, env);

  const solutions = aws.elasticbeanstalk.getSolutionStackOutput({
    nameRegex: solutionName,
    mostRecent: true,
  });

  const pulumiSecrets = parseSecretEBS(secrets);

  const envName = `${env}-${appName}`;
  const ebEnvironment = new aws.elasticbeanstalk.Environment(envName, {
    name: envName,
    application: ebApp.name,
    solutionStackName: solutions.name,
    version: await ebVersion,
    settings: pulumiSecrets.apply((s) => [
      ...s,
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
      ...ebConfig,
    ]),
  });

  return ebEnvironment.cname;
}
