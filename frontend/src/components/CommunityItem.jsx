import React from 'react';
import { Redirect, useNavigate } from 'react-router-dom';
import MyButton from './UI/button/MyButton';
import classes from '../styles/CommunityItem.module.css';

const CommunityItem = (props) => {
  const router = useNavigate();

  return (
    <div className={classes.communityItem}>
      <div>
        <strong onClick={() => router(`/community/`)} className={classes.title}>
          {props.community.title}
        </strong>
        <div className={classes.description}>
          {props.community.description}
        </div>
        <div className={classes.tag}>
          
        </div>
      </div>
      <div className={classes.btnContainer}>
          <MyButton>Вступить</MyButton>
      </div>
    </div>
  );
};

export default CommunityItem;
