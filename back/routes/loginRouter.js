const loginCtrl = require("../controllers/loginCtrl");
const router = require("express").Router();

// 로그인페이지
router.route('/')
    .post(loginCtrl.checkLogin)



module.exports = router;