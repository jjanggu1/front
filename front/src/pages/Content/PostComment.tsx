import "./PostComment.css";

import React, { ChangeEvent } from "react";

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
interface CommentInfo {
  brdId: number | null;
  userId: string | null;
  userNick: string | null;
  comment: string;
}
interface PostCommentProps {
  postData: PostsData;
  isLoggedIn: boolean;
  commentInfo: CommentInfo;
  inputCommentChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getBrdId: (brdId: number) => void;
  fetchAddComment: () => void;
}

const PostComment: React.FC<PostCommentProps> = ({
  postData,
  isLoggedIn,
  commentInfo,
  inputCommentChange,
  getBrdId,
  fetchAddComment,
}) => {
  return (
    <>
      {postData.BRD_COMMENT_OPEN === 1 ? (
        <div className="post_comment">
          {isLoggedIn ? (
            <img
              src={`http://localhost:4000/profileImg/${postData.USER_IMAGE}`}
              alt="프로필 이미지"
            />
          ) : (
            <i className="fa-regular fa-circle-user fa-2x"></i>
          )}
          <div className="post_comment_detail">
            <input
              value={commentInfo.comment}
              onChange={(event) => {
                inputCommentChange(event);
                getBrdId(postData.BRD_ID);
              }}
              type="text"
              placeholder="댓글 달기..."
            />
          </div>
          <button
            onClick={() => {
              fetchAddComment();
            }}
          >
            게시
          </button>
        </div>
      ) : (
        <div className="post_comment">
          {isLoggedIn ? (
            <img
              src={`http://localhost:4000/profileImg/${postData.USER_IMAGE}`}
              alt="프로필 이미지"
            />
          ) : (
            <i className="fa-regular fa-circle-user fa-2x"></i>
          )}
          <div className="post_comment_detail">
            <span>작성자가 댓글을 제한한 글입니다.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PostComment;
