import './Content.css';

function Content() {
    return (
        <div className="content">
            <div className="posts">
                <div className="post">
                    <div className="post_header">
                        <div className="post_header_img">
                            <i class="fa-regular fa-circle-user fa-2x"></i>
                        </div>
                        <div className="post_header_userName">
                            <span>dong9ri_</span>
                        </div>
                        <div className="post_header_more">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                    <div className="post_content">
                        <div className="post_content_img">
                            <img src={require("../../assets/img/main_img1.png")} alt="이미지1" />
                        </div>
                        <div className="post_content_info">
                            <div className="post_content_info_btns">
                                <i class="fa-regular fa-heart"></i>
                                <i class="fa-regular fa-comment"></i>
                                <i class="fa-regular fa-bookmark"></i>
                            </div>
                            <div className="post_content_info_firstComment">
                                <span>가장 먼저 좋아요를 눌러주세요</span>
                            </div>
                            <div className="post_content_info_detail">
                                <span><strong>dong9ri_</strong></span>
                                <span>오늘의 점심!</span>
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
                        <i class="fa-regular fa-circle-user fa-2x"></i>
                        <div className="post_comment_detail">
                            <input type="text" placeholder="댓글 달기..." />
                        </div>
                        <button>게시</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Content;