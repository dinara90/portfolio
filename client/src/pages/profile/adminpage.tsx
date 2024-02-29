import React, { FC, useContext, useRef, useState } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import AccountMenu from '../../components/menu/menu';
import './formStyle.css';
import PostService from "../../services/PostService";
import { PostResponse } from '../../models/response/PostResponse';
import $api from '../../http';

const AdminPage: FC = () => {
  const { store } = useContext(Context);
  const titleEn = useRef<HTMLInputElement>(null);
  const titleKz = useRef<HTMLInputElement>(null);
  const contentEn = useRef<HTMLInputElement>(null);
  const contentKz = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [inputErrors, setInputErrors] = useState({ titleEn: false, titleKz: false, contentEn: false, contentKz: false });

  const submit = async () => {
    const newInputErrors = {
      titleEn: !titleEn.current?.value.trim(),
      titleKz: !titleKz.current?.value.trim(),
      contentEn: !contentEn.current?.value.trim(),
      contentKz: !contentKz.current?.value.trim(),
    };
    setInputErrors(newInputErrors);

    if (!Object.values(newInputErrors).some(error => error)) {
      const formData = new FormData();
      const titleData = {
        en: titleEn.current!.value.trim(),
        kz: titleKz.current!.value.trim(),
      };
      const contentData = {
        en: contentEn.current!.value.trim(),
        kz: contentKz.current!.value.trim(),
      };
  
      formData.append('title', JSON.stringify(titleData));
      formData.append('content', JSON.stringify(contentData));
      // Append files to FormData
      if (fileInput.current?.files) {
        for (let i = 0; i < fileInput.current.files.length; i++) {
          formData.append('images', fileInput.current.files[i]);
        }
      }

      try {
        // Send formData to the backend
        console.log(formData)
        const response = await $api.post<PostResponse>('posts', formData);
        console.log(response.data); // Handle response from the server
      } catch (error) {
        console.error('Error:', error); // Handle error if request fails
      }
    } else {
      console.log('Fill in all data');
    }
  };

  return (
    <div style={{ margin: '1vh 10vw' }}>
      <AccountMenu />
      <div className='uploadForm'>
        <h3>Please fill in info in English</h3>
        <input type='text' ref={titleEn} placeholder='Title in EN' required />
        {inputErrors.titleEn && <span className="error">Please enter a title in English</span>}
        <input type='text' ref={contentEn} placeholder='Content in EN' required />
        {inputErrors.contentEn && <span className="error">Please enter content in English</span>}
        <h3>Please fill in info in Kazakh</h3>
        <input type='text' ref={titleKz} placeholder='Title in KZ' required />
        {inputErrors.titleKz && <span className="error">Please enter a title in Kazakh</span>}
        <input type='text' ref={contentKz} placeholder='Content in KZ' required />
        {inputErrors.contentKz && <span className="error">Please enter content in Kazakh</span>}
        <input type='file' ref={fileInput} multiple accept="image/png, image/jpeg" required />
        <button type='button' onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default observer(AdminPage);
