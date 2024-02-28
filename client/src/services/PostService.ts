import $api from '../http';
import { AxiosResponse } from 'axios';
import { PostResponse } from '../models/response/PostResponse';
import { IUser } from '../models/IUser';
import { IPost } from '../models/IPOST';

export default class PostService{
    static async post(images: File[], title: object, content: object): Promise<AxiosResponse<PostResponse>> {
        console.log(images);
        return $api.post<PostResponse>('posts', {title, content, images})
    }
    static fetchPosts(): Promise<AxiosResponse<IPost[]>>{
        return $api.get<IPost[]>('/posts')
    }
}
