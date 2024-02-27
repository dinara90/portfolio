import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { IUser } from '../models/IUser';
import { IPost } from '../models/IPOST';

export default class UserService{
    static fetchPosts(): Promise<AxiosResponse<IPost[]>>{
        return $api.get<IPost[]>('/posts')
    }
}
