export interface UploadedContent {
  asset_id: string;
  public_id: string;
  format: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

export interface PreviewUploadedContent {
  id: number;
  uploaded_public_id: string;
  url: string;
  format: string;
  size: number;
  created_at: string;
  updated_at: string;
}
