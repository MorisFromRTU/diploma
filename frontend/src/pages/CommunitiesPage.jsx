import React, {useEffect, useState} from 'react';
import Navbar from "../components/UI/navbar/Navbar";
import classes from '../styles/CommunitiesPage.module.css'
import CommunityFilter from "../components/CommunityFilter";
import CommunityList from "../components/CommunityList";
import {useQuestion} from "../components/hooks/useQuestion";


const CommunitiesPage = () => {
   
    const [isHovered, setIsHovered] = useState(false);
    let communities = [
        {
          community_id: 1,
          title: 'Тинькофф',
          description: 'Банк №1 в России',
          tag: 'css'
        },
        {
          community_id: 2,
          title: 'Авито',
          description: 'Мы продаем вещи!',
          tag: 'html'
        },
        {
          community_id: 3,
          title: 'VK',
          description: 'Делаем новый дизайн',
          tag: 'python'
        }
      ];

    const [filter, setFilter] = useState({sort:'', query:''})
    const sortedAndSearchedPosts = useQuestion(communities, filter.sort, filter.query);
    return (
        <div>
            <Navbar setIsHovered={setIsHovered}/>
            <div className={classes.mainBlock}>
                <div className={classes.leftBlock}></div>
                <div className={classes.searchBlock}>
                    <CommunityFilter
                        filter={filter}
                        setFilter={setFilter}
                    />
                    <h1 style={{ textAlign: 'center', marginBottom: 10 }}>Все сообщества</h1>
                    <div className={classes.listBlock}>
                        <CommunityList
                            communities={sortedAndSearchedPosts}
                        />
                    </div>
                    
                </div>
                <div className={classes.rightBlock}></div>
            </div>

        </div>
    );
};

export default CommunitiesPage;