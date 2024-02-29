import "./Profile.css";

import Header from "../Header/Header";
import Follower from "../Follower/Follower";
import Following from "../Following/Following";
import PostTabs from "../MyPageTabs/PostTabs";
import SavedTabs from "../MyPageTabs/SavedTabs";
import LikedTabs from "../MyPageTabs/LikedTabs";

import { useSelector, useDispatch } from "react-redux";
// 리덕스툴킷 수정함수 임포트
import { RootState, toggleFollower } from "../../store/store";
import { toggleFollowing } from "../../store/store";
import { chooseTabs } from "../../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface UserData {
  USER_ID: string;
  USER_IMAGE: string;
  USER_INTRO: string;
  USER_NAME: string;
  USER_NICKNAME: string;
}
interface UserPostCountData {
    totalPostCount: number;
}
interface UserId {
    userId: string;
}

function Profile() {
  const BASE_URL = "http://localhost:4000";

  const { username } = useParams();
  console.log("라우터 파람스", username);

  let isFollowerVisible = useSelector(
    (state: RootState) => state.followerVisible
  );
  let isFollowingVisible = useSelector(
    (state: RootState) => state.followingVisible
  );
  let contentsVisible = useSelector(
    (state: RootState) => state.contentsVisible
  );
  let dispatch = useDispatch();

  const userId: UserId = {
    userId: username || "",
  };

  // 회원 데이터
  const [userData, setUserData] = useState<UserData[]>([]);

  // 회원데이터 요청 함수
  const fetchUserData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/mypage`, userId); //게시글 목록 요청
      const data = res.data;
      await setUserData(data);

      return data; // 데이터 반환
    } catch (e) {
      console.error(e);
    }
  };

  // 회원 데이터
  const [userPostCountData, setUserPostCountData] = useState<UserPostCountData[]>([]);

  // 작성한 게시물 수 요청 함수
  const fetchPostCountData = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/mypage/getUserPostCount`,
        userId
      ); //작성한 게시물 수 요청
      const data = res.data;
      await setUserPostCountData(data);

      return data; // 데이터 반환
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // setUserId({
    //     userId: username
    // })
    fetchPostCountData();
    fetchUserData();
  }, [username]);
  // useEffect(() => {
  //     fetchPostCountData();
  //     fetchUserData();
  // }, []);
  console.log("마이페이지회원 데이터", userData);
  console.log("마이페이지회원 게시글 수 : ", userPostCountData);
  return (
    <div className="profile_wrap">
      <Header />
      <div className="profile">
        <div className="profile_header">
          <div className="profile_header_userImg">
            <img
              src={`http://localhost:4000/profileImg/${
                userData && userData[0].USER_IMAGE
              }`}
              alt="프로필이미지"
            />
          </div>
          <div className="profile_header_user">
            <div className="profile_header_user_info">
              <span>{userData && userData[0].USER_NICKNAME}</span>
            </div>
            <div className="profile_header_user_community">
              <span>
                게시물{" "}
                <strong>
                  {userPostCountData && userPostCountData[0].totalPostCount}
                </strong>
              </span>
              <span
                onClick={() => {
                  dispatch(toggleFollower());
                }}
              >
                팔로워 <strong>3</strong>
              </span>
              <span
                onClick={() => {
                  dispatch(toggleFollowing());
                }}
              >
                팔로우 <strong>3</strong>
              </span>
            </div>
            <div className="profile_header_user_name">
              <span>{userData && userData[0].USER_NAME}</span>
            </div>
            <div className="profile_header_user_introduction">
              <span>{userData && userData[0].USER_INTRO}</span>
            </div>
          </div>
        </div>
        <div className="profile_category">
          <span
            onClick={() => {
              dispatch(chooseTabs("post"));
            }}
            className={`profile_category_span ${
              contentsVisible === "post" ? "profile_category_span_border" : ""
            }`}
          >
            <i className="fa-solid fa-border-all"></i>
            게시물
          </span>
          <span
            onClick={() => {
              dispatch(chooseTabs("saved"));
            }}
            className={`profile_category_span ${
              contentsVisible === "saved" ? "profile_category_span_border" : ""
            }`}
          >
            <i className="fa-regular fa-bookmark"></i>
            저장됨
          </span>
          <span
            onClick={() => {
              dispatch(chooseTabs("liked"));
            }}
            className={`profile_category_span ${
              contentsVisible === "liked" ? "profile_category_span_border" : ""
            }`}
          >
            <i className="fa-regular fa-heart"></i>
            좋아요
          </span>
        </div>
        {contentsVisible === "post" && <PostTabs userId={userId} />}{" "}
        {/* "post" 상태일 때 */}
        {contentsVisible === "saved" && <SavedTabs userId={userId} />}{" "}
        {/* "saved" 상태일 때 */}
        {contentsVisible === "liked" && <LikedTabs userId={userId} />}{" "}
        {/* "liked" 상태일 때 */}
      </div>
      {isFollowerVisible && <Follower />}
      {isFollowingVisible && <Following />}
    </div>
  );
}

export default Profile;
