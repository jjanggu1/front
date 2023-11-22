import './PostMore.css';

import { useDispatch } from "react-redux";
// 리덕스툴킷 수정함수 임포트
import { tooglePostMore } from "../../store/store";
import { useContext } from 'react';

import { MyContext } from '../../context/context';

function PostMore() {
    // Content 컴포넌트에서 받은 value값
    const cValue = useContext(MyContext);

    let dispatch = useDispatch();
    return (
        <div className="postMore_popup">
            <div className="postMore_btns"></div>
                <button>신고</button>
                <button>팔로우 취소</button>
                <button
                    onClick={() => { dispatch(tooglePostMore()) }}
                >취소</button>
                <span>{cValue}</span>
            </div>
        </div>
    )
}


export default PostMore;