import { useEffect, useState, forwardRef, useRef } from 'react';
import './PostModal.css';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import axios from 'axios';

import { tooglePostModal } from '../../store/store';
import { useDispatch } from 'react-redux';

// forwardRef를 사용하여 ref를 전달
const PostModal = forwardRef(({ postNum }, ref) => {
    let dispatch = useDispatch();

    // 댓글 입력 Ref
    const commentInputRef = useRef();

    const focusCommentInput = () => {
        commentInputRef.current.focus();
    }

    const userId = localStorage.getItem('userId'); //회원아아디 가져오기

    // props로 받은 게시물 Id 저장
    const [brdId, setBrdId] = useState({
        brdId: postNum
    });

    const [postData, setPostData] = useState(); // 글 데이터
    const [commentData, setCommentData] = useState(); // 댓글 데이터
    const [userLikedSaved, setUserLikedSaved] = useState(); //회원이 좋아요, 저장한 글 데이터

    useEffect(() => {
        fetchPostData();
        fetchCommentData();
        fetchUserLikedSavedData();
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

    // 서버로 댓글 데이터 요청
    const fetchUserLikedSavedData = async () => {
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


    //이미지 경로 동적생성
    // const generateImagePaths = (brdId, ...imageNames) => {
    //     return imageNames
    //         .filter(img => img !== null)
    //         .map(imageName => `http://localhost:4000/postImg/${brdId}/${imageName}`);
    // }

    console.log("글 데이터 : ", postData);
    console.log("댓글 데이터 : ", commentData);
    console.log("회원이 좋아요, 저장한 데이터 : ", userLikedSaved);
    return (
        <div className='postModal_popup'>
            <button id='close' onClick={() => dispatch(tooglePostModal())}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div className='postModal' ref={ref}>
                <div className='postModal_image'>
                {/* <ImageSlider images={generateImagePaths(brdId, postData[0].BRD_IMAGE1, postData[0].BRD_IMAGE2, postData[0].BRD_IMAGE3, postData[0].BRD_IMAGE4, postData[0].BRD_IMAGE5)} /> */}
                </div>
                <div className='postModal_content'>
                    <div className='postModal_header'>
                        {/* <img src={`http://localhost:4000/profileImg/${postData[0].USER_IMAGE}`} alt="프로필 이미지" /> */}
                        <span>{postData[0].USER_NICKNAME}</span>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <div className='postModal_commentList'>
                        <div className='postModal_postInfo'>
                            <img src={`http://localhost:4000/profileImg/${postData[0].USER_IMAGE}`} alt="프로필 이미지" />
                            <span>{postData[0].USER_NICKNAME}</span>
                            <span>{postData[0].BRD_CON}</span>
                        </div>
                        <div className='postModal_comment'>
                            <img src={require("../../assets/img/user.png")} alt="" />
                            <span>테스트유저</span>
                            <span>테스트 댓글</span>
                            <i className="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                    <div className='postModal_info'>
                        <div className='postModal_info_btns'>
                            <i className="fa-regular fa-heart"></i>
                            <i className="fa-regular fa-comment" onClick={focusCommentInput}></i>
                            <i className="fa-regular fa-bookmark"></i>
                        </div>
                        <div className='postModal_info_heart'>
                            <span><strong>좋아요 3개</strong></span>
                        </div>
                        <div className='postModal_info_time'>
                            <span>1분전</span>
                        </div>
                    </div>
                    <div className='postModal_comment_input'>
                        <input type="text" placeholder="댓글 달기..." ref={commentInputRef} />
                        <button>게시</button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PostModal;
