import "./PostContent.css";

import React from "react";

import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { toogleCommentMore, tooglePostModal } from "../../store/store";
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
interface UserLikedSaved {
  LIKED_NUM: number;
  LIKED_ID: string;
  LIKED_TIME: string;
  SAVED_NUM: number;
  SAVED_ID: string;
  SAVED_TIME: string;
}
interface CommentData {
  COM_ID: number;
  COM_NUM: number;
  COM_WRITER: string;
  COM_IMAGE: string;
  COM_CREATED_AT: string;
  COM_COMMENT: string;
  COM_REPORT: number;
  USER_NICKNAME: string;
  USER_IMAGE: string;
}
// BRD_ID를 키로 사용하여 댓글을 관리하는 데이터 구조의 타입 정의
interface CommentsData {
    [BRD_ID: number]: CommentData[];
}

interface PostContentProps {
  postData: PostsData;
  userLikedSaved: UserLikedSaved[];
  commentsData: CommentsData;
  handleToggleLike: (brdId: number) => void;
  setPostNum: (value: number | null) => void;
  handleToggleSave: (brdId: number) => void;
  getCommentUserIdData: (comId: number, userId: string) => void;
}

const PostContent: React.FC<PostContentProps> = ({
  postData,
  userLikedSaved,
  commentsData,
  handleToggleLike,
  setPostNum,
  handleToggleSave,
  getCommentUserIdData
}) => {
    let dispatch = useDispatch();

  //이미지 경로 동적생성
  const generateImagePaths = (
    brdId: number,
    ...imageNames: (string | null)[]
  ) => {
    return imageNames
      .filter((img) => img !== null)
      .map(
        (imageName) => `http://localhost:4000/postImg/${brdId}/${imageName}`
      );
  };

  // 게시글 얼마 전에 작성됐는지 구하는 로직
  const getTimeAgo = (post: PostsData) => {
    const today = new Date();
    const createdDay = new Date(post.BRD_CREATED_AT);
    let milliseconds = 0;
    if (createdDay) {
      milliseconds = today.getTime() - createdDay.getTime();
    } else {
      console.log("postsData가 정의되지 않았거나 비어 있습니다.");
    }

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years}년 전`;
    } else if (months > 0) {
      return `${months}달 전`;
    } else if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return "방금 전";
    }
  };

  return (
    <div className="post_content">
      <div className="post_content_img">
        <ImageSlider
          images={generateImagePaths(
            postData.BRD_ID,
            postData.BRD_IMAGE1,
            postData.BRD_IMAGE2,
            postData.BRD_IMAGE3,
            postData.BRD_IMAGE4,
            postData.BRD_IMAGE5
          )}
        />
      </div>
      <div className="post_content_info">
        <div className="post_content_info_btns">
          {userLikedSaved &&
          userLikedSaved.length > 0 &&
          userLikedSaved.some(
            (element) => element.LIKED_NUM === postData.BRD_ID
          ) ? (
            <i
              className="fa-solid fa-heart heart-style"
              onClick={() => handleToggleLike(postData.BRD_ID)}
            ></i>
          ) : (
            <i
              className="fa-regular fa-heart"
              onClick={() => handleToggleLike(postData.BRD_ID)}
            ></i>
          )}
          {postData.BRD_COMMENT_OPEN === 1 ? (
            <i
              className="fa-regular fa-comment"
              onClick={() => {
                dispatch(tooglePostModal());
                setPostNum(postData.BRD_ID);
              }}
            ></i>
          ) : null}
          {userLikedSaved &&
          userLikedSaved.length > 0 &&
          userLikedSaved.some(
            (element) => element.SAVED_NUM === postData.BRD_ID
          ) ? (
            <i
              className="fa-solid fa-bookmark"
              onClick={() => handleToggleSave(postData.BRD_ID)}
            ></i>
          ) : (
            <i
              className="fa-regular fa-bookmark"
              onClick={() => handleToggleSave(postData.BRD_ID)}
            ></i>
          )}
        </div>
        <div className="post_content_info_firstComment">
          {postData.LIKED_COUNT === 0 ? (
            <span>가장 먼저 좋아요를 눌러주세요</span>
          ) : (
            <span>
              <strong>좋아요 {postData.LIKED_COUNT}개</strong>
            </span>
          )}
        </div>
        {/* 좋아요 하나도 없으면 : '가장 먼저 좋아요를 눌러주세요'
                                좋아요 하나라도 있으면 : '좋아요000개' */}
        <div className="post_content_info_detail">
          <span>
            <strong>{postData.USER_NICKNAME}</strong>
          </span>
          <span>{postData.BRD_CON}</span>
        </div>
        <div className="post_content_info_commentList">
          {commentsData[postData.BRD_ID] &&
            commentsData[postData.BRD_ID].map(
              (comment: CommentData) =>
                comment.COM_REPORT === 0 && (
                  <div
                    className="post_content_info_comment"
                    key={comment.COM_ID}
                  >
                    <span>
                      <strong>{comment.USER_NICKNAME}</strong>
                    </span>
                    <span>{comment.COM_COMMENT}</span>
                    <span
                      onClick={() => {
                        getCommentUserIdData(
                          comment.COM_ID,
                          comment.COM_WRITER
                        );
                        dispatch(toogleCommentMore());
                      }}
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </span>
                  </div>
                )
            )}
        </div>
        <div className="post_content_info_time">
          <span>{getTimeAgo(postData)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
