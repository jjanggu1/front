import { useEffect, useState, forwardRef } from 'react';
import './PostModal.css';
import axios from 'axios';

import { tooglePostModal } from '../../store/store';
import { useDispatch } from 'react-redux';

// forwardRef를 사용하여 ref를 전달
const PostModal = forwardRef(({ postNum }, ref) => {
    const BASE_URL = "http://localhost:4000";

    let dispatch = useDispatch();

    // props로 받은 게시물 Id 저장
    const [brdId, setBrdId] = useState({
        brdId: postNum
    });

    const [postData, setPostData] = useState(); // 글 데이터
    const [commentData, setCommentData] = useState(); // 댓글 데이터

    useEffect(() => {
        fetchPostData();
    }, [])

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
    const fetchCommentData = () => {
        try {

        } catch (error) {

        }
    }
    console.log(postData);
    console.log(brdId.value);
    return (
        <div className='postModal_popup'>
            <button id='close' onClick={() => dispatch(tooglePostModal())}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div className='postModal' ref={ref}>
                <div className='postModal_image'>
                    <img src={require("../../assets/img/main_img1.png")} alt="aa" />
                </div>
                <div className='postModal_content'>
                    <div className='postModal_header'>
                        <img src={require("../../assets/img/user.png")} alt="" />
                        <span>TestUserName</span>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <div className='postModal_commentList'>
                        <div className='postModal_postInfo'>
                            <img src={require("../../assets/img/user.png")} alt="" />
                            <span>테스트 글 작성자</span>
                            <span>테스트 글 내용</span>
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
                            <i className="fa-regular fa-comment"></i>
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
                        <input type="text" placeholder="댓글 달기..." />
                        <button>게시</button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PostModal;
