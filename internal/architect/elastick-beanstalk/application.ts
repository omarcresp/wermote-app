import * as aws from "@pulumi/aws";

interface EBAppOptions {
  appName: string;
  env: string;
  type: "service" | "app";
}

export function createEBApp({ env, type, appName }: EBAppOptions) {
  const ebName = `wermote-${env}-${appName}-${type}`;
  const ebApp = new aws.elasticbeanstalk.Application(ebName, {
    name: ebName,
  });

  return ebApp;
}
