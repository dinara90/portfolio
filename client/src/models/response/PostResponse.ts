export interface PostResponse{
    title:{
        en: string;
        kz: string;
    }
    content:{
        en: string;
        kz: string;
    }
    images: [File];
}