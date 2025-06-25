import { Client, Databases, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);

export const saveArtist = async (data) => {
    // Upload image if exists
    let imageId = '';
    if (data.profileImage) {
        const file = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
            ID.unique(),
            data.profileImage
        );
        imageId = file.$id;
    }

    // Save to database
    return databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
            name: data.name,
            bio: data.bio,
            feeRange: data.feeRange,
            location: data.location,
            category: data.category,
            languages: data.languages,
            ...(imageId && { profileImage: imageId }),
            status: 'pending',
        }
    );
};
