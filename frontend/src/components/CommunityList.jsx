import React from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import CommunityItem from "./CommunityItem";

const MAX_CONTENT_LENGTH = 100;

const truncateContent = (content) => {
    if (content.length > MAX_CONTENT_LENGTH) {
      return content.substring(0, MAX_CONTENT_LENGTH) + '...';
    }
    return content;
  };

const CommunityList = ({communities, title}) => {
    return (
    <div>

      <TransitionGroup>
        {communities.map((community, index) => (
          <CSSTransition key={community.community_id} timeout={500}>
            <CommunityItem
              number={index + 1}
              community={{
                ...community,
                description: truncateContent(community.description), 
              }}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
    );
};

export default CommunityList;