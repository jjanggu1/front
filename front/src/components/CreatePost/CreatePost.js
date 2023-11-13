import './CreatePost.css';

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleCreatePost } from "../../store/store";

function CreatePost() {
    let isCreatePostVisible = useSelector(state => state.createPostVisible)
    let dispatch = useDispatch();

    // 댓글기능 상태
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className="createPost_popup">
            <div className="createPost">
                <div className="createPost_header">
                    <button onClick={ () => { dispatch(toggleCreatePost()) }}>취소</button>
                    <button>공유</button>
                </div>
                <div className="createPost_uploadImg">
                    <input type="file" />
                    <span><strong>이미지 업로드</strong></span>
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                </div>
                <div className="createPost_displayImg">
                    <div className='createPost_displayImg_imgArea'>
                        <div className='createPost_displayImg_uploadBtn'>
                            <i className="fa-solid fa-arrow-up-from-bracket fa-lg"></i>
                        </div>
                        <p className='createPost_displayImg_uploadText'>업로드된 사진이 여기에 표시됩니다.</p>
                    </div>
                </div>
                <div className="createPost_detail">
                    <span><strong>문구 입력</strong></span>
                    <input type="text" placeholder="문구를 입력하세요." />
                </div>
                <div className="createPost_commentToggle">
                    <span><strong>댓글 기능 해제</strong></span>
                    <label className={`iphone-toggle ${isChecked ? 'on' : ''}`}>
                        <input type="checkbox" className="iphone-toggle-checkbox" onChange={handleToggle} checked={isChecked} />
                        <div className="iphone-toggle-slider"></div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;