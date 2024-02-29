import './SavedTabs.css';

import PostModal from '../PostModal/PostModal';
import useOnClickOutside from '../../Hooks/useOnClickOutside';

import { RootState, tooglePostModal } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface SavedTabsProps {
    userId: {
        userId: string | null;
    };
}

interface PostsData {
    BRD_ID: number;
    BRD_WRITER: string;
    BRD_NICK: string;
    BRD_IMAGE1: string | null;
    BRD_IMAGE2: string | null;
    BRD_IMAGE3: string | null;
    BRD_IMAGE4: string | null;
    BRD_IMAGE5: string | null;
    BRD_CON: string;
    BRD_HASHTAG: string;
    BRD_CREATED_AT: string;
    BRD_COMMENT_OPEN: number;
    BRD_REPORT: number;
}

function SavedTabs(props: SavedTabsProps) {
    const BASE_URL = "http://localhost:4000";

    let mainPostModalVisible = useSelector((state: RootState) => state.mainPostModalVisible);
    let dispatch = useDispatch();

    // 글 모달 Ref
    const modalRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(modalRef, () => {
        // 모달 외부를 클릭했을 때 실행할 코드
        dispatch(tooglePostModal());
    }, mainPostModalVisible);

    // PostModal 컴포넌트에 전달할 글 ID
    const [postNum, setPostNum] = useState<number>(0);

    // 유저 아이디
    const userId = {
        userId: props.userId.userId
      };

    // 저장된 게시글 목록 데이터
    const [postsData, setPostsData] = useState<PostsData[]>([]);

    // 저장된 게시글 목록 요청 함수
    const fetchSavedData = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/mypage/getSavedData`, userId); //게시글 목록 요청
            const data = res.data;
            await setPostsData(data);

            return data; // 데이터 반환
        } catch (e) {
            console.error(e);
        }
    }

    //회원이 좋아요, 저장한 글 데이터
    const [userLikedSaved, setUserLikedSaved] = useState();

    // 회원이 좋아요, 저장한 글 데이터 요청
    const fetchLikedSaved = async () => {
        try {
            const userIdData = {
                userId: userId
            }
            if (userId === null) {
                return
            } else {
                const res = await axios.post(`${BASE_URL}/api/main/likedSaved`, userIdData);
                const data = res.data;

                setUserLikedSaved(data);

            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSavedData();
    }, [userId.userId]);

    return (
        <div className='savedTabs'>
            <div className='myPage_saved'>
                {postsData && postsData.map((item) => (
                    <button onClick={() => {
                        dispatch(tooglePostModal());
                        setPostNum(item.BRD_ID);
                    }} key={item.BRD_ID}>
                        <img src={`http://localhost:4000/postImg/${item.BRD_ID}/${item.BRD_IMAGE1}`} alt="이미지1" />
                    </button>
                ))}
            </div>
            {mainPostModalVisible && <PostModal postNum={postNum} rerenderLikedSaved={fetchLikedSaved} rerenderPostData={fetchSavedData} ref={modalRef} />}
        </div>
    )
}

export default SavedTabs;