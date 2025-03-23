export interface VideoAsset {
    id: string;
    name: string;
    description: string;
    folderId: string;
    mimeType: string;
    videoUrl: string;
    thumbnailUrl?: string;
}
