const createPostCtrl = require("../controllers/createPostCtrl");
const router = require("express").Router();
const express = require('express');
const upload = require('../multerConfig'); // Multer 구성 불러오기
const path = require('path');

// 게시물 작성 팝업
router.route('/')
  .post(upload.array('postImage', 5), createPostCtrl.createPost)


module.exports = router;