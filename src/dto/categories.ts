
export interface ICategoriesDto {
    kind: string;
    etag: string;
    items: ICategorieDto[];
}

export interface ICategorieDto {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}


export interface Snippet {
    title: string;
    assignable: boolean;
    channelId: string;
}

