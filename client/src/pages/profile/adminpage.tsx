import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import AccountMenu from '../../components/menu/menu'
import axios from 'axios';

const AdminPage: FC = () => {
  interface Post {
    _id: string;
    title: { en: string; kz: string; };
    content: { en: string; kz: string; };
    images?: string[]; // Assuming images are optional and stored as an array of strings (URLs)
    createdAt: string;
}


const [posts, setPosts] = useState<Post[]>([]);    
const [title, setTitle] = useState({ en: '', kz: '' });
const [content, setContent] = useState({ en: '', kz: '' });
const [language, setLanguage] = useState('en'); // Current language selection
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


useEffect(() => {
    fetchPosts();
}, []);

const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/posts');
    setPosts(data);
};

const createPost = async () => {
    const formData = new FormData();
    formData.append('titleEn', title.en);
    formData.append('contentEn', content.en);
    formData.append('titleKz', title.kz);
    formData.append('contentKz', content.kz);
    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
    }

    try {
        await axios.post('http://localhost:5000/api/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        fetchPosts();
        setTitle({ en: '', kz: '' });
        setContent({ en: '', kz: '' });
        setSelectedFiles([]);
    } catch (error) {
        console.error("Error creating post:", error);
    }
};

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        setSelectedFiles(Array.from(event.target.files));
    }
};

const switchLanguage = () => {
    setLanguage(language === 'en' ? 'another' : 'en');
};

return (
    <div>
      <AccountMenu/>
        <h1>Blog Admin Dashboard</h1>
        <button onClick={switchLanguage}>Switch Language</button>
        <input
            value={language === 'en' ? title.en : title.kz}
            onChange={e => setTitle({ ...title, [language]: e.target.value })}
            placeholder={`Title (${language === 'en' ? 'English' : 'Other Language'})`}
        />
        <textarea
            value={language === 'en' ? content.en : content.kz}
            onChange={e => setContent({ ...content, [language]: e.target.value })}
            placeholder={`Content (${language === 'en' ? 'English' : 'Other Language'})`}
        />
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={createPost}>Create Post</button>
        <div>
            {posts.map(post => (
                <div key={post._id}>
                    <h2>{post.title.en} / {post.title.kz}</h2>
                    <p>{post.content.en} / {post.content.kz}</p>
                    {post.images && post.images.map((image, index) => (
                        <img key={index} src={`http://localhost:5000/uploads/${image}`} alt="Post" style={{ width: "100px", height: "100px" }}/>
                    ))}
                    {/* Add buttons and functionality for update and delete */}
                </div>
            ))}
        </div>
    </div>
);
export default observer(AdminPage);