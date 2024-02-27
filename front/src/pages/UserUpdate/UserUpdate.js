import './UserUpdate.css';
import Header from '../../components/Header/Header.tsx';
import ProfileTabs from '../../components/UserUpdateTabs/ProfileTabs.js';
import PasswordTabs from '../../components/UserUpdateTabs/PasswordTabs.js';

import { useSelector, useDispatch } from "react-redux";
// 리덕스툴킷 수정함수 임포트
import { chooseUpdateUserTabs } from "../../store/store";

function UserUpdate() {
    let updateUserTabsVisible = useSelector(state => state.updateUserTabsVisible)
    let dispatch = useDispatch();
    return (
        <div className='userUpdate_wrap'>
            <Header />
            <div className='userUpdate'>
                <div className='userUpdate_sideBar'>
                    <span onClick={() => { dispatch(chooseUpdateUserTabs("profile")) }}
                    className={`myPage_category_span ${updateUserTabsVisible === "profile" ? "userUpdate_sideBar_tab" : ""}`}>프로필 편집</span>
                    <span onClick={() => { dispatch(chooseUpdateUserTabs("password")) }}
                    className={`myPage_category_span ${updateUserTabsVisible === "password" ? "userUpdate_sideBar_tab" : ""}`}>비밀번호 변경</span>
                </div>
                {updateUserTabsVisible === "profile" && <ProfileTabs />} {/* "post" 상태일 때 */}
                {updateUserTabsVisible === "password" && <PasswordTabs />} {/* "post" 상태일 때 */}
            </div>
        </div>
    )
}

export default UserUpdate;