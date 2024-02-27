import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Link } from 'react-router-dom';
import {PATH} from '../../constants/paths';
import { IUser } from '../../models/IUser';
import { IPost } from '../../models/IPOST';
import UserService from '../../services/UserService';
import AccountMenu from '../../components/menu/menu'
import PostService from "../../services/PostService"
import Carousel from 'react-bootstrap/Carousel';


const Profile: FC = () => {
  const {store} = useContext(Context);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [lang, setLang] = useState();

  async function getPosts() {
      try {
          const response = await PostService.fetchPosts();
          setPosts(response.data);
      } catch (e) {
          console.log(e);
      }
  }
  getPosts();
    return (
      <div style={{ margin: '1vh 10vw'}}>
        <AccountMenu/>
      <h1>Welcome {store.user.username}</h1>
      {posts.map(post=>
      <div>
        {post.images.map(img=>
          <Carousel>
            <Carousel.Item>
              <img src = {img}></img>
          </Carousel.Item>
        </Carousel>   
        )}
        { lang == 'en' ?
        <div>
      <h3>{post.title.en}</h3>
      <p>{post.content.en}</p>  
      </div>
      : <div>
      <h3>{post.title.kz}</h3>
      <p>{post.content.kz}</p>  
      </div>
        }
      </div>
            )}
      
    </div>     
    );
};

export default observer(Profile);