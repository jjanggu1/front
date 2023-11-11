import './PasswordTabs.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

function PasswordTabs() {
    const BASE_URL = "http://localhost:4000";

    //비밀번호, 비밀번호확인 값 상태저장 로직
    const [passwordInput, setPasswordInput] = useState({
        password: "",
        passwordCheck: ""
    })

    const { password, passwordCheck } = passwordInput;

    const onChangePasswordInput = (e) => {
        const { value, name } = e.target
        setPasswordInput({
            ...passwordInput,
            [name]: value,
        });
    }

    const [isMatchedPassword, setIsMatchedPassword] = useState(false);

    useEffect(() => {
        matchPassword();
    }, [passwordInput]);

    //비밀번호 값과 비밀번호 확인 값 일치여부
    const matchPassword = () => {
        console.log(passwordInput); // 추가
        // 스페이스바로 생긴 공백 제거
        const trimmedPassword = passwordInput.password.trim();
        const trimmedPasswordCheck = passwordInput.passwordCheck.trim();

        if (trimmedPassword && trimmedPasswordCheck) { // 값이 존재하면
            if (trimmedPassword === trimmedPasswordCheck) { // 비밀번호와 비밀번호 확인 입력이 일치하면
                setIsMatchedPassword(true)
            } else {
                setIsMatchedPassword(false)
            }
        } else {
            setIsMatchedPassword(false)
        }

    }

    // 비밀번호 수정을 서버로 요청
    const fetchUpdatePassword = async () => {
        try {
            console.log(isMatchedPassword);
            if (!isMatchedPassword) {
                alert("비밀번호를 다시 확인해주세요.");
            } else {
                alert("변경완료");
                // const res = await axios.post(`${BASE_URL}/api/updateProfile/password`, passwordInput);
                // alert(res.data.message);
            }
        } catch (error) {
            console.error('유저정보 수정에 실패하였습니다. : ', error);
        }
    }

    const handleChangeBtnClick = () => {
        console.log(passwordInput); // 추가
        fetchUpdatePassword();
    }

    return (
        <div className='PasswordTabs_main'>
            <div className='PasswordTabs_main_infoUpdate'>
                <div className='PasswordTabs_main_infoUpdate_label'>
                    <label htmlFor="password">비밀번호</label>
                    <label htmlFor="passwordCheck">비밀번호 확인</label>
                </div>
                <div className='PasswordTabs_main_infoUpdate_input'>
                    <input
                        type="text"
                        id='password'
                        placeholder='비밀번호'
                        name="password"
                        value={password}
                        maxLength={150}
                        onChange={onChangePasswordInput}
                    />
                    <input
                        type="text"
                        id='passwordCheck'
                        placeholder='비밀번호 확인'
                        name="passwordCheck"
                        value={passwordCheck}
                        maxLength={150}
                        onChange={onChangePasswordInput}
                    />
                    <button
                        type="button"
                        onClick={handleChangeBtnClick}>
                        변경
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PasswordTabs;