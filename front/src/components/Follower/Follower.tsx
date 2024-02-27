import './Follower.css';

import { useSelector, useDispatch } from "react-redux";
import { RootState, toggleFollower } from "../../store/store";


function Follower() {
    let isFollowerVisible = useSelector((state: RootState) => state.followerVisible)
    let dispatch = useDispatch();
    return (
        <div className="follower_popup">
            <div className="follower">
                <div className="follower_header">
                    <span>팔로워</span>
                    <button onClick={ () => { dispatch(toggleFollower()) }}><i className="fa-solid fa-x"></i></button>
                </div>
                <div className="follower_search">
                    <input type="text" placeholder="검색" />
                </div>
                <div className="follower_followers">
                    <div className="follower_follower">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로워 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="follower_follower">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로워 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="follower_follower">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로워 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="follower_follower">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로워 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="follower_follower">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로워 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="follower_follower">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로워 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                    <div className="follower_follower">
                        <img src={require("../../assets/img/me.jpg")} alt="팔로워 이미지" />
                        <span>hjjj_0</span>
                        <button>삭제</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Follower;