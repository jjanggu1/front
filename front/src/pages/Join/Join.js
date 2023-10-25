import './Join.css';

function Join() {
    return (
        <div className="join">
            <div className='join_main'>
                <div className='join_main_logo'>
                    <span>memories</span>
                </div>
                <div className='join_main_googlejoin'>
                    <a href="/">
                        <i class="fa-brands fa-google"></i>
                        Google로 로그인</a>
                </div>
                <div className='join_main_division'>
                    <div className='division'></div>
                    <span>또는</span>
                    <div className='division'></div>
                </div>
                <div className='join_main_input'>
                    <input type="text" id='id' placeholder='아이디' maxLength={30} />
                    <input type="password" id='password' placeholder='비밀번호' maxLength={150} />
                    <input type="password" id='passwordCheck' placeholder='비밀번호 확인' maxLength={150} />
                    <input type="text" id='email' placeholder='이메일' maxLength={30} />
                    <input type="text" id='name' placeholder='이름' maxLength={24} />
                    <input type="text" id='nick' placeholder='별명' maxLength={24} />
                    <input type="text" id='phone' placeholder='전화번호' maxLength={13} />
                </div>
                <div className='join_main_submit'>
                    <input type="submit" value={"가입"} />
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