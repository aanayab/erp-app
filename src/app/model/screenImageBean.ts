export interface ScreenImageBean {
    id: number | null;
    fileName: string;
    contentType: string;
    size: number | null;
    data: Uint8Array;
}