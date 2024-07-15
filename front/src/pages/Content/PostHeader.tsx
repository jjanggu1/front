import "./PostHeader.css";

import React from "react";
import { tooglePostMore } from "../../store/store";
import { useDispatch } from "react-redux";

interface PostsData {
  BRD_ID: number;
  BRD_WRITER: string;
  BRD_NICK: string;
  BRD_IMAGE1: string | null;
  BRD_IMAGE2: string | null;
  BRD_IMAGE3: string | null;
  BRD_IMAGE4: string | null;
  BRD_IMAGE5: string | null;
  BRD_CON: string;
  BRD_HASHTAG: string;
  BRD_COMMENT_OPEN: number;
  BRD_REPORT: number;
  BRD_CREATED_AT: string;
  USER_ID: string;
  USER_NICKNAME: string;
  USER_IMAGE: string;
  LIKED_COUNT: number;
}

interface PostHeaderProps {
  postData: PostsData;
  getPostUserIdData: (BRD_ID: number, USER_ID: string) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ postData, getPostUserIdData }) => {
    let dispatch = useDispatch();
  
    return (
    <div className="post_header">
      <div className="post_header_img">
        {postData.USER_IMAGE ? (
          <img
            src={`http://localhost:4000/profileImg/${postData.USER_IMAGE}`}
            alt="프로필 이미지"
          />
        ) : (
          <i className="fa-regular fa-circle-user fa-2x"></i>
        )}
      </div>
      <div className="post_header_userName">
        <span>{postData.USER_NICKNAME}</span>
      </div>
      <div
        className="post_header_more"
        onClick={() => {
          getPostUserIdData(postData.BRD_ID, postData.USER_ID);
          dispatch(tooglePostMore());
        }}
      >
        <i className="fa-solid fa-ellipsis"></i>
      </div>
    </div>
  );
};

export default PostHeader;
