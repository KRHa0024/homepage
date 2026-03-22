import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.BLOB_CONNECTION_STRING;
const containerName = process.env.BLOB_CONTAINER_NAME || "media";
const originalPrefix = "twitter_images/";

export async function getImageList(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    if (!connectionString) {
        context.error("BLOB_CONNECTION_STRING is not set");
        return { status: 500, body: "Server Configuration Error" };
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

        return {
            status: 200,
            jsonBody: {
                total: count,
                images: files
            }
        };
    } catch (error) {
        context.error(`Error listing images:`, error);
        return { status: 500, body: "Internal Server Error" };
    }
}

app.http('getImageList', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getImageList
});
