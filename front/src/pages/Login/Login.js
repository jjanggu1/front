import './Login.css';

function Login() {
    return (
        <div className="login">
            <div className='login_main'>
                <div className='login_main_logo'>
                    <span>memories</span>
                </div>
                <div className='login_main_input'>
                    <input type="text" placeholder='이메일' />
                    <input type="password" placeholder='비밀번호' />
                </div>
                <div className='login_main_submit'>
                    <input type="submit" value={"로그인"} />
                </div>
                <div className='login_main_division'>
                    <div className='division'></div>
                    <span>또는</span>
                    <div className='division'></div>
                </div>
                <div className='login_main_googleLogin'>
                    <a href="/">
                        <i class="fa-brands fa-google"></i>
                        Google로 로그인</a>
                </div>
                <div className='login_main_forgetPw'>
                    <a href="/">비밀번호를 잊으셨나요?</a>
                </div>
            </div>
            <div className='login_sub'>
                <a href="/" className='login_sub_join'>
                    <span>계정이 없으신가요?</span>
                    <span>가입하기</span>
                </a>
            </div>
        </div>
    )

}

export default Login;