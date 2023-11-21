import './CommentMore.css';

import { useDispatch } from "react-redux";
// 리덕스툴킷 수정함수 임포트
import { toogleCommentMore } from "../../store/store";

function CommentMore() {
    
    let dispatch = useDispatch();
    return (
        <div className="commentMore_popup">
            <div className="commentMore_btns">
                <button>신고</button>
                <button>삭제</button>
                <button
                    onClick={() => { dispatch(toogleCommentMore()) }}
                >취소</button>
            </div>
        </div>
    )
}


export default CommentMore;