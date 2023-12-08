const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = 4000; // 포트번호 설정

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // post 요청 시 값을 객체로 바꿔줌
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/profileImg', express.static('uploads/profile'));
app.use('/postImg', express.static('uploads/post'));

app.use('/api/mypage', require('./routes/mypageRouter'));
app.use('/api/login', require('./routes/loginRouter'));
app.use('/api/createPost', require('./routes/createPostRouter'));
app.use('/api/main', require('./routes/mainRouter'));
app.use('/api/updateProfile', require('./routes/updateProfileRouter'));
app.use('/api/profileImg', require('./routes/updateProfileImgRouter'));
app.use('/api/join', require('./routes/joinRouter'));


app.listen(port, () => {
  console.log(`Server listning on port : ${port}`);
});