export interface Asset {
    id: string;
    name: string;
    description: string;
    folderId: string;
    height: number;
    width: number;
    mimeType: string;
}

export interface Video {
    url: string;
    type: "video" | "virtual";
}