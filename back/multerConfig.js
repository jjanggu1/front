const multer = require("multer");
const path = require("path");
const fs = require('fs');

let dynamicDestination;

// 함수를 통해 동적으로 destination 설정
const setDynamicDestination = (destination) => {
  dynamicDestination = destination;
};

// 파일을 저장할 디렉토리 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    if (file.fieldname === "profileImage") {
      uploadPath = "uploads/profile"; // 프로필 이미지 저장 경로
    } else if (file.fieldname === "postImage") {
      if (dynamicDestination) {
        uploadPath = dynamicDestination; // 동적으로 설정된 경로 사용
      } else {
        uploadPath = "uploads/post/default/"; // 기본 경로
      }
    } else {
      uploadPath = "uploads/default"; // 기본 이미지 저장 경로
    }

    // 디렉토리가 존재하지 않으면 생성
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // 파일 이름 설정
  },
});

// 이미지 파일 확인
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("허용되지 않는 파일 형식입니다");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }

  cb(null, true);
};

const multerConfig = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 10000000, // 파일 사이즈 10MB로 제한
  },
});

// setDynamicDestination 함수를 외부에서 호출할 수 있도록 export
multerConfig.setDynamicDestination = setDynamicDestination;

module.exports = multerConfig;
