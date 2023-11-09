import './Content.css';

import PostMore from '../../components/PostMore/PostMore.js';

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';
// 리덕스툴킷 수정함수 임포트
import { tooglePostMore } from "../../store/store";

function Content() {
    let mainPostMoreVisible = useSelector(state => state.mainPostMoreVisible)
    let dispatch = useDispatch();

    // 게시글 목록 데이터 상태
    const [postsData, setPostsData] = useState();


    // 서버에 게시글 데이터 요청
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/main');
                const data = res.data;
                setPostsData(data);

            } catch (error) {
                console.error('에러발생 : ', error);
            }
        }

        fetchData();
    }, []);
    console.log(postsData);
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
                                        <i className="fa-regular fa-circle-user fa-2x"></i>
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
                                        <img src={require("../../assets/img/main_img1.png")} alt="이미지1" />
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
                                            <span><strong>dong9ri_</strong></span>
                                            <span>꽃 너무 이쁘다👍</span>
                                        </div>
                                        <div className="post_content_info_time">
                                            <span>1분전</span>
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