// =======================================
// newss-lader
// 뉴스 + 검색어 기반 관련주 발굴 서버
// =======================================

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

/api/radar
      ↓
뉴스 키워드
      +
검색어 키워드
      ↓
관련 종목
      ↓
뉴스레이더 결과
// =======================================
// 뉴스레이더
// 뉴스 → 관련 종목 자동 검색
// =======================================

const stocks =
    require("./stocks.json");


// =======================================
// 뉴스 제목에서 종목 찾기
// =======================================

function findRelatedStocks(news) {

    const result = [];

    for (
        const stock of stocks
    ) {

        let matchedCount = 0;

        for (
            const item of news
        ) {

            const title =
                item.title || "";

            if (
                title.includes(
                    stock.name
                )
            ) {

                matchedCount++;

            }

        }


        if (
            matchedCount > 0
        ) {

            result.push({

                code:
                    stock.code,

                name:
                    stock.name,

                newsCount:
                    matchedCount

            });

        }

    }


    // 뉴스가 많이 나온 종목부터 정렬

    result.sort(

        (a, b) =>

            b.newsCount -
            a.newsCount

    );


    return result.slice(
        0,
        5
    );

}


// =======================================
// 뉴스레이더 API
//
// 사용:
// /api/radar?keyword=반도체
// =======================================

app.get(
    "/api/radar",
    async (req, res) => {

        try {

            const keyword =
                req.query.keyword ||
                "한국 주식";

            console.log(
                "RADAR REQUEST",
                keyword
            );


            // 뉴스 수집

            const newsResult =
                await fetchNews(
                    keyword
                );


            if (
                !newsResult.success
            ) {

                return res.status(
                    500
                ).json({

                    success:
                        false,

                    message:
                        "뉴스 수집 실패"

                });

            }


            // 관련 종목 찾기

            const relatedStocks =
                findRelatedStocks(
                    newsResult.news
                );


            res.json({

                success:
                    true,

                keyword:
                    keyword,

                news:
                    newsResult.news.slice(
                        0,
                        5
                    ),

                relatedStocks:
                    relatedStocks

            });


        } catch (error) {

            console.log(

                "RADAR ERROR",

                error.message

            );


            res.status(
                500
            ).json({

                success:
                    false,

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
