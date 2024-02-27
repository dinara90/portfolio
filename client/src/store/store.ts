import { IUser } from "../models/IUser";
import{makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import { API_URL } from "../http";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

export default class Store{
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor(){
        makeAutoObservable(this);
    }
    
    setAuth(bool: boolean){
        this.isAuth = bool
    }

    setUser(user: IUser){
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async loginEmail(email: string, password: string){
        try{
            const response = await AuthService.loginEmail(email,password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(e){
            console.log(e);
            
        }
    }
    async loginUsername(username: string, password: string){
        try{
            const response = await AuthService.loginUsername(username,password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(e){
            console.log(e);
            
        }
    }

    async registration(username: string, email: string, password: string){
        try{
            const response = await AuthService.registration(username,email,password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(e){
            console.log(e);   
        }
    }

    async logout(){
        try{
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        }catch(e){
            console.log(e);
            
        }
    }

    async checkAuth(){
        this.setLoading(true);
        try{
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            this.setLoading(false)
        }
    }
}