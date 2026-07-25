// =======================================
// newss-lader
// 뉴스 + 검색어 기반 관련주 발굴 서버
// =======================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


// =======================================
// 기본 설정
// =======================================

app.use(cors());
app.use(express.json());

const PORT =
    process.env.PORT || 10000;


// =======================================
// 서버 확인
// =======================================

app.get("/", (req, res) => {

    res.send(
        "newss-lader Server Running"
    );

});


// =======================================
// 테스트 API
// =======================================

app.get("/api/test", (req, res) => {

    res.json({

        success: true,

        message:
            "newss-lader API 정상 작동",

        service:
            "뉴스 + 검색어 관련주 발굴 시스템"

    });

});


// =======================================
// 서버 시작
// =======================================

app.listen(
    PORT,
    () => {

        console.log(
            `newss-lader Server Running ${PORT}`
        );

    }
);
