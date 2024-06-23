import * as pulumi from "@pulumi/pulumi";

import { ISecretResponse, ISecret } from "./types";

export function parseSecretsResponse(rawSecrets: ISecretResponse) {
  return rawSecrets.secrets.map(({ name, version }) => ({
    name,
    value: version.value,
  }));
}

export function parseSecretEBS(secrets: pulumi.Output<ISecret[]>) {
  return secrets.apply((s) => s.map((secret) => ({
    ...secret,
    namespace: "aws:elasticbeanstalk:application:environment",
  })))
}
