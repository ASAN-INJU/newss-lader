// =======================================
// newss-lader
// 뉴스 + 검색어 기반 관련주 발굴 서버
// =======================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    fetchNews
} = require("./news-fetcher");
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
// 뉴스 검색 테스트 API
// 사용 예:
// /api/news?keyword=삼성전자
// =======================================

app.get(
    "/api/news",
    async (req, res) => {

        try {

            const keyword =
                req.query.keyword;

            if (!keyword) {

                return res.status(400).json({

                    success: false,

                    message:
                        "검색어를 입력해주세요."

                });

            }

            console.log(
                "NEWS REQUEST",
                keyword
            );


            const result =
                await fetchNews(
                    keyword
                );


            res.json(
                result
            );


        } catch (error) {

            console.log(
                "NEWS API ERROR",
                error.message
            );


            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }
);
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
