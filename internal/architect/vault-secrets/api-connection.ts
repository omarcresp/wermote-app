import { ofetch } from 'ofetch';
import { ISecretResponse } from './types';
import { parseSecretsResponse } from './map-secrets';

async function generateToken(): Promise<string> {
  const encodedParams = new URLSearchParams();

  encodedParams.set('client_id', process.env.HCP_CLIENT_ID ?? '');
  encodedParams.set('client_secret', process.env.HCP_CLIENT_SECRET ?? '');
  encodedParams.set('grant_type', 'client_credentials');
  encodedParams.set('audience', 'https://api.hashicorp.cloud');

  const { access_token } = await ofetch(
    'https://auth.idp.hashicorp.com/oauth2/token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodedParams,
    },
  );

  return access_token;
}

const VAULT_PROJECTS: Record<string, string> = {
  prod: '2d109f11-6f8e-40bf-a201-e6eebc56d083',
  dev: 'e88a564f-3833-4709-b0b5-3c4d2344ea84',
};

export async function retrieveSecrets(appName: string, env: string) {
  const token = await generateToken();

  const hashiApi = 'https://api.cloud.hashicorp.com/secrets/2023-06-13';
  const orgId = 'e97c9086-24ef-4328-bb76-f6ba027cd240';
  const projectId = VAULT_PROJECTS[env];

  const baseURL = `${hashiApi}/organizations/${orgId}/projects/${projectId}/`;

  const secretResponse = await ofetch<ISecretResponse>(`apps/${appName}/open`, {
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseSecretsResponse(secretResponse);
}
