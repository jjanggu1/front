import './CreatePost.css';
import ImageSlider from '../ImageSlider/ImageSlider.js';

import { useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleCreatePost } from "../../store/store";
import axios from 'axios';

function CreatePost() {
    const BASE_URL = "http://localhost:4000";

    let isCreatePostVisible = useSelector(state => state.createPostVisible)
    let dispatch = useDispatch();

    // 글 업로드 요청시 보낼 데이터
    const [uploadPostData, setUploadPostData] = useState({
        userId: localStorage.getItem("userId"),
        userNick: localStorage.getItem("userNick"),
        content: "",
        hashtag: "",
        isCommentPossible: false
    })

    const onChangeContentInput = (e) => {
        const { value, name } = e.target
        setUploadPostData({
            ...uploadPostData,
            [name]: value
        })
    }
    console.log(uploadPostData);
    const handleToggle = () => {
        setUploadPostData({
            ...uploadPostData,
            isCommentPossible: !uploadPostData.isCommentPossible
        });
    };

    // 이미지 미리보기 로직
    const [imgFiles, setImgFiles] = useState([]);
    const [imgPreview, setImgPreview] = useState([]);
    const imgRef = useRef();

    const saveImgFile = () => {
        const files = imgRef.current.files;

        if (files.length > 5) {
            alert("최대 5개의 파일만 선택할 수 있습니다.");
            return
        }

        // 파일 객체를 배열에 추가
        Array.from(files).forEach(file => {
            setImgFiles(prevFiles => [...prevFiles, file]);
        });

        // FileReader를 사용하여 파일을 읽고 미리보기 생성
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // 읽은 내용을 미리보기에 사용
                const previewImage = reader.result;

                // 기존 배열에 미리보기 추가
                setImgPreview(prevFiles => [...prevFiles, previewImage]);
            };
            reader.readAsDataURL(file);
        });
    };

    const fetchUploadPost = async (e) => {
        e.preventDefault();
        try {
            if (imgFiles.length === 0) {
                alert("이미지를 선택해주세요.")
                return
            }

            const formData = new FormData();

            // 각 이미지 파일을 FormData에 추가
            for (let i = 0; i < imgFiles.length; i++) {
                formData.append('postImage', imgFiles[i]);
            }

            // 요청에 필요한 글 데이터도 추가
            for (const key in uploadPostData) {
                formData.append(key, uploadPostData[key]);
            }

            const res = await axios.post(`${BASE_URL}/api/createPost`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = res.data.success;

            if (data === true) {
                dispatch(toggleCreatePost());
                window.location.replace("/");
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="createPost_popup">
            <form className="createPost" encType="multipart/form-data">
                <div className="createPost_header">
                    <button onClick={() => { dispatch(toggleCreatePost()) }}>취소</button>
                    <button onClick={fetchUploadPost}>공유</button>
                </div>
                <div className="createPost_uploadImg">
                    <input ref={imgRef} id='image' type="file" onChange={saveImgFile} accept="image/*" multiple />

                    <label htmlFor="image">
                        <span><strong>이미지 업로드</strong></span>
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </label>
                </div>
                <div className="createPost_displayImg">
                    {imgFiles.length > 0 ? (
                        <ImageSlider images={imgPreview} />
                    ) : (
                        <div className='createPost_displayImg_imgArea'>
                            <div className='createPost_displayImg_uploadBtn'>
                                <i className="fa-solid fa-arrow-up-from-bracket fa-lg"></i>
                            </div>
                            <p className='createPost_displayImg_uploadText'>선택한 사진이 여기에 표시됩니다.</p>
                        </div>
                    )}
                </div>
                <div className="createPost_detail">
                    <span><strong>문구 입력</strong></span>
                    <input onChange={onChangeContentInput} name='content' value={uploadPostData.content} type="text" placeholder="문구를 입력하세요." maxLength={1000} />
                </div>
                <div className="createPost_commentToggle">
                    <span><strong>댓글 기능 해제</strong></span>
                    <label className={`iphone-toggle ${uploadPostData.isCommentPossible ? 'on' : ''}`}>
                        <input type="checkbox" className="iphone-toggle-checkbox" onChange={handleToggle} checked={uploadPostData.isCommentPossible} />
                        <div className="iphone-toggle-slider"></div>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;