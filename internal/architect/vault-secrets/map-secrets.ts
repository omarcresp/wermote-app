import { ISecretResponse, ISecret } from "./types";

export function parseSecretsResponse(rawSecrets: ISecretResponse) {
  return rawSecrets.secrets.map(({ name, version }) => ({
    name,
    value: version.value,
  }));
}

export function parseSecretEBS(secrets: ISecret[]) {
  return secrets.map((secret) => ({
    ...secret,
    namespace: "aws:elasticbeanstalk:application:environment",
  }));
}
