import './Header.css';
import CreatePost from '../CreatePost/CreatePost';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { toggleCreatePost } from "../../store/store";
import { Link } from 'react-router-dom';

function Header() {
    const BASE_URL = "http://localhost:4000";

    let isCreatePostVisible = useSelector(state => state.createPostVisible)
    let dispatch = useDispatch();


    const userIdValue = localStorage.getItem("userId");
    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {

        const loggedInCheck = () => {
            localStorage.getItem("userId") === null ? setIsLoggedIn(false) : setIsLoggedIn(true);
        }

        loggedInCheck(); //로그인여부 확인
        getProfileImage(); //프로필 이미지 불러옴
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

    // 프로필 이미지 불러오기
    const getProfileImage = async () => {
        try {
            if (!userIdValue) {
                return
            }

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

    const [searchInput, setSearchInput] = useState("");

    // 검색된 데이터 
    const [searchData, setSearchData] = useState();

    // 회원&해시태그 검색
    const fetchSearchData = async () => {
        const sendSearchData = {
            memberNick: searchInput
        }
        if (sendSearchData.memberNick === "") {
            return
        }
        try {
            const res = await axios.post(`${BASE_URL}/api/main/findUser`, sendSearchData);
            const data = res.data;

            await setSearchData(data);

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    // 인풋값이 바뀔때만 검색 요청
    useEffect(() => {
        fetchSearchData();
    }, [searchInput]);

    const allEraseInput = () => {
        setSearchInput("");
    }

    console.log("검색 인풋 : ", searchInput);
    console.log("검색된 데이터 : ", searchData);
    return (
        <div className="header">
            <div className="header_content">
                <div className="logo">
                    <span><Link to="/">memories</Link></span>
                </div>

                <div className="search">
                    <div className='searchBox'>
                        <input onChange={(event) =>
                            setSearchInput(event.target.value)
                        } value={searchInput} type="text" placeholder="검색" />
                        <i className="fa-solid fa-xmark" onClick={allEraseInput}></i>
                    </div>
                    {searchInput.trim() !== '' ? (
                        <div className='searchList'>
                            {searchData && searchData.length > 0 ? (
                                searchData.map((item) => (
                                    <Link to={`/profile/${item.USER_ID}`} key={item.USER_ID}>
                                        <div className='searchList_column'>
                                            <img src={`http://localhost:4000/profileImg/${item.USER_IMAGE}`} alt="프로필 이미지" />
                                            <div className='searchList_column_row'>
                                                <span>{item.USER_NICKNAME}</span>
                                                <span>{item.USER_NAME}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>검색 결과가 없습니다.</p>
                            )}

                        </div>
                    ) : (
                        null
                    )}

                </div>

                <div className="service">
                    <Link to="/">
                        <i className="fa-solid fa-house-chimney fa-xl"></i>
                    </Link>
                    <a href="#"><i className="fa-regular fa-square-plus fa-2x" onClick={activeLoggedIn}></i></a>
                    <Link to="/mypage">
                        {previewImage ? (
                            <img src={previewImage} alt="프로필 이미지" />
                        ) : (
                            <i className="fa-regular fa-circle-user fa-2x"></i>
                        )}

                    </Link>
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