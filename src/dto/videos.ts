export interface IVideosDto {
    kind: string;
    etag: string;
    items: IVideoDto[];
    nextPageToken: string;
    pageInfo: PageInfo;
}

export interface IVideoDto {
    kind: string;
    etag: string;
    id: string;
    snippet: IVideoSnippet;
    contentDetails: IContentDetails;
    statistics: IStatistics;
}

export interface IContentDetails {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: IContentRating;
    projection: string;
}

export interface IContentRating {
}
export interface IVideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IVideoThumbnails;
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: LiveBroadcastContent;
    localized: Localized;
    defaultLanguage?: DefaultLanguage;
    defaultAudioLanguage?: DefaultLanguage;
}


export enum DefaultLanguage {
    En = "en",
    EnGB = "en-GB",
    EnUS = "en-US",
}

export enum LiveBroadcastContent {
    None = "none",
}

export interface Localized {
    title: string;
    description: string;
}

export interface IVideoThumbnails {
    default: IThumbnailProperties;
    medium: IThumbnailProperties;
    high: IThumbnailProperties;
    standard: IThumbnailProperties;
    maxres: IThumbnailProperties;
}

export interface IThumbnailProperties {
    url: string;
    width: number;
    height: number;
}

export interface IStatistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}
