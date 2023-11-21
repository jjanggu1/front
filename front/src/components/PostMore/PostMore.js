import './PostMore.css';

import { useDispatch } from "react-redux";
// 리덕스툴킷 수정함수 임포트
import { tooglePostMore } from "../../store/store";

function PostMore() {
   
    let dispatch = useDispatch();
    return (
        <div className="postMore_popup">
            <div className="postMore_btns">
                <button>신고</button>
                <button>팔로우 취소</button>
                <button
                    onClick={() => { dispatch(tooglePostMore()) }}
                >취소</button>
            </div>
        </div>
    )
}


export default PostMore;