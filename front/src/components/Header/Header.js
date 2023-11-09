import './Header.css';
import CreatePost from '../CreatePost/CreatePost';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleCreatePost } from "../../store/store";

function Header() {
    let isCreatePostVisible = useSelector(state => state.createPostVisible)
    let dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        const loggedInCheck = () => {
            localStorage.getItem("userId") === null ? setIsLoggedIn(false) : setIsLoggedIn(true);
        }
        loggedInCheck();
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
                    <a href="#"><i className="fa-regular fa-square-plus fa-xl" onClick={activeLoggedIn}></i></a>
                    <a href="/mypage">
                        <i className="fa-regular fa-circle-user fa-xl"></i>
                    </a>
                    {isLoggedIn === false ? null : (
                        <a href="#" onClick={logout}><i className="fa-solid fa-right-from-bracket fa-xl"></i></a>
                    )}

                </div>
            </div>
            {isCreatePostVisible && <CreatePost />}
        </div>
    )

}

export default Header;