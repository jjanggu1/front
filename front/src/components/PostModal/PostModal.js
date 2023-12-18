import { useEffect, useState, forwardRef, useRef } from 'react';
import './PostModal.css';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import PostMore from '../../components/PostMore/PostMore.js';
import CommentMore from '../../components/CommentMore/CommentMore.js';
import axios from 'axios';

import { tooglePostMore } from "../../store/store";
import { tooglePostModal } from "../../store/store";
import { toogleCommentMore } from "../../store/store";
import { useDispatch, useSelector } from 'react-redux';

// forwardRef를 사용하여 ref를 전달
const PostModal = forwardRef(({ postNum, rerenderLikedSaved, rerenderPostData }, ref) => {
    // 더보기 모달 Redux
    let mainPostMoreVisible = useSelector(state => state.mainPostMoreVisible);
    let mainCommentMoreVisible = useSelector(state => state.mainCommentMoreVisible)
    let dispatch = useDispatch();

    //PostMore 컴포넌트로 전달할 함수
    const rerenderPostList = () => {
        rerenderPostData();
    }
    // 댓글 입력 Ref
    const commentInputRef = useRef();

    const focusCommentInput = () => {
        commentInputRef.current.focus();
    }

    //회원아아디, 닉네임 가져오기 
    const userId = localStorage.getItem('userId');
    const userNick = localStorage.getItem('userNick');

    // props로 받은 게시물 Id 저장
    const [brdId, setBrdId] = useState({
        brdId: postNum
    });

    // PostMore 컴포넌트에 전달할 ConText
    const [postUserIdData, setPostUserIdData] = useState(
        {
            userId: userId, //해당 글의 USER_ID
            brdId: postNum, //해당 글의 BRD_ID
        }
    );
    // PostMore 컴포넌트에 전달할 데이터 가져오는 함수
    const getPostUserIdData = () => {
        setPostUserIdData({
            userId: userId,
            brdId: postNum,
        });
    }

    // CommentMore 컴포넌트에 전달할 ConText
    const [commentUserIdData, setCommentUserIdData] = useState(
        {
            userId: userId, //해당 댓글의 USER_ID
            comId: null, //해당 댓글의 COM_ID
        }
    );
    // CommentMore 컴포넌트에 전달할 데이터 가져오는 함수
    const getCommentUserIdData = (comId) => {
        setCommentUserIdData({
            userId: userId,
            comId: comId,
        });
    }
    const [postData, setPostData] = useState(); // 글 데이터
    const [commentData, setCommentData] = useState(); // 댓글리스트 데이터
    const [userLikedSaved, setUserLikedSaved] = useState(); //회원이 좋아요, 저장한 글 데이터

    useEffect(() => {
        fetchPostData();
        fetchCommentData();
        fetchLikedSaved();
    }, [])

    const BASE_URL = "http://localhost:4000";
    // 서버로 글 데이터 요청
    const fetchPostData = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/main/modalPost`, brdId);
            const data = res.data;

            setPostData(data);
        } catch (error) {
            console.error(error);
        }
    }

    // 서버로 댓글 데이터 요청
    const fetchCommentData = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/main/comments`, brdId);
            const data = res.data;

            setCommentData(data);
        } catch (error) {
            console.error(error);
        }
    }

    // 서버로 댓글추가 요청할 데이터
    const [commentInfo, setCommentInfo] = useState({
        brdId: postNum,
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
    // 서버로 좋아요, 저장한 글 데이터 요청
    const fetchLikedSaved = async () => {
        const setObjUserId = {
            userId: userId
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/main/likedSaved`, setObjUserId);
            const data = res.data;

            setUserLikedSaved(data);
        } catch (error) {
            console.error(error);
        }
    }

    // 좋아요 토글 함수
    const handleToggleLike = async (brdId) => {
        // 좋아요를 눌렀는지 확인
        const isLiked = userLikedSaved.some(element => element.LIKED_NUM === brdId);
        console.log("좋아요 여부 : ", isLiked);

        if (!isLiked) {
            await fetchAddLike(brdId);
        } else {
            await fetchRemoveLike(brdId);
        }

        // 좋아요 버튼 리렌더링
        fetchLikedSaved();
        // 게시글 목록 리렌더링(좋아요수 변경을 위함)
        fetchPostData();
        // 상위 컴포넌트의 좋아요버튼 리렌더링
        rerenderLikedSaved();
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

            }
        } catch (error) {
            console.error(error);
        }
    }

    // 저장글 토글 함수
    const handleToggleSave = async (brdId) => {
        // 글을 저장했는지 확인
        const isSaved = userLikedSaved.some(element => element.SAVED_NUM === brdId);
        console.log("글 저장 여부 : ", isSaved);

        if (!isSaved) {
            await fetchAddSave(brdId);
        } else {
            await fetchRemoveSave(brdId);
        }
        fetchLikedSaved();
        // 상위 컴포넌트의 좋아요버튼 리렌더링
        rerenderLikedSaved();
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


            }
        } catch (error) {
            console.error(error);
        }
    }


    // 이미지 경로 동적생성
    const generateImagePaths = (brdId, ...imageNames) => {
        return imageNames
            .filter(img => img !== null)
            .map(imageName => `http://localhost:4000/postImg/${brdId}/${imageName}`);
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

    console.log("글 ID값 : ", brdId);
    console.log("글 데이터 : ", postData);
    console.log("댓글 데이터 : ", commentData);
    console.log("회원이 좋아요, 저장한 데이터 : ", userLikedSaved);

    return (
        <div className='postModal_popup'>
            <button id='close' onClick={() => dispatch(tooglePostModal())}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            {postData && postData.length > 0 ? (
                <div className='postModal' ref={ref}>
                    <div className='postModal_image'>
                        <ImageSlider images={generateImagePaths(brdId.brdId, postData[0].BRD_IMAGE1, postData[0].BRD_IMAGE2, postData[0].BRD_IMAGE3, postData[0].BRD_IMAGE4, postData[0].BRD_IMAGE5)} />
                    </div>
                    <div className='postModal_content'>
                        <div className='postModal_header'>
                            <img src={`http://localhost:4000/profileImg/${postData[0].USER_IMAGE}`} alt="프로필 이미지" />
                            <span>{postData[0].USER_NICKNAME}</span>
                            <i className="fa-solid fa-ellipsis" onClick={() => {
                                getPostUserIdData();
                                dispatch(tooglePostMore());
                            }}></i>
                        </div>
                        <div className='postModal_commentList'>
                            <div className='postModal_postInfo'>
                                <img src={`http://localhost:4000/profileImg/${postData[0].USER_IMAGE}`} alt="프로필 이미지" />
                                <span>{postData[0].USER_NICKNAME}</span>
                                <span>{postData[0].BRD_CON}</span>
                            </div>
                            {commentData && commentData.map(comment => (
                                <div className='postModal_comment'>
                                    <img src={`http://localhost:4000/profileImg/${comment.USER_IMAGE}`} alt="" />
                                    <span>{comment.USER_NICKNAME}</span>
                                    <span>{comment.COM_COMMENT}</span>
                                    <i className="fa-solid fa-ellipsis" onClick={() => {
                                        getCommentUserIdData(comment.COM_ID);
                                        dispatch(toogleCommentMore());
                                    }}></i>
                                </div>
                            ))}

                        </div>
                        <div className='postModal_info'>
                            <div className='postModal_info_btns'>
                                {userLikedSaved && userLikedSaved.some((element) => brdId.brdId === element.LIKED_NUM) ? (
                                    <i className="fa-solid fa-heart heart-style" onClick={() => handleToggleLike(brdId.brdId)}></i>
                                ) : (
                                    <i className="fa-regular fa-heart" onClick={() => handleToggleLike(brdId.brdId)}></i>
                                )}
                                <i className="fa-regular fa-comment" onClick={focusCommentInput}></i>
                                {userLikedSaved && userLikedSaved.some((element) => brdId.brdId === element.SAVED_NUM) ? (
                                    <i className="fa-solid fa-bookmark" onClick={() => handleToggleSave(brdId.brdId)}></i>
                                ) : (
                                    <i className="fa-regular fa-bookmark" onClick={() => handleToggleSave(brdId.brdId)}></i>
                                )}
                            </div>
                            <div className='postModal_info_heart'>
                                <span><strong>좋아요 {postData[0].LIKED_COUNT}개</strong></span>
                            </div>
                            <div className='postModal_info_time'>
                                <span>{getTimeAgo(postData[0])}</span>
                            </div>
                        </div>
                        <div className='postModal_comment_input'>
                            <input type="text" placeholder="댓글 달기..." value={commentInfo.comment} onChange={(event) => inputCommentChange(event)} ref={commentInputRef} />
                            <button onClick={fetchAddComment}>게시</button>
                        </div>
                    </div>
                </div>
            ) : (
                <span>로딩중입니다...</span>
            )
            }

            {mainPostMoreVisible && <PostMore value={{ postUserIdData }} rerenderPostList={rerenderPostList} />}

            {mainCommentMoreVisible && <CommentMore value={{ commentUserIdData, getCommentData: fetchCommentData }} />}
        </div>
    );
});

export default PostModal;
