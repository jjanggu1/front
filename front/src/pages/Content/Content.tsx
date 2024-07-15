import "./Content.css";

import PostMore from "../../components/PostMore/PostMore";
import PostModal from "../../components/PostModal/PostModal";
import CommentMore from "../../components/CommentMore/CommentMore";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import axios from "axios";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostComment from "./PostComment";

// 리덕스툴킷 수정함수 임포트
import { RootState } from "../../store/store";
import { tooglePostModal } from "../../store/store";

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
  BRD_COMMENT_OPEN: number;
  BRD_REPORT: number;
  BRD_CREATED_AT: string;
  USER_ID: string;
  USER_NICKNAME: string;
  USER_IMAGE: string;
  LIKED_COUNT: number;
}
interface PostUserIdData {
  userId: string | null;
  brdId: number | null;
}
interface CommentUserIdData {
  userId: string | null;
  comId: number | null;
}
interface CommentInfo {
  brdId: number | null;
  userId: string | null;
  userNick: string | null;
  comment: string;
}
interface UserLikedSaved {
  LIKED_NUM: number;
  LIKED_ID: string;
  LIKED_TIME: string;
  SAVED_NUM: number;
  SAVED_ID: string;
  SAVED_TIME: string;
}
interface CommentData {
  COM_ID: number;
  COM_NUM: number;
  COM_WRITER: string;
  COM_IMAGE: string;
  COM_CREATED_AT: string;
  COM_COMMENT: string;
  COM_REPORT: number;
  USER_NICKNAME: string;
  USER_IMAGE: string;
}
// BRD_ID를 키로 사용하여 댓글을 관리하는 데이터 구조의 타입 정의
interface CommentsData {
  [BRD_ID: number]: CommentData[];
}
function Content() {
  const BASE_URL = "http://localhost:4000";

  // 더보기 모달 Redux
  let mainPostMoreVisible = useSelector(
    (state: RootState) => state.mainPostMoreVisible
  );
  let mainPostModalVisible = useSelector(
    (state: RootState) => state.mainPostModalVisible
  );
  let mainCommentMoreVisible = useSelector(
    (state: RootState) => state.mainCommentMoreVisible
  );
  let dispatch = useDispatch();

  // 글 모달 Ref
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    modalRef,
    () => {
      // 모달 외부를 클릭했을 때 실행할 코드
      dispatch(tooglePostModal());
    },
    mainPostModalVisible
  );

  // PostModal 컴포넌트에 전달할 글 ID
  const [postNum, setPostNum] = useState<number | null>(0);

  // PostMore 컴포넌트에 전달할 ConText
  const [postUserIdData, setPostUserIdData] = useState<PostUserIdData>({
    userId: null, //해당 글의 USER_ID
    brdId: null, //해당 글의 BRD_ID
  });
  // PostMore 컴포넌트에 전달할 데이터 가져오는 함수
  const getPostUserIdData = (brdId: number, userId: string) => {
    setPostUserIdData({
      userId: userId,
      brdId: brdId,
    });
  };

  // CommentMore 컴포넌트에 전달할 ConText
  const [commentUserIdData, setCommentUserIdData] = useState<CommentUserIdData>(
    {
      userId: null, //해당 댓글의 USER_ID
      comId: null, //해당 댓글의 COM_ID
    }
  );
  // CommentMore 컴포넌트에 전달할 데이터 가져오는 함수
  const getCommentUserIdData = (comId: number, userId: string) => {
    setCommentUserIdData({
      userId: userId,
      comId: comId,
    });
  };

  // 로그인 여부 상태
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });

  // 게시글 목록 데이터 상태
  const [postsData, setPostsData] = useState<PostsData[]>([]);

  // 게시글 목록 요청 함수
  const fetchPostData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/main`); //게시글 목록 요청
      const data = res.data;
      await setPostsData(data);

      return data; // 데이터 반환
    } catch (e) {
      console.error(e);
    }
  };

  // 댓글 목록 데이터 상태
  const [commentsData, setCommentsData] = useState<CommentsData>({});

  // 댓글 데이터를 요청 함수
  const fetchCommentData = async () => {
    try {
      // 포스트 데이터를 가져와서 BRD_ID의 배열을 얻습니다.
      const postData = await fetchPostData();

      if (!postData) {
        console.error("게시글 데이터가 아직 설정되지 않았습니다.");
        return;
      }

      // 각 BRD_ID에 대해 댓글을 가져오기 위해 반복문을 사용합니다.
      for (const brdId of postData.map(
        (element: PostsData) => element.BRD_ID
      )) {
        const brdIdToObject = {
          brdId: brdId,
        };

        const res = await axios.post(
          `${BASE_URL}/api/main/comments`,
          brdIdToObject
        );
        const data = res.data;

        // commentsData 상태를 업데이트합니다.
        setCommentsData((prevCommentsData) => ({
          ...prevCommentsData,
          [brdId]: data,
        }));

        console.log(`댓글 데이터 (BRD_ID: ${brdId}):`, data);
      }
    } catch (error) {
      console.error("댓글 데이터 가져오기 실패", error);
    }
  };

  useEffect(() => {
    // 로그인 여부를 확인하고 상태를 업데이트
    setIsLoggedIn(localStorage.getItem("userId") !== null);

    fetchLikedSaved();
    fetchPostData();
    fetchCommentData();
  }, []);

  console.log("댓글 객체 : ", commentsData);

  //이미지 경로 동적생성
  const generateImagePaths = (
    brdId: number,
    ...imageNames: (string | null)[]
  ) => {
    return imageNames
      .filter((img) => img !== null)
      .map(
        (imageName) => `http://localhost:4000/postImg/${brdId}/${imageName}`
      );
  };

  //댓글 작성 로직
  //회원아아디, 닉네임 가져오기
  const userId = localStorage.getItem("userId");
  const userNick = localStorage.getItem("userNick");

  // 서버로 댓글추가 요청할 데이터
  const [commentInfo, setCommentInfo] = useState<CommentInfo>({
    brdId: null,
    userId: userId,
    userNick: userNick,
    comment: "",
  });

  // 댓글 input값 상태를 변경하는 함수
  const inputCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentInfo((prevComment) => ({
      ...prevComment,
      comment: event.target.value,
    }));
  };

  const getBrdId = (brdId: number) => {
    const newBrdId = brdId;
    setCommentInfo((prevCommentInfo) => ({
      ...prevCommentInfo,
      brdId: newBrdId,
    }));
  };

  // 댓글 추가 요청 함수
  const fetchAddComment = async () => {
    try {
      if (commentInfo.comment === "") {
        alert("댓글을 입력하세요.");
      } else {
        console.log("commentInfo : ", commentInfo);
        const res = await axios.post(
          `${BASE_URL}/api/main/insertComment`,
          commentInfo
        );
        const data = res.data;
        console.log(data);

        // 댓글입력 초기화
        setCommentInfo((prevComment) => ({
          ...prevComment,
          comment: "",
        }));

        fetchCommentData();
      }
    } catch (error) {
      console.error("댓글 추가 실패", error);
    }
  };

  //회원이 좋아요, 저장한 글 데이터
  const [userLikedSaved, setUserLikedSaved] = useState<UserLikedSaved[]>([]);

  // 회원이 좋아요, 저장한 글 데이터 요청
  const fetchLikedSaved = async () => {
    try {
      const userIdData = {
        userId: userId,
      };
      if (userId === null) {
        return;
      } else {
        const res = await axios.post(
          `${BASE_URL}/api/main/likedSaved`,
          userIdData
        );
        const data = res.data;

        setUserLikedSaved(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("좋아요, 저장한 글 데이터 요청 : ", userLikedSaved);

  // 좋아요 토글 함수
  const handleToggleLike = async (brdId: number) => {
    // 좋아요를 눌렀는지 확인
    const isLiked = userLikedSaved.some(
      (element) => element.LIKED_NUM === brdId
    );
    console.log("좋아요 여부 : ", isLiked);

    if (!isLiked) {
      await fetchAddLike(brdId);
    } else {
      await fetchRemoveLike(brdId);
    }

    // 좋아요 버튼 리렌더링
    fetchLikedSaved();
    // 게시글 목록 리렌더링(좋아요수 변경을 위함)
    fetchPostData();
  };

  // 회원의 좋아요 추가 요청
  const fetchAddLike = async (brdId: number) => {
    try {
      const addLikeData = {
        userId: userId,
        brdId: brdId,
      };
      if (userId === null) {
        alert("로그인 해주세요.");
      } else {
        const res = await axios.post(
          `${BASE_URL}/api/main/addLike`,
          addLikeData
        );
        const data = res.data.success;

        console.log("좋아요 요청 : ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 회원의 좋아요 삭제 요청
  const fetchRemoveLike = async (brdId: number) => {
    try {
      const removeLikeData = {
        userId: userId,
        brdId: brdId,
      };
      if (userId === null) {
        alert("로그인 해주세요.");
      } else {
        const res = await axios.post(
          `${BASE_URL}/api/main/removeLike`,
          removeLikeData
        );
        const data = res.data.success;

        console.log("좋아요 요청 : ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 저장글 토글 함수
  const handleToggleSave = async (brdId: number) => {
    // 글을 저장했는지 확인
    const isSaved = userLikedSaved.some(
      (element) => element.SAVED_NUM === brdId
    );
    console.log("글 저장 여부 : ", isSaved);

    if (!isSaved) {
      await fetchAddSave(brdId);
    } else {
      await fetchRemoveSave(brdId);
    }
    fetchLikedSaved();
  };

  // 회원의 저장글 추가 요청
  const fetchAddSave = async (brdId: number) => {
    try {
      const addSaveData = {
        userId: userId,
        brdId: brdId,
      };
      if (userId === null) {
        alert("로그인 해주세요.");
      } else {
        const res = await axios.post(
          `${BASE_URL}/api/main/addSave`,
          addSaveData
        );
        const data = res.data.success;

        console.log("글 저장 요청 : ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 회원의 저장글 삭제 요청
  const fetchRemoveSave = async (brdId: number) => {
    try {
      const removeSaveData = {
        userId: userId,
        brdId: brdId,
      };
      if (userId === null) {
        alert("로그인 해주세요.");
      } else {
        const res = await axios.post(
          `${BASE_URL}/api/main/removeSave`,
          removeSaveData
        );
        const data = res.data.success;

        console.log("글 저장 요청 : ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="content">
      <div className="posts">
        {postsData &&
          postsData.map((item) =>
            item.BRD_REPORT === 1 ? null : (
              <div className="post" key={item.BRD_ID}>
                <PostHeader
                  postData={item}
                  getPostUserIdData={getPostUserIdData}
                />
                <PostContent
                  postData={item}
                  userLikedSaved={userLikedSaved}
                  commentsData={commentsData}
                  handleToggleLike={handleToggleLike}
                  setPostNum={setPostNum}
                  handleToggleSave={handleToggleSave}
                  getCommentUserIdData={getCommentUserIdData}
                />
                <PostComment
                  postData={item}
                  isLoggedIn={isLoggedIn}
                  commentInfo={commentInfo}
                  inputCommentChange={inputCommentChange}
                  getBrdId={getBrdId}
                  fetchAddComment={fetchAddComment}
                />
              </div>
            )
          )}

        {mainPostModalVisible && (
          <PostModal
            postNum={postNum}
            rerenderLikedSaved={fetchLikedSaved}
            rerenderPostData={fetchPostData}
            ref={modalRef}
          />
        )}

        {mainPostMoreVisible && !mainPostModalVisible && (
          <PostMore value={{ postUserIdData, getPostData: fetchPostData }} />
        )}

        {mainCommentMoreVisible && !mainPostModalVisible && (
          <CommentMore
            value={{ commentUserIdData, getCommentData: fetchCommentData }}
          />
        )}
      </div>
    </div>
  );
}

export default Content;
