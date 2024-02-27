import "./CreatePost.css";
import ImageSlider from "../ImageSlider/ImageSlider.js";

import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, toggleCreatePost } from "../../store/store";
import axios from "axios";

interface UploadPostData {
  userId: string | null;
  userNick: string | null;
  content: string;
  hashtag: string;
  isCommentPossible: boolean;
}

function CreatePost() {
  const BASE_URL = "http://localhost:4000";

  let isCreatePostVisible = useSelector(
    (state: RootState) => state.createPostVisible
  );
  let dispatch = useDispatch();

  // 글 업로드 요청시 보낼 데이터
  const [uploadPostData, setUploadPostData] = useState<UploadPostData>({
    userId: localStorage.getItem("userId"),
    userNick: localStorage.getItem("userNick"),
    content: "",
    hashtag: "",
    isCommentPossible: false,
  });

  const onChangeContentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUploadPostData({
      ...uploadPostData,
      [name]: value,
    });
  };
  console.log(uploadPostData);
  const handleToggle = () => {
    setUploadPostData({
      ...uploadPostData,
      isCommentPossible: !uploadPostData.isCommentPossible,
    });
  };

  // 이미지 미리보기 로직
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgPreview, setImgPreview] = useState<(string | ArrayBuffer | null)[]>(
    []
  );
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    if (imgRef.current) {
      const files = imgRef.current.files;
      if (files && files.length > 5) {
        alert("최대 5개의 파일만 선택할 수 있습니다.");
        return;
      }

      if (files) {
        // 파일 객체를 배열에 추가
        Array.from(files).forEach((file) => {
          setImgFiles((prevFiles) => [...prevFiles, file]);
        });

        // FileReader를 사용하여 파일을 읽고 미리보기 생성
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // 읽은 내용을 미리보기에 사용
            const previewImage = reader.result;

            // 기존 배열에 미리보기 추가
            setImgPreview((prevFiles) => [...prevFiles, previewImage]);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };

  // 해시태그 필터링
  const filterHashtag = () => {
    const hashtagRegex = /#[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g;

    const hashtagsArray = uploadPostData.content.match(hashtagRegex);
    console.log("content : ", uploadPostData.content);
    console.log("hashtagsArray : ", hashtagsArray);

    if (hashtagsArray) {
      const result = hashtagsArray.join(" ");
      setUploadPostData((prevData) => ({
        ...prevData,
        hashtag: result,
      }));
    }
  };
  const fetchUploadPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (imgFiles.length === 0) {
        alert("이미지를 선택해주세요.");
        return;
      } else if (uploadPostData.content === "") {
        alert("내용을 작성해주세요.");
        return;
      }

      filterHashtag(); //해쉬태그 필터링

      const formData = new FormData();

      // 각 이미지 파일을 FormData에 추가
      for (let i = 0; i < imgFiles.length; i++) {
        formData.append("postImage", imgFiles[i]);
      }

      // 요청에 필요한 글 데이터도 추가
      //   for (const key in uploadPostData) {
      //     formData.append(key, uploadPostData[key]);
      //   }
      Object.keys(uploadPostData).forEach((key) => {
        const value = uploadPostData[key as keyof UploadPostData]; // 키에 해당하는 값 가져오기
        if (typeof value === "string") {
          // 값이 문자열일 때만 처리
          formData.append(key, value);
        }
      });

      const res = await axios.post(`${BASE_URL}/api/createPost`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data.success;

      if (data === true) {
        dispatch(toggleCreatePost());
        window.location.replace("/");
      }
      console.log("업로드할 데이터 : ", uploadPostData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="createPost_popup">
      <form className="createPost" encType="multipart/form-data">
        <div className="createPost_header">
          <button
            onClick={() => {
              dispatch(toggleCreatePost());
            }}
          >
            취소
          </button>
          <button onClick={fetchUploadPost}>공유</button>
        </div>
        <div className="createPost_uploadImg">
          <input
            ref={imgRef}
            id="image"
            type="file"
            onChange={saveImgFile}
            accept="image/*"
            multiple
          />

          <label htmlFor="image">
            <span>
              <strong>이미지 업로드</strong>
            </span>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </label>
        </div>
        <div className="createPost_displayImg">
          {imgFiles.length > 0 ? (
            <ImageSlider images={imgPreview.filter(Boolean).map(img => URL.createObjectURL(new Blob([img as ArrayBuffer])))} />
          ) : (
            <div className="createPost_displayImg_imgArea">
              <div className="createPost_displayImg_uploadBtn">
                <i className="fa-solid fa-arrow-up-from-bracket fa-lg"></i>
              </div>
              <p className="createPost_displayImg_uploadText">
                선택한 사진이 여기에 표시됩니다.
              </p>
            </div>
          )}
        </div>
        <div className="createPost_detail">
          <span>
            <strong>문구 입력</strong>
          </span>
          <input
            onChange={onChangeContentInput}
            name="content"
            value={uploadPostData.content}
            type="text"
            placeholder="문구를 입력하세요."
            maxLength={1000}
          />
        </div>
        <div className="createPost_commentToggle">
          <span>
            <strong>댓글 기능 해제</strong>
          </span>
          <label
            className={`iphone-toggle ${
              uploadPostData.isCommentPossible ? "on" : ""
            }`}
          >
            <input
              type="checkbox"
              className="iphone-toggle-checkbox"
              onChange={handleToggle}
              checked={uploadPostData.isCommentPossible}
            />
            <div className="iphone-toggle-slider"></div>
          </label>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
