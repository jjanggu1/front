const updateProfileCtrl = require("../controllers/updateProfileCtrl");
const router = require("express").Router();

// 프로필수정 페이지 - 프로필 수정
router.route('/')
    .patch(updateProfileCtrl.updateUserData)


// 프로필수정 페이지 - 비밀번호 수정
router.route('/password')
    .patch(updateProfileCtrl.updatePassword)


module.exports = router;