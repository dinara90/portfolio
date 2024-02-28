import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { IUser } from '../../models/IUser';
import { IPost } from '../../models/IPOST';
import PostService from "../../services/PostService";
import AccountMenu from '../../components/menu/menu';

const Profile: FC = () => {
  const { store } = useContext(Context);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await PostService.fetchPosts();
        setPosts(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchPosts();
  }, []); // Fetch posts only once when component mounts

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? posts[currentImageIndex].images.split(",").length - 2 : prevIndex - 1;
      return newIndex < 0 ? 0 : newIndex;
    });
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === posts[currentImageIndex].images.split(",").length - 1 ? 0 : prevIndex + 1;
      return newIndex >= posts[currentImageIndex].images.split(",").length ? 0 : newIndex;
    });
  };
  
  return (
    <div style={{ margin: '1vh 10vw' }} className='profilePosts'>
      <AccountMenu />
      <h1>Welcome {store.user.username}</h1>
      {posts.map((post, index) => (
        <div>
          <h3>{post.title?.en}</h3>
          <p>{post.content?.en}</p>
          <div className="image-container">
            <img src={`http://localhost:5000/${post.images.split(",")[currentImageIndex]}`} alt={`Image ${currentImageIndex}`} />
            <button onClick={handlePrevImage}>Previous</button>
            <button onClick={handleNextImage}>Next</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default observer(Profile);
