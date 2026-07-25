// =======================================
// newss-lader
// 실제 뉴스 수집 모듈
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
            await axios.get(
                url,
                {

                    params: {

                        where: "news",

                        query: keyword

                    },

                    headers: {

                        "User-Agent":
                            "Mozilla/5.0"

                    },

                    timeout:
                        10000

                }
            );


        const html =
            response.data;


        // -----------------------------------
        // 뉴스 제목 추출
        // -----------------------------------

        const titleRegex =
            /<a[^>]*class="[^"]*news_tit[^"]*"[^>]*title="([^"]*)"[^>]*href="([^"]*)"/g;


        const news = [];


        let match;


        while (
            (match =
                titleRegex.exec(html)) !== null
        ) {

            news.push({

                title:
                    match[1],

                link:
                    match[2]

            });


            // 최대 10개
            if (
                news.length >= 10
            ) {

                break;

            }

        }


        console.log(

            "NEWS FETCH SUCCESS",

            keyword,

            news.length

        );


        return {

            success: true,

            keyword:

                keyword,

            count:

                news.length,

            news:

                news

        };


    } catch (error) {

        console.log(

            "NEWS FETCH ERROR",

            error.message

        );


        return {

            success: false,

            keyword:

                keyword,

            count:

                0,

            news:

                [],

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
