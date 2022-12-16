import axios from 'axios';
import appConfigs from '../../config/appConfigs';

const youtubeAxiosInstance = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
});

youtubeAxiosInstance.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        key: appConfigs.youtube.apiKey
    }
    return config
})

export default youtubeAxiosInstance;
