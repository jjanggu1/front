import './Content.css';

import PostMore from '../../components/PostMore/PostMore.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';

// 리덕스툴킷 수정함수 임포트
import { tooglePostMore } from "../../store/store";

function Content() {
    const BASE_URL = "http://localhost:4000";

    let mainPostMoreVisible = useSelector(state => state.mainPostMoreVisible)
    let dispatch = useDispatch();

    // 게시글 목록 데이터 상태
    const [postsData, setPostsData] = useState();

    useEffect(() => {


        const fetchDataAndImages = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/main`); //게시글 목록 요청
                const data = res.data;

                // 프로필 이미지를 받아오는 함수
                const getProfileImage = async (userId) => {
                    try {
                        const res = await axios.post(`${BASE_URL}/api/profileImg/getProfileImage`, { userId }, { responseType: 'arraybuffer' });
                        const base64Image = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                        const imageUrl = `data:image/png;base64,${base64Image}`;
                        return imageUrl;
                    } catch (error) {
                        console.error('이미지 불러오기 오류: ', error);
                        return null;
                    }
                };

                // 프로필 이미지를 받아오는 Promise 배열
                const imagePromises = data.map(async (item) => {
                    if (item.USER_ID) {
                        const imageUrl = await getProfileImage(item.USER_ID);
                        return { ...item, USER_IMAGE: imageUrl };
                    }
                    return item;
                });

                // Promise 배열을 해결하고 state 업데이트
                const updatedPostsData = await Promise.all(imagePromises);
                setPostsData(updatedPostsData);
            } catch (error) {
                console.error('에러발생 : ', error);
            }
        };

        fetchDataAndImages();
    }, []);

    // 댓글 목록 데이터 상태
    const [commentsData, setCommentsData] = useState({});

    useEffect(() => {
        // 댓글 데이터를 가져오는 함수
        const fetchCommentData = async (brdId) => {
            try {
                const brdIdToObject = {
                    brdId: brdId
                };
                const res = await axios.post(`${BASE_URL}/api/main/comments`, brdIdToObject);
                const data = res.data;

                setCommentsData(prevCommentsData => ({
                    ...prevCommentsData,
                    [brdId]: data
                }));

                console.log("댓글 데이터 : ", data);
            } catch (error) {
                console.error("댓글 데이터 가져오기 실패", error);
            }
        };

        // 포스트 데이터가 변경될 때마다 댓글 데이터를 가져옴
        if (postsData) {
            const brdIds = postsData.map(item => item.BRD_ID);
            brdIds.forEach(brdId => fetchCommentData(brdId));
        }
    }, [postsData]);

    console.log("댓글 객체 : ", commentsData);

    //이미지 경로 동적생성
    const generateImagePaths = (brdId, ...imageNames) => {
        return imageNames.map(imageName => `http://localhost:4000/postImg/${brdId}/${imageName}`);
    }


    // 게시글 얼마 전에 작성됐는지 구하는 로직
    const getTimeAgo = (post) => {
        const today = new Date();
        const createdDay = new Date(post.BRD_CREATED_AT);
        let milliseconds = 0;
        if (createdDay) {
            milliseconds = today - createdDay;
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
    }

    return (
        <div className="content">
            <div className="posts">
                {postsData && postsData.map((item) => (
                    item.BRD_REPORT === 1 ? (null) :
                        (
                            <div className="post"
                                key={item.BRD_ID} >
                                <div className="post_header">
                                    <div className="post_header_img">
                                        {item.USER_IMAGE ? (
                                            <img src={item.USER_IMAGE} alt="프로필 이미지" />
                                        ) : (
                                            <i className="fa-regular fa-circle-user fa-2x"></i>
                                        )}
                                    </div>
                                    <div className="post_header_userName">
                                        <span>{item.USER_NICKNAME}</span>
                                    </div>
                                    <div className="post_header_more"
                                        onClick={() => { dispatch(tooglePostMore()) }}>
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="post_content">
                                    <div className="post_content_img">
                                        <ImageSlider images={generateImagePaths(item.BRD_ID, item.BRD_IMAGE1, item.BRD_IMAGE2, item.BRD_IMAGE3, item.BRD_IMAGE4, item.BRD_IMAGE5)} />
                                    </div>
                                    <div className="post_content_info">
                                        <div className="post_content_info_btns">
                                            <i className="fa-regular fa-heart"></i>
                                            <i className="fa-regular fa-comment"></i>
                                            <i className="fa-regular fa-bookmark"></i>
                                        </div>
                                        <div className="post_content_info_firstComment">
                                            {item.LIKED_COUNT === 0 ? (
                                                <span>가장 먼저 좋아요를 눌러주세요</span>
                                            ) : (
                                                <span><strong>좋아요 {item.LIKED_COUNT}개</strong></span>
                                            )}
                                        </div>
                                        {/* 좋아요 하나도 없으면 : '가장 먼저 좋아요를 눌러주세요'
                                좋아요 하나라도 있으면 : '좋아요000개' */}
                                        <div className="post_content_info_detail">
                                            <span><strong>{item.USER_NICKNAME}</strong></span>
                                            <span>{item.BRD_CON}</span>
                                        </div>
                                        <div className="post_content_info_commentList">
                                            {commentsData[item.BRD_ID] && commentsData[item.BRD_ID].map((comment) => (
                                                comment.COM_REPORT === 0 && (
                                                    <div key={comment.COM_ID}>
                                                        <span><strong>{comment.USER_NICKNAME}</strong></span>
                                                        <span>{comment.COM_COMMENT}</span>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                        <div className="post_content_info_time">
                                            <span>{getTimeAgo(item)}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="post_comment">
                                    <i className="fa-regular fa-circle-user fa-2x"></i>
                                    <div className="post_comment_detail">
                                        <input type="text" placeholder="댓글 달기..." />
                                    </div>
                                    <button>게시</button>
                                </div>
                            </div>
                        )

                ))}

            </div>
            {mainPostMoreVisible && <PostMore />}
        </div >
    )

}

export default Content;