export interface ISecretResponse {
  secrets: IVaultSecret[];
}

export interface ISecret {
  name: string;
  value: string;
}

export interface IVaultSecret {
  name: string;
  version: ISecretVersion;
  created_at: string;
  latest_version: string;
  created_by: ICreatedBy;
  sync_status: ISecretSync;
  created_by_id: string;
}

export interface ISecretVersion {
  version: string;
  type: string;
  created_at: string;
  value: string;
  created_by: ICreatedBy;
  created_by_id: string;
}

export interface ICreatedBy {
  name: string;
  type: string;
  email: string;
}

export type ISecretSync = Record<string, ISyncStatus>;

export interface ISyncStatus {
  status: string;
  updated_at: string;
  last_error_code: string;
}
