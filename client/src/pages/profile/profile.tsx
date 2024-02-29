import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../models/IUser';
import { IPost } from '../../models/IPOST';
import PostService from '../../services/PostService';
import AccountMenu from '../../components/menu/menu';

const Profile: FC = () => {
  const { store } = useContext(Context);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'kz'>('en'); // Default to English

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await PostService.fetchPosts();
        // Initialize current image indices for each post to 0
        const initialIndices = response.data.map(() => 0);
        setPosts(response.data);
        setCurrentImageIndices(initialIndices);
      } catch (e) {
        console.log(e);
      }
    }
    fetchPosts();
  }, []); // Fetch posts only once when component mounts

  const handlePrevImage = (postIndex: number) => {
    setCurrentImageIndices((prevIndices) => {
      const currentIndex = prevIndices[postIndex];
      const newIndex = currentIndex === 0 ? posts[postIndex].images.split(',').length - 2 : currentIndex - 1;
      const updatedIndices = [...prevIndices];
      updatedIndices[postIndex] = newIndex < 0 ? 0 : newIndex;
      return updatedIndices;
    });
  };

  const handleNextImage = (postIndex: number) => {
    setCurrentImageIndices((prevIndices) => {
      const currentIndex = prevIndices[postIndex];
      const newIndex =
        currentIndex === posts[postIndex].images.split(',').length - 1 ? 0 : currentIndex + 1;
      const updatedIndices = [...prevIndices];
      updatedIndices[postIndex] =
        newIndex >= posts[postIndex].images.split(',').length ? 0 : newIndex;
      return updatedIndices;
    });
  };

  const handleDeletePost = async (title: object) => {
    try {
      await PostService.postDelete(title);
      // Filter out the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post.title !== title));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div style={{ margin: '1vh 10vw' }} className="profilePosts">
      <AccountMenu />
      <h1>Welcome {store.user.username}</h1>
      <div>
        <label>
          Select Language:
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'kz')}
          >
            <option value="en">English</option>
            <option value="kz">Kazakh</option>
          </select>
        </label>
      </div>

      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <div className="image-container">
              <img
                src={`http://localhost:5000/${post.images.split(',')[currentImageIndices[index]]}`}
                alt={`Image ${currentImageIndices[index]}`}
              />
              <div className="sliderButtons">
                <button onClick={() => handlePrevImage(index)}>Previous</button>
                <button onClick={() => handleNextImage(index)}>Next</button>
              </div>
            </div>
            <h3>{selectedLanguage === 'en' ? post.title.en : post.title.kz}</h3>
            <p>{selectedLanguage === 'en' ? post.content.en : post.content.kz}</p>
            <p className="postDate">{post.registrationDate}</p>
            {store.user.role == 'admin' && (
              <button className='postDeleteButton' onClick={() => handleDeletePost(post.title)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Profile);
