const updateProfileCtrl = require("../controllers/updateProfileCtrl");
const router = require("express").Router();

// 프로필수정 페이지 - 프로필 수정
router.route('/')
    .post(updateProfileCtrl.updateUserData)


// 프로필수정 페이지 - 비밀번호 수정
router.route('/password')
    .post(updateProfileCtrl.updatePassword)


module.exports = router;