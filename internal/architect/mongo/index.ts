import * as pulumi from "@pulumi/pulumi";
import * as mongodbatlas from "@pulumi/mongodbatlas";
import { genPass } from "../password-gen";

export function createServerlessDB(clusterName: string) {
  if (!process.env['MONGODB_PROJECT_ID'])
    throw new Error("No project id found in env");

  const mongoPass = genPass(16);
  const mongoUser = new mongodbatlas.DatabaseUser(clusterName, {
    projectId: process.env['MONGODB_PROJECT_ID'],
    username: clusterName,
    password: pulumi.secret(mongoPass),
    authDatabaseName: "admin",
    roles: [
      {
        roleName: "atlasAdmin",
        databaseName: "admin",
      },
    ],
  });

  console.log(mongoUser.password);

  const mongodb = new mongodbatlas.ServerlessInstance(clusterName, {
    projectId: process.env.MONGODB_PROJECT_ID,
    name: clusterName,
    providerSettingsBackingProviderName: "AWS",
    providerSettingsProviderName: "SERVERLESS",
    providerSettingsRegionName: "US_EAST_1",
  });

  return mongodb.connectionStringsStandardSrv.apply((mongoSrv) =>
    mongoSrv.replace(
      "mongodb+srv://",
      `mongodb+srv://${clusterName}:${mongoPass}@`,
    ),
  );
}
