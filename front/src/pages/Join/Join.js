import './Join.css';

import { useRef, useState } from 'react';
import axios from 'axios';

function Join() {
    //비밀번호 유효성 검사
    const [matchPassword, setMatchPassword] = useState(false);
    const [isPasswordCheck, setIsPasswordCheck] = useState(false);

    let passwordRef = useRef(""); //비밀번호
    let passwordCheckRef = useRef(""); //비밀번호 확인

    // 비밀번호 확인 값이 존재하는지 체크
    const hasValuePasswordCheck = () => {
        passwordCheckRef.current.value ? setIsPasswordCheck(true) : setIsPasswordCheck(false);
    }
    // 비밀번호와 비밀번호확인 값이 일치하는지 체크
    const okPasswordCheck = () => {
        let pw = passwordRef.current.value;
        let pwCheck = passwordCheckRef.current.value;
        if (pw && pwCheck) {
            pw === pwCheck ? setMatchPassword(true) : setMatchPassword(false);
        } else {
            setMatchPassword(false);
        }
        console.log("비번,비번확인 일치여부", matchPassword);
    }

    //회원가입 서버통신
    const BASE_URL = "http://localhost:4000";

    const [userData, setuserData] = useState({
        id: '',
        password: '',
        passwordCheck: '',
        email: '',
        name: '',
        nick: '',
        phone: '',
    });
    const { id, password, passwordCheck, email, name, nick, phone } = userData;

    const handleChange = (e) => {
        const { value, name } = e.target;

        setuserData({
            ...userData,
            [name]: value,
        });
        console.log(userData);
    };

    const joinForm = async () => {
        console.log(userData);
        try {
            const res = await axios.post(`${BASE_URL}/api/join`, userData);
            const data = res.data;

            if (data.success === true) {
                alert("회원가입에 성공하였습니다.");
                window.location.href = "/login";
            } else {
                alert("회원가입에 실패하였습니다.");
            }

        } catch (error) {
            console.error('에러발생 : ', error);
        }
    }
    return (
        <div className="join">
            <div className='join_main'>
                <div className='join_main_logo'>
                    <span>memories</span>
                </div>
                <div className='join_main_googlejoin'>
                    <a href="/">
                        <i className="fa-brands fa-google"></i>
                        Google로 로그인</a>
                </div>
                <div className='join_main_division'>
                    <div className='division'></div>
                    <span>또는</span>
                    <div className='division'></div>
                </div>
                <form className='join_main_input'>
                    <input
                        type="text"
                        id="id"
                        name='id'
                        placeholder="아이디"
                        maxLength={30}
                        value={id}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        id="password"
                        name='password'
                        placeholder="비밀번호"
                        maxLength={150}
                        ref={passwordRef}
                        value={password}
                        onChange={handleChange}
                    />
                    <input type="password" id='passwordCheck' name='passwordCheck' placeholder='비밀번호 확인' maxLength={150} ref={passwordCheckRef} value={passwordCheck} onChange={
                        (e) => {
                            okPasswordCheck();
                            hasValuePasswordCheck();
                            handleChange(e); // 여기서 이벤트 객체 e를 전달
                        }} />
                    {matchPassword === false && isPasswordCheck === true ? (
                        <span id="error">비밀번호가 일치하지 않습니다.</span>
                    ) : null}

                    <input
                        type="text"
                        id="email"
                        name='email'
                        placeholder="이메일"
                        maxLength={30}
                        value={email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="name"
                        name='name'
                        placeholder="이름"
                        maxLength={24}
                        value={name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="nick"
                        name='nick'
                        placeholder="별명"
                        maxLength={24}
                        value={nick}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="phone"
                        name='phone'
                        placeholder="전화번호"
                        maxLength={13}
                        value={phone}
                        onChange={handleChange}
                    />
                </form>
                <div className='join_main_submit'>
                    <input type="submit" value={"가입"}
                        onClick={joinForm} />
                </div>
            </div>
            <div className='join_sub'>
                <a href="/login" className='join_sub_join'>
                    <span>계정이 있으신가요?</span>
                    <span>로그인</span>
                </a>
            </div>
        </div>
    )
}

export default Join;