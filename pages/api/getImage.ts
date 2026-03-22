import type { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.BLOB_CONNECTION_STRING;
const containerName = process.env.BLOB_CONTAINER_NAME || "media";
const originalPrefix = "twitter_images/";
const thumbPrefix = "twitter_images_thumb/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { file, type = 'original' } = req.query;

  if (!file || typeof file !== 'string') {
    return res.status(400).send("File name is required");
  }

  if (!connectionString) {
    console.error("BLOB_CONNECTION_STRING is not set");
    return res.status(500).send("Server Configuration Error");
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // プレフィックスを付与してフルパスを作成
    const prefix = type === 'thumb' ? thumbPrefix : originalPrefix;
    const blobPath = `${prefix}${file}`;
    const blobClient = containerClient.getBlobClient(blobPath);

    if (!await blobClient.exists()) {
      console.warn(`File not found: ${blobPath}`);
      return res.status(404).send("File not found");
    }

    const downloadBlockBlobResponse = await blobClient.download();

    if (!downloadBlockBlobResponse.readableStreamBody) {
      return res.status(500).send("Error downloading blob");
    }

    const chunks: Buffer[] = [];
    for await (const chunk of downloadBlockBlobResponse.readableStreamBody) {
      chunks.push(chunk as Buffer);
    }
    const buffer = Buffer.concat(chunks);

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.status(200).send(buffer);

  } catch (error) {
    console.error(`Error fetching image ${file}:`, error);
    return res.status(500).send("Internal Server Error");
  }
}
