import type { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.BLOB_CONNECTION_STRING;
const containerName = process.env.BLOB_CONTAINER_NAME || "media";
const originalPrefix = "twitter_images/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!connectionString) {
    console.error("BLOB_CONNECTION_STRING is not set");
    return res.status(500).send("Server Configuration Error");
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const files: string[] = [];
    let count = 0;

    // 指定したプレフィックス (フォルダ) 内のBlobをリスト
    for await (const blob of containerClient.listBlobsFlat({ prefix: originalPrefix })) {
      const name = blob.name.toLowerCase();
      if (name.endsWith('.jpeg') || name.endsWith('.jpg')) {
        // クライアントにはプレフィックスを除いたファイル名のみを返す
        const fileNameOnly = blob.name.substring(originalPrefix.length);
        files.push(fileNameOnly);
        count++;
      }
    }

    files.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
      return numB - numA;
    });

    res.status(200).json({
      total: count,
      images: files
    });

  } catch (error) {
    console.error(`Error listing images:`, error);
    return res.status(500).send("Internal Server Error");
  }
}
