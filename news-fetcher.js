// =======================================
// newss-lader
// 뉴스 수집 모듈
// =======================================

const axios = require("axios");


// =======================================
// 네이버 뉴스 검색
// =======================================

async function fetchNews(keyword) {

    try {

        const url =
            "https://search.naver.com/search.naver";

        const response =
            await axios.get(url, {

                params: {

                    where: "news",

                    query: keyword

                },

                headers: {

                    "User-Agent":
                        "Mozilla/5.0"

                }

            });


        // -----------------------------------
        // 현재는 연결 테스트 단계
        // -----------------------------------

        console.log(
            "NEWS FETCH SUCCESS",
            keyword
        );


        return {

            success: true,

            keyword: keyword,

            message:
                "뉴스 검색 연결 성공"

        };


    } catch (error) {

        console.log(

            "NEWS FETCH ERROR",

            error.message

        );


        return {

            success: false,

            keyword: keyword,

            message:
                error.message

        };

    }

}


// =======================================
// 외부 사용
// =======================================

module.exports = {

    fetchNews

};
