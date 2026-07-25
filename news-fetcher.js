// =======================================
// newss-lader
// 뉴스 수집 모듈
// RSS 기반 안정화 버전
// =======================================

const axios = require("axios");


// =======================================
// 뉴스 수집
// =======================================

async function fetchNews(keyword) {

    try {

        console.log(
            "NEWS REQUEST",
            keyword
        );


        // -----------------------------------
        // 네이버 뉴스 RSS
        // -----------------------------------

        const url =
            "https://news.google.com/rss/search";


        const response =
            await axios.get(
                url,
                {

                    params: {

                        q:
                            keyword,

                        hl:
                            "ko",

                        gl:
                            "KR",

                        ceid:
                            "KR:ko"

                    },

                    headers: {

                        "User-Agent":
                            "Mozilla/5.0"

                    },

                    timeout:
                        10000

                }
            );


        const xml =
            response.data;


        // -----------------------------------
        // RSS item 추출
        // -----------------------------------

        const itemRegex =
            /<item>([\s\S]*?)<\/item>/g;


        const titleRegex =
            /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/;


        const linkRegex =
            /<link>(.*?)<\/link>/;


        const pubDateRegex =
            /<pubDate>(.*?)<\/pubDate>/;


        const news = [];


        let itemMatch;


        while (
            (itemMatch =
                itemRegex.exec(xml)) !== null
        ) {

            const item =
                itemMatch[1];


            const titleMatch =
                item.match(
                    titleRegex
                );


            const linkMatch =
                item.match(
                    linkRegex
                );


            const dateMatch =
                item.match(
                    pubDateRegex
                );


            const title =
                titleMatch
                    ? (
                        titleMatch[1]
                        ||
                        titleMatch[2]
                    )
                    : "";


            const link =
                linkMatch
                    ? linkMatch[1]
                    : "";


            const pubDate =
                dateMatch
                    ? dateMatch[1]
                    : "";


            if (
                title &&
                link
            ) {

                news.push({

                    title:
                        title.trim(),

                    link:
                        link.trim(),

                    pubDate:
                        pubDate.trim()

                });

            }


            // 최대 10개

            if (
                news.length >= 10
            ) {

                break;

            }

        }


        console.log(

            "NEWS FETCH RESULT",

            keyword,

            news.length

        );


        return {

            success:
                true,

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

            success:
                false,

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
