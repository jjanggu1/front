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
    const imgRef = useRef();

    const saveImgFile = () => {
        const files = imgRef.current.files;

        // FileReader를 사용하여 파일을 읽고 미리보기 생성
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // 읽은 내용을 미리보기에 사용
                const previewImage = reader.result;

                // 기존 배열에 미리보기 추가
                setImgFiles(prevFiles => [...prevFiles, previewImage]);
            };
            reader.readAsDataURL(file);
        });
    };
    console.log(imgFiles)

    // const fetchUploadPostData = async () => {
    //     try {
    //         if (!uploadPostData.content) {
    //             alert("문구를 입력해주세요.")
    //             return
    //         }

    //         const res = await axios.post(`${BASE_URL}/api/createPost`, uploadPostData);
    //         const data = res.data.message;

    //         console.log(data);

    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    const fetchUploadPostImg = async (e) => {
        e.preventDefault();
        try {
            if (imgFiles.length === 0) {
                alert("이미지를 선택해주세요.")
                return
            }

            const formData = new FormData();

            // 각 이미지 파일을 FormData에 추가
            imgFiles.forEach((file, index) => {
                formData.append(`postImage${index + 1}`, file);
            });
            // 요청에 필요한 글 데이터도 추가
            formData.append('postData', uploadPostData);

            console.log(formData.get("postData"));

            const res = await axios.post(`${BASE_URL}/api/createPost`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = res.data.message;
            console.log(data);

        } catch (e) {
            console.error(e);
        }
    }

    const handleUploadButtonClick = async () => {
        // await fetchUploadPostData(); // 글 작성 데이터 업로드
        await fetchUploadPostImg; // 글 이미지 업로드
    }
    return (
        <div className="createPost_popup">
            <form className="createPost" encType="multipart/form-data">
                <div className="createPost_header">
                    <button onClick={() => { dispatch(toggleCreatePost()) }}>취소</button>
                    <button onClick={fetchUploadPostImg}>공유</button>
                </div>
                <div className="createPost_uploadImg">
                    <input ref={imgRef} id='image' type="file" onChange={saveImgFile} accept="image/*" multiple />

                    <label htmlFor="image">
                        <span><strong>이미지 업로드</strong></span>
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </label>
                </div>
                <div className="createPost_displayImg">
                    {imgFiles === "" ? (
                        <div className='createPost_displayImg_imgArea'>
                            <div className='createPost_displayImg_uploadBtn'>
                                <i className="fa-solid fa-arrow-up-from-bracket fa-lg"></i>
                            </div>
                            <p className='createPost_displayImg_uploadText'>업로드된 사진이 여기에 표시됩니다.</p>
                        </div>
                    ) : (
                        // <img src={imgFile} alt="프로필 이미지" />
                        <ImageSlider images={imgFiles} />
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