import { useRef, useState, useEffect } from 'react';
import './ProfileTabs.css';
import axios from 'axios';

function ProfileTabs() {
    const BASE_URL = "http://localhost:4000";

    const [userId, setUserId] = useState(null);
    const getLocalStorageId = () => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
            console.log("userId 상태 저장 성공")
        }
    }
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
    
    useEffect(() => {
        getLocalStorageId();
        getProfileImage();
    }, []);


    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const fileInputRef = useRef();

    const handleAddProfileImgSubmit = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            // 이미지 미리보기
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadButtonClick = () => {
        // 서버로 이미지 업로드
        handleUploadImage();
    };

    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('profileImage', selectedFile);
            formData.append('userId', userId);
            console.log(formData);
            // 서버로 이미지 업로드
            const res = await axios.post(`${BASE_URL}/api/updateProfileImg`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = res.data;
            console.log(data);

            // 여기에서 서버로부터 받은 이미지 경로를 사용하면 됩니다.

        } catch (error) {
            console.error('이미지 업로드 오류: ', error);
        }
    };

    return (
        <div className='userUpdate_main'>
            <form className='userUpdate_main_imgUpdate'>
                <div className='userUpdate_main_imgUpdate_img'>
                    {/* 업로드 된 이미지 미리보기 */}
                    {previewImage ? (
                        <img src={previewImage} alt="프로필 이미지 미리보기" />
                    ) : (
                        <img src={require(`../../assets/img/user.png`)} alt="기본 이미지" />
                    )}
                </div>
                <div className='userUpdate_main_imgUpdate_btn'>
                    <span>dong9ri</span>
                    <label htmlFor="profileImg">프로필 사진 바꾸기</label>
                    <input
                        type="file"
                        id="profileImg"
                        accept="image/*"
                        onChange={handleAddProfileImgSubmit}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
            </form>
            <div className='userUpdate_main_infoUpdate'>
                <div className='userUpdate_main_infoUpdate_label'>
                    <label htmlFor="name">이름</label>
                    <label htmlFor="username">사용자 이름</label>
                    <label htmlFor="email">이메일</label>
                    <label htmlFor="phonenum">전화번호</label>
                    <label htmlFor="intro">소개</label>
                </div>
                <div className='userUpdate_main_infoUpdate_input'>
                    <input type="text" id='name' placeholder='이름' />
                    <p>사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용
                        하여 회원님의 계정을 찾을 수 있도록 도와주세요.</p>

                    <input type="text" id='username' placeholder='사용자 이름' />
                    <p>대부분의 경우 14일 이내에 사용자 이름을 다시 <span>dong9ri</span>(으)로 변
                        경할 수 있습니다.</p>

                    <p>개인정보</p>
                    <p>비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인 정보를
                        입력하세요. 공개 프로필에는 포함되지 않습니다.</p>
                    <input type="text" id='email' placeholder='이메일' />

                    <input type="text" id='phonenum' placeholder='전화번호' />

                    <textarea type="text" id='intro' placeholder='소개' maxLength={100} />

                    <button type="button" onClick={handleUploadButtonClick}>
                        제출
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ProfileTabs;