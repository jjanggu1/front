import './MyPage.css';

import Header from '../../components/Header/Header.js';
import Follower from '../../components/Follower/Follower';
import Following from '../../components/Following/Following';
import PostTabs from '../../components/MyPageTabs/PostTabs';
import SavedTabs from '../../components/MyPageTabs/SavedTabs';
import LikedTabs from '../../components/MyPageTabs/LikedTabs';

import { useSelector, useDispatch } from "react-redux";
// 리덕스툴킷 수정함수 임포트
import { toggleFollower } from "../../store/store";
import { toggleFollowing } from "../../store/store";
import { chooseTabs } from "../../store/store";

function MyPage() {
    let isFollowerVisible = useSelector(state => state.followerVisible);
    let isFollowingVisible = useSelector(state => state.followingVisible)
    let contentsVisible = useSelector(state => state.contentsVisible)
    let dispatch = useDispatch();

    // const [isFollowerVisible, setFollowerVisible] = useState(false);

    // const toggleFollower = () => {
    //     setFollowerVisible(!isFollowerVisible);
    // }
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
                            <span onClick={() => { dispatch(toggleFollower()) }}>팔로워 <strong>3</strong></span>
                            <span onClick={() => { dispatch(toggleFollowing()) }}>팔로우 <strong>3</strong></span>
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
                    <span onClick={() => { dispatch(chooseTabs("post")) }}>
                        <i class="fa-solid fa-border-all"></i>
                        게시물
                    </span>
                    <span onClick={() => { dispatch(chooseTabs("saved")) }}>
                        <i class="fa-regular fa-bookmark"></i>
                        저장됨
                    </span>
                    <span onClick={() => { dispatch(chooseTabs("liked")) }}>
                        <i class="fa-regular fa-heart"></i>
                        좋아요
                    </span>
                </div>
                {contentsVisible === "post" && <PostTabs />} {/* "post" 상태일 때 */}
                {contentsVisible === "saved" && <SavedTabs />} {/* "saved" 상태일 때 */}
                {contentsVisible === "liked" && <LikedTabs />} {/* "liked" 상태일 때 */}
            </div>
            {isFollowerVisible && <Follower />}
            {isFollowingVisible && <Following />}
        </div>
    )
}

export default MyPage;