import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import { Application } from "@pulumi/aws/elasticbeanstalk";

interface DNSRecordOptions {
  appName: string;
  env: string;
  urlPrefix?: string;
  ebCname: Promise<pulumi.Output<string>>;
}

export async function createDNSRecord({
  ebCname,
  appName,
  env,
  urlPrefix,
}: DNSRecordOptions) {
  const cname = await ebCname;

  const route = ["wermote.xyz"];
  const rawPreffix: string[] = [];

  if (env !== "prod") rawPreffix.unshift(env);
  if (urlPrefix) rawPreffix.unshift(urlPrefix);

  const preffix = rawPreffix.join("-");

  if (preffix) route.unshift(preffix);

  const dnsRoute = new cloudflare.Record(`${appName}-${env}`, {
    zoneId: "a99ed8732e79c9a6a09294ce770a888d",
    name: route.join("."),
    value: cname,
    type: "CNAME",
    proxied: true,
    ttl: 1,
  });

  return dnsRoute.hostname;
}
