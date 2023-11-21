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

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("userId") !== null;
    });


    let mainPostMoreVisible = useSelector(state => state.mainPostMoreVisible)
    let dispatch = useDispatch();

    // 게시글 목록 데이터 상태
    const [postsData, setPostsData] = useState();

    // 게시글 목록 요청 함수
    const fetchPostData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/main`); //게시글 목록 요청
            const data = res.data;
            await setPostsData(data);

            return data; // 데이터 반환
        } catch (e) {
            console.error(e);
        }
    }

    // 댓글 목록 데이터 상태
    const [commentsData, setCommentsData] = useState({});

    // 댓글 데이터를 요청 함수
    const fetchCommentData = async () => {
        try {
            // 포스트 데이터를 가져와서 BRD_ID의 배열을 얻습니다.
            const postData = await fetchPostData();

            if (!postData) {
                console.error("게시글 데이터가 아직 설정되지 않았습니다.");
                return;
            }

            // 각 BRD_ID에 대해 댓글을 가져오기 위해 반복문을 사용합니다.
            for (const brdId of postData.map((element) => element.BRD_ID)) {
                const brdIdToObject = {
                    brdId: brdId
                };

                const res = await axios.post(`${BASE_URL}/api/main/comments`, brdIdToObject);
                const data = res.data;

                // commentsData 상태를 업데이트합니다.
                setCommentsData(prevCommentsData => ({
                    ...prevCommentsData,
                    [brdId]: data
                }));

                console.log(`댓글 데이터 (BRD_ID: ${brdId}):`, data);
            }
        } catch (error) {
            console.error("댓글 데이터 가져오기 실패", error);
        }
    };

    useEffect(() => {
        // 로그인 여부를 확인하고 상태를 업데이트
        setIsLoggedIn(localStorage.getItem("userId") !== null);

        fetchLikedSaved();
        fetchPostData();
        fetchCommentData();
    }, []);

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

    //댓글 작성 로직
    //회원아아디, 닉네임 가져오기 
    const userId = localStorage.getItem('userId');
    const userNick = localStorage.getItem('userNick');

    // 서버로 요청할 댓글 데이터
    const [commentInfo, setCommentInfo] = useState({
        brdId: null,
        userId: userId,
        userNick: userNick,
        comment: ''
    });

    // 댓글 input값 상태를 변경하는 함수
    const inputCommentChange = (event) => {
        setCommentInfo((prevComment) => ({
            ...prevComment,
            comment: event.target.value
        }));
    };

    const getBrdId = (brdId) => {
        const newBrdId = brdId;
        setCommentInfo((prevCommentInfo) => ({
            ...prevCommentInfo,
            brdId: newBrdId,
        }));
    }

 
    // 댓글 추가 요청 함수
    const fetchAddComment = async () => {
        try {
            if (commentInfo.comment === "") {
                alert("댓글을 입력하세요.")
            } else {
                console.log("commentInfo : ", commentInfo)
                const res = await axios.post(`${BASE_URL}/api/main/insertComment`, commentInfo);
                const data = res.data;
                console.log(data);

                // 댓글입력 초기화
                setCommentInfo((prevComment) => ({
                    ...prevComment,
                    comment: ""
                }));

                fetchCommentData();
            }
        } catch (error) {
            console.error("댓글 추가 실패", error);
        }
    }

    //회원이 좋아요, 저장한 글 데이터
    const [userLikedSaved, setUserLikedSaved] = useState();

    // 회원이 좋아요, 저장한 글 데이터 요청
    const fetchLikedSaved = async () => {
        try {
            const userIdData = {
                userId: userId
            }
            if (userId === null) {
                alert("로그인 해주세요.");
            } else {
                const res = await axios.post(`${BASE_URL}/api/main/likedSaved`, userIdData);
                const data = res.data;

                setUserLikedSaved(data);

            }
        } catch (error) {
            console.error(error);
        }
    }
    console.log("좋아요, 저장한 글 데이터 요청 : ", userLikedSaved);

    // 좋아요 토글 함수
    const handleToggleLike = (brdId) => {
        // 좋아요를 눌렀는지 확인
        const isLiked = userLikedSaved.some(element => element.LIKED_NUM === brdId);
        console.log("좋아요 여부 : ", isLiked);

        if (!isLiked) {
            fetchAddLike(brdId);
        } else {
            fetchRemoveLike(brdId);
        }
    }

    // 회원의 좋아요 추가 요청
    const fetchAddLike = async (brdId) => {
        try {
            const addLikeData = {
                userId: userId,
                brdId: brdId
            }
            if (userId === null) {
                alert("로그인 해주세요.");
            } else {
                const res = await axios.post(`${BASE_URL}/api/main/addLike`, addLikeData);
                const data = res.data.success;

                console.log("좋아요 요청 : ", data)
                fetchLikedSaved();
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 회원의 좋아요 삭제 요청
    const fetchRemoveLike = async (brdId) => {
        try {
            const removeLikeData = {
                userId: userId,
                brdId: brdId
            }
            if (userId === null) {
                alert("로그인 해주세요.");
            } else {
                const res = await axios.post(`${BASE_URL}/api/main/removeLike`, removeLikeData);
                const data = res.data.success;

                console.log("좋아요 요청 : ", data)
                fetchLikedSaved();
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 저장글 토글 함수
    const handleToggleSave = (brdId) => {
        // 글을 저장했는지 확인
        const isSaved = userLikedSaved.some(element => element.SAVED_NUM === brdId);
        console.log("글 저장 여부 : ", isSaved);

        if (!isSaved) {
            fetchAddSave(brdId);
        } else {
            fetchRemoveSave(brdId);
        }
    }

    // 회원의 저장글 추가 요청
    const fetchAddSave = async (brdId) => {
        try {
            const addSaveData = {
                userId: userId,
                brdId: brdId
            }
            if (userId === null) {
                alert("로그인 해주세요.");
            } else {
                const res = await axios.post(`${BASE_URL}/api/main/addSave`, addSaveData);
                const data = res.data.success;

                console.log("글 저장 요청 : ", data)
                fetchLikedSaved();
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 회원의 저장글 삭제 요청
    const fetchRemoveSave = async (brdId) => {
        try {
            const removeSaveData = {
                userId: userId,
                brdId: brdId
            }
            if (userId === null) {
                alert("로그인 해주세요.");
            } else {
                const res = await axios.post(`${BASE_URL}/api/main/removeSave`, removeSaveData);
                const data = res.data.success;

                console.log("글 저장 요청 : ", data);

                fetchLikedSaved();
            }
        } catch (error) {
            console.error(error);
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
                                            <img src={`http://localhost:4000/profileImg/${item.USER_IMAGE}`} alt="프로필 이미지" />
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
                                            {
                                                userLikedSaved && userLikedSaved.length > 0 && userLikedSaved.some(element => element.LIKED_NUM === item.BRD_ID) ? (
                                                    <i
                                                        className="fa-solid fa-heart heart-style"
                                                        onClick={() => handleToggleLike(item.BRD_ID)}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="fa-regular fa-heart"
                                                        onClick={() => handleToggleLike(item.BRD_ID)}
                                                    ></i>
                                                )
                                            }
                                            <i className="fa-regular fa-comment"></i>
                                            {
                                                userLikedSaved && userLikedSaved.length > 0 && userLikedSaved.some(element => element.SAVED_NUM === item.BRD_ID) ? (<i
                                                    className="fa-solid fa-bookmark"
                                                    onClick={() => handleToggleSave(item.BRD_ID)}
                                                ></i>
                                                ) : (
                                                    <i
                                                        className="fa-regular fa-bookmark"
                                                        onClick={() => handleToggleSave(item.BRD_ID)}
                                                    ></i>
                                                )
                                            }
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
                                    {isLoggedIn ? (<img src={`http://localhost:4000/profileImg/${item.USER_IMAGE}`} alt="프로필 이미지" />) : (<i className="fa-regular fa-circle-user fa-2x"></i>)}
                                    <div className="post_comment_detail">
                                        <input value={commentInfo.comment} onChange={(event) => {
                                            inputCommentChange(event);
                                            getBrdId(item.BRD_ID);
                                        }

                                        } type="text" placeholder="댓글 달기..." />
                                    </div>
                                    <button onClick={() => {
                                        fetchAddComment();
                                        // getbrdId(item.BRD_ID);
                                        // sendCommentRequest();
                                    }}>게시</button>
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