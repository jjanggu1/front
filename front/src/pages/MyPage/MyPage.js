import './MyPage.css';
import Header from '../../components/Header/Header.js';

function MyPage() {
    return (
        <div className='myPage_wrap'>
            <Header />
            <div className='myPage'>
                <div className='myPage_header'>
                    <div className='myPage_header_userImg'>
                        <img src={require("../../assets/img/me.jpg")} alt="프로필이미지" />
                    </div>
                    <div className='myPage_header_user'>
                        <div className='myPage_header_user_info'>
                            <span>dong9ri_</span>
                            <a href="/userupdate">프로필 편집</a>
                            <i class="fa-solid fa-gear"></i>
                        </div>
                        <div className='myPage_header_user_community'>
                            <span>게시물 <strong>11</strong></span>
                            <span>팔로워 <strong>3</strong></span>
                            <span>팔로우 <strong>3</strong></span>
                        </div>
                        <div className='myPage_header_user_name'>
                            <span>동진</span>
                        </div>
                        <div className='myPage_header_user_introduction'>
                            <span>추억 일상 피드 :)</span>
                        </div>
                    </div>
                </div>
                <div className='myPage_category'>
                    <span>
                        <i class="fa-solid fa-border-all"></i>
                        게시물
                    </span>
                    <span>
                        <i class="fa-regular fa-bookmark"></i>
                        저장됨
                    </span>
                    <span>
                        <i class="fa-regular fa-heart"></i>
                        좋아요
                    </span>
                </div>
                    <div className='myPage_posts'>
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지1" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지2" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지3" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지1" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지2" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지1" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지2" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지3" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지1" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지2" />
                        <img src={require("../../assets/img/main_img1.png")} alt="이미지2" />
                    </div>
                </div>
        </div>
    )
}

export default MyPage;