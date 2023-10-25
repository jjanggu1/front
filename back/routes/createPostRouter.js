const createPostCtrl = require("../controllers/createPostCtrl");
const router = require("express").Router();

// 게시물 작성 팝업
router.route('/')
    .post(createPostCtrl.createPost)

   

module.exports = router;