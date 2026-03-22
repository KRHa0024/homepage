import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.BLOB_CONNECTION_STRING;
const containerName = process.env.BLOB_CONTAINER_NAME || "media";
const originalPrefix = "twitter_images/";
const thumbPrefix = "twitter_images_thumb/";

export async function getImage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const file = request.query.get('file');
    const type = request.query.get('type') || 'original';

    if (!file) {
        return { status: 400, body: "File name is required" };
    }

    if (!connectionString) {
        context.error("BLOB_CONNECTION_STRING is not set");
        return { status: 500, body: "Server Configuration Error" };
    }

    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        
        // プレフィックスを付与してフルパスを作成
        const prefix = type === 'thumb' ? thumbPrefix : originalPrefix;
        const blobPath = `${prefix}${file}`;
        const blobClient = containerClient.getBlobClient(blobPath);

        if (!await blobClient.exists()) {
            context.warn(`File not found: ${blobPath}`);
            return { status: 404, body: "File not found" };
        }

        const downloadBlockBlobResponse = await blobClient.download();
        
        if (!downloadBlockBlobResponse.readableStreamBody) {
             return { status: 500, body: "Error downloading blob" };
        }

        const chunks = [];
        for await (const chunk of downloadBlockBlobResponse.readableStreamBody) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        return {
            status: 200,
            headers: {
                "Content-Type": "image/jpeg",
                "Cache-Control": "public, max-age=86400"
            },
            body: buffer
        };
    } catch (error) {
        context.error(`Error fetching image ${file}:`, error);
        return { status: 500, body: "Internal Server Error" };
    }
}

app.http('getImage', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getImage
});
