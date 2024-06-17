import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as s3 from "@pulumi/aws/s3";
import * as eb from "@pulumi/aws/elasticbeanstalk";
import * as zl from "zip-lib";
import * as fs from "fs";
import * as path from "path";

interface EBVersionOptions {
  appName: string;
  env: string;
  ebApp: eb.Application;
  filesList: string[];
  bucket: s3.Bucket;
}

export async function createEBVersion({
  appName,
  env,
  bucket,
  filesList,
  ebApp,
}: EBVersionOptions) {
  const zip = new zl.Zip();

  filesList.forEach((file) => {
    if (fs.lstatSync(file).isDirectory()) {
      const folderName = file.split('/').pop()
      zip.addFolder(file, folderName);
    } else {
      zip.addFile(file);
    }
  });

  const zipFile = path.resolve(__dirname, `../dist/${appName}_${env}.zip`);

  await zip.archive(zipFile);

  const versionObject = new aws.s3.BucketObject(`object-${env}-${appName}`, {
    bucket,
    key: "application.zip",
    source: new pulumi.asset.FileAsset(zipFile),
  });

  const ebVersion = new aws.elasticbeanstalk.ApplicationVersion(
    `version-${env}-${appName}`,
    {
      name: process.env.VERSION,
      application: ebApp,
      bucket,
      key: versionObject.key,
    },
  );

  return ebVersion;
}
