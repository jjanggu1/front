import './Header.css';
import CreatePost from '../CreatePost/CreatePost';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { toggleCreatePost } from "../../store/store";

function Header() {
    const BASE_URL = "http://localhost:4000";

    let isCreatePostVisible = useSelector(state => state.createPostVisible)
    let dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState();
    const loggedInCheck = () => {
        localStorage.getItem("userId") === null ? setIsLoggedIn(false) : setIsLoggedIn(true);
    }
    useEffect(() => {
        loggedInCheck();
        getProfileImage();
    }, []);

    const logout = () => { //로그아웃
        localStorage.removeItem("userId");
        localStorage.removeItem("userNick");
        localStorage.removeItem("userImg");
        window.location.href = "/";
    }

    const activeLoggedIn = () => {
        isLoggedIn === false ? window.location.href = "/login" : dispatch(toggleCreatePost());
    }

    const [previewImage, setPreviewImage] = useState(null);

    const getProfileImage = async () => {
        try {
            const userIdValue = localStorage.getItem("userId");
            console.log(userIdValue);

            const userId = {
                userId: userIdValue
            };

            const res = await axios.post(`${BASE_URL}/api/profileImg/getProfileImage`, userId, { responseType: 'arraybuffer' });

            // Convert array buffer to base64
            const base64Image = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));

            const imageUrl = `data:image/png;base64,${base64Image}`;
            setPreviewImage(imageUrl);

        } catch (error) {
            console.error('이미지 불러오기 오류: ', error);
        }
    };

    return (
        <div className="header">
            <div className="header_content">
                <div className="logo">
                    <span><a href="/">memories</a></span>
                </div>

                <div className="search">
                    <input type="text" placeholder="검색" />
                </div>

                <div className="service">
                    <a href="/">
                        <i className="fa-solid fa-house-chimney fa-xl"></i>
                    </a>
                    <a href="#"><i className="fa-regular fa-square-plus fa-2x" onClick={activeLoggedIn}></i></a>
                    <a href="/mypage">
                        {previewImage ? (
                            <img src={previewImage} alt="프로필 이미지" />
                        ) : (
                            <i className="fa-regular fa-circle-user fa-2x"></i>
                        )}
                        
                    </a>
                    {isLoggedIn === false ? <a href="/login" className="loginBtn">로그인</a> : (
                        <a href="#" onClick={logout}><i className="fa-solid fa-right-from-bracket fa-xl"></i></a>
                    )}

                </div>
            </div>
            {isCreatePostVisible && <CreatePost />}
        </div>
    )

}

export default Header;