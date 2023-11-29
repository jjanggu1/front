import { configureStore, createSlice  } from '@reduxjs/toolkit'

//로그인여부
let isLoggedIn = createSlice({
    name: 'isLoggedIn',
    initialState: false,
    reducers : {
        setIsLoggedIn(state, action) {
            return action.payload;
        }
    }
})

// 마이페이지-----------------------------------
// 팔로워 팝업
let followerVisible = createSlice({
    name: 'followerVisible',
    initialState: false,
    reducers : {
        toggleFollower(state) {
            return !state;
        }
    }
})
// 팔로윙 팝업
let followingVisible = createSlice({
    name: 'followingVisible',
    initialState: false,
    reducers : {
        toggleFollowing(state) {
            return !state;
        }
    }
})
// 게시글 작성 팝업
let createPostVisible = createSlice({
    name: 'createPostVisible',
    initialState: false,
    reducers : {
        toggleCreatePost(state) {
            return !state;
        }
    }
})

// 게시물&저장됨%좋아요탭 상태
let contentsVisible = createSlice({
    name: 'contentsVisible',
    initialState: "post",
    reducers : {
        chooseTabs(state, action) {
            return action.payload;
        }
    }
})
// 마이페이지 끝-----------------------------------
// 회원정보 수정 페이지-----------------------------------

// 회원정보 수정 탭 상태
let updateUserTabsVisible = createSlice({
    name: 'updateUserTabsVisible',
    initialState: "profile",
    reducers : {
        chooseUpdateUserTabs(state, action) {
            return action.payload;
        }
    }
})
// 회원정보 수정 페이지 끝-----------------------------------
// 메인 페이지-----------------------------------

// 게시글 더보기 팝업
let mainPostMoreVisible = createSlice({
    name: 'mainPostMoreVisible',
    initialState: false,
    reducers : {
        tooglePostMore(state) {
            return !state;
        }
    }
})

// 게시글 상세 모달
let mainPostModalVisible = createSlice({
    name: 'mainPostModalVisible',
    initialState: false,
    reducers : {
        tooglePostModal(state) {
            return !state;
        }
    }
})

// 댓글 더보기 팝업
let mainCommentMoreVisible = createSlice({
    name: 'mainCommentMoreVisible',
    initialState: false,
    reducers : {
        toogleCommentMore(state) {
            return !state;
        }
    }
})
// 메인 페이지 끝-----------------------------------


export let { setIsLoggedIn } = isLoggedIn.actions

export let { toggleFollower } = followerVisible.actions
export let { toggleFollowing } = followingVisible.actions
export let { toggleCreatePost } = createPostVisible.actions
export let { chooseTabs } = contentsVisible.actions

export let { chooseUpdateUserTabs } = updateUserTabsVisible.actions

export let { tooglePostMore } = mainPostMoreVisible.actions
export let { tooglePostModal } = mainPostModalVisible.actions
export let { toogleCommentMore } = mainCommentMoreVisible.actions


export default configureStore({
	reducer: {
    	isLoggedIn: isLoggedIn.reducer,
    	followerVisible: followerVisible.reducer,
        followingVisible: followingVisible.reducer,
        createPostVisible: createPostVisible.reducer,
        contentsVisible: contentsVisible.reducer,
        updateUserTabsVisible: updateUserTabsVisible.reducer,
        mainPostMoreVisible: mainPostMoreVisible.reducer,
        mainPostModalVisible: mainPostModalVisible.reducer,
        mainCommentMoreVisible: mainCommentMoreVisible.reducer,
    },
});