import './UserUpdate.css';
import Header from '../../components/Header/Header.js';

function UserUpdate() {
    return (
        <div className='userUpdate_wrap'>
            <Header />
            <div className='userUpdate'>
                <div className='userUpdate_sideBar'>
                    <span>프로필 편집</span>
                    <span>비밀번호 변경</span>
                </div>
                <div className='userUpdate_main'>
                    <div className='userUpdate_main_imgUpdate'>
                        <div className='userUpdate_main_imgUpdate_img'>
                            <img src={require("../../assets/img/main_img1.png")} alt="이미지1" />
                        </div>
                        <div className='userUpdate_main_imgUpdate_btn'>
                            <span>dong9ri</span>
                            <span>프로필 사진 바꾸기</span>
                        </div>
                    </div>
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

                            <textarea type="text" id='intro' placeholder='소개' maxLength={150}/>

                            <input type="submit" value={"제출"} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserUpdate;