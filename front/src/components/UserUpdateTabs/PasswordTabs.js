import './PasswordTabs.css';

function PasswordTabs() {
    return(
        <div className='PasswordTabs_main'>
            <div className='PasswordTabs_main_infoUpdate'>
                <div className='PasswordTabs_main_infoUpdate_label'>
                    <label htmlFor="password">비밀번호</label>
                    <label htmlFor="passwordCheck">비밀번호 확인</label>
                </div>
                <div className='PasswordTabs_main_infoUpdate_input'>
                    <input type="text" id='password' placeholder='비밀번호' />
                    <input type="text" id='passwordCheck' placeholder='비밀번호 확인' />

                    <input type="submit" value={"변경"} />
                </div>
            </div>
        </div>
    )
}

export default PasswordTabs;