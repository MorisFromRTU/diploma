import React, { useState } from 'react';
import { Redirect, useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/button/MyButton'
import classes from '../styles/CommunityPage.module.css';
import Navbar from '../components/UI/navbar/Navbar';
import tink from '../img/tink.png'
const PostForm = ({ onAddPost, textareaClass }) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() !== '') {
      onAddPost(postText);
      setPostText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.postForm}>
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Напишите пост..."
        rows="4"
        className={classes.textarea}
      ></textarea>
      
    </form>
  );
};

const CommunityPage = (props) => {
  const router = useNavigate();
  const [posts, setPosts] = useState([
    { id: '1', text: 'Первый пост', author: 'Автор 1' },
    { id: '2', text: 'Второй пост', author: 'Автор 2' },
    { id: '3', text: 'Третий пост', author: 'Автор 3' },
  ]);

  const handleAddPost = (postText) => {
    const newPost = {
      id: Math.random().toString(),
      text: postText,
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={classes.communityPage}>
      <Navbar setIsHovered={setIsHovered}/>
      <div className={classes.communityPageContent}>
      <div>
        <h1 className={classes.header}>Тинькофф</h1>
        <img src={tink} alt="Community Image" className={classes.communityImage} />
      </div>
        <div className={classes.description}>
          <p>Лучший банк в России</p>
        </div>
        <div className={classes.btnContainer1 }>
          <MyButton>Вступить в сообщество</MyButton>
        </div>
        <div className={classes.members}>
          <h2>Участники</h2>
          {/* Список участников */}
        </div>
        <div className={classes.wall}>
          <PostForm onAddPost={handleAddPost} textareaClass={classes.textarea}/>
          <div className={classes.btnContainer}>
            <MyButton type="submit">Добавить пост</MyButton>
          </div>
          {posts.map((post) => (
            <div key={post.id} className={classes.postContainer}>
              <div className={classes.post}>{post.text}</div>
              <div className={classes.author}>{post.author}</div> {/* Добавлено */}
            </div>
          ))}
        </div>
        
        
      </div>
      </div>
      
    
  );
};

export default CommunityPage;
