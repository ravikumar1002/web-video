import youtubeAxiosInstance from './axiosInstance/youtubeInstance';
import { AxiosRequestConfig } from 'axios';


export const GetYoutubeDataAsJSON = async<TResult = unknown>(
    url: string,
    config: AxiosRequestConfig = {}
): Promise<TResult> => {
    const response = await youtubeAxiosInstance.get<TResult>(url, {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers,
        },
    });
    return response.data;
}
