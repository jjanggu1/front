const mainCtrl = require("../controllers/mainCtrl");
const router = require("express").Router();

// 메인페이지 - 게시글목록
router.route('/')
    .get(mainCtrl.getMainPostData)

// 메인페이지 - 해당 글의 댓글
router.route('/comments')
    .post(mainCtrl.getMainPostComment)

// 메인페이지 - 현재 로그인된 회원 이미지 
router.route('/crrUserImg')
    .post(mainCtrl.getMainUserImg)

// 메인페이지 - 현재 로그인된 회원이 좋아요,저장한 글 데이터
router.route('/likedSaved')
    .post(mainCtrl.getMainLikedSaved)

// 메인페이지 - 현재 로그인된 회원의 좋아요 추가
router.route('/addLike')
    .post(mainCtrl.addLike)

// 메인페이지 - 현재 로그인된 회원의 좋아요 삭제
router.route('/removeLike')
    .post(mainCtrl.removeLike)

// 메인페이지 - 현재 로그인된 회원의 저장글 추가
router.route('/addSave')
    .post(mainCtrl.addSave)

// 메인페이지 - 현재 로그인된 회원의 저장글 삭제
router.route('/removeSave')
    .post(mainCtrl.removeSave)

// 메인페이지 - 해당 글의 댓글 작성
router.route('/insertComment')
    .post(mainCtrl.insertMainComment)


module.exports = router;