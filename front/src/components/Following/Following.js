import './Following.css';

import { useSelector, useDispatch } from "react-redux";
import { toggleFollowing } from "../../store/store";

function Following() {
    let isfollowingVisible = useSelector(state => state.followingVisible)
    let dispatch = useDispatch();
    return (
        <div className="following_popup">
            <div className="following">
                <div className="following_header">
                    <span>팔로윙</span>
                    <button onClick={ () => { dispatch(toggleFollowing()) }}><i class="fa-solid fa-x"></i></button>
                </div>
                <div className="following_search">
                    <input type="text" placeholder="검색" />
                </div>
                <div className="following_followings">
                    <div className="following_following">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로윙 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="following_following">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로윙 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="following_following">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로윙 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="following_following">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로윙 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="following_following">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로윙 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="following_following">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로윙 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="following_following">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로윙 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Following;