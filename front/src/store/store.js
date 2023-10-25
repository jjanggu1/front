import { configureStore, createSlice  } from '@reduxjs/toolkit'

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

// 게시물&저장됨%좋아요 상태
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



export let { toggleFollower } = followerVisible.actions
export let { toggleFollowing } = followingVisible.actions
export let { toggleCreatePost } = createPostVisible.actions
export let { chooseTabs } = contentsVisible.actions


export default configureStore({
	reducer: {
    	followerVisible: followerVisible.reducer,
        followingVisible: followingVisible.reducer,
        createPostVisible: createPostVisible.reducer,
        contentsVisible: contentsVisible.reducer,
    },
});