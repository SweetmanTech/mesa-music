import { IPFSUploadResponse, uploadFile } from "./uploadToIpfs";

export async function uploadJson(
    json: object,
  ): Promise<IPFSUploadResponse> {
    const jsonString = JSON.stringify(json);
    const file = new File([jsonString], "upload.json", { type: "application/json" });
    return await uploadFile(file);
  }
  