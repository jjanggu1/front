import './Header.css';

import CreatePost from '../CreatePost/CreatePost';
import { useState } from 'react';

function Header() {
    const [isCreatePostVisible, setCreatePostVisible] = useState(false);

    const toggleCreatePost = () => {
        setCreatePostVisible(!isCreatePostVisible);
    }
    return (
        <div className="header">
            <div className="header_content">
                <div className="logo">
                    <span>memories</span>
                </div>

                <div className="search">
                    <input type="text" placeholder="검색" />
                </div>

                <div className="service">
                    <a href="/">
                        <i class="fa-solid fa-house-chimney fa-xl"></i>
                    </a>
                    <i class="fa-regular fa-square-plus fa-2x" onClick={toggleCreatePost}></i>
                    <a href="/mypage">
                        <i class="fa-regular fa-circle-user fa-2x"></i>
                    </a>
                </div>
            </div>
            {isCreatePostVisible && <CreatePost />}
        </div>
    )

}

export default Header;