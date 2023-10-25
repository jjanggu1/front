const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // post 요청 시 값을 객체로 바꿔줌
app.use(express.json());
app.use(cors());

const port = 4000; // 포트번호 설정

app.listen(port, () => {
    console.log(`Server listning on port : ${port}`);
});

app.use('/api/movie', require('./routes/movieRouter'));
app.use('/api/mypage', require('./routes/mypageRouter'));
app.use('/api/login', require('./routes/loginRouter'));
app.use('/api/createPost', require('./routes/createPostRouter'));
app.use('/api/main', require('./routes/mainRouter'));
app.use('/api/updateProfile', require('./routes/updateProfileRouter'));
app.use('/api/join', require('./routes/joinRouter'));