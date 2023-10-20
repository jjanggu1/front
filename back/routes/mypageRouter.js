const mypageCtrl = require("../controllers/mypageCtrl");
const router = require("express").Router();

// 마이페이지 - 유저데이터, 게시물 데이터
router.route('/')
    .get(mypageCtrl.getUserData)

// 마이페이지 - 게시물 데이터
router.route('/getPostsData')
    .post(mypageCtrl.getUserPosts)


// 마이페이지 - 저장됨 데이터
router.route('/getSavedData')
    .post(mypageCtrl.getSavedData)

// 마이페이지 - 좋아요 데이터
router.route('/getLikedData')
    .post(mypageCtrl.getLikedData)



module.exports = router;