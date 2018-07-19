export interface GridFSFile {
    _id: string,
    length: number,
    chunkSize: number,
    uploadDate: string,
    filename: string,
    contentType: string
}
