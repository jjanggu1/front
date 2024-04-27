import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleCreatePost } from "../../../store/store";
import { Link } from "react-router-dom";
import axios from "axios";

const Service = () => {
  const BASE_URL = "http://localhost:4000";

  let dispatch = useDispatch();

  const userIdValue = localStorage.getItem("userId");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    const loggedInCheck = () => {
      localStorage.getItem("userId") === null
        ? setIsLoggedIn(false)
        : setIsLoggedIn(true);
    };

    loggedInCheck(); //로그인여부 확인
    getProfileImage(); //프로필 이미지 불러옴
  }, []);

  const logout = () => {
    //로그아웃
    localStorage.removeItem("userId");
    localStorage.removeItem("userNick");
    localStorage.removeItem("userImg");
    window.location.href = "/";
  };

  const activeLoggedIn = () => {
    isLoggedIn === false
      ? (window.location.href = "/login")
      : dispatch(toggleCreatePost());
  };

  const [previewImage, setPreviewImage] = useState<string>("");

  // 프로필 이미지 불러오기
  const getProfileImage = async () => {
    try {
      if (!userIdValue) {
        return;
      }

      const userId = {
        userId: userIdValue,
      };

      const res = await axios.post(
        `${BASE_URL}/api/profileImg/getProfileImage`,
        userId,
        { responseType: "arraybuffer" }
      );

      // Convert array buffer to base64
      const base64Image = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const imageUrl: string = `data:image/png;base64,${base64Image}`;
      setPreviewImage(imageUrl);
    } catch (error) {
      console.error("이미지 불러오기 오류: ", error);
    }
  };

  return (
    <div className="service">
      <Link to="/">
        <i className="fa-solid fa-house-chimney fa-xl"></i>
      </Link>
      <a href="#">
        <i
          className="fa-regular fa-square-plus fa-2x"
          onClick={activeLoggedIn}
        ></i>
      </a>
      <Link to="/mypage">
        {previewImage ? (
          <img src={previewImage} alt="프로필 이미지" />
        ) : (
          <i className="fa-regular fa-circle-user fa-2x"></i>
        )}
      </Link>
      {isLoggedIn === false ? (
        <a href="/login" className="loginBtn">
          로그인
        </a>
      ) : (
        <a href="#" onClick={logout}>
          <i className="fa-solid fa-right-from-bracket fa-xl"></i>
        </a>
      )}
    </div>
  );
};

export default Service;
