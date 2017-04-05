export default {
    //滚动条在Y轴上的滚动距离  
    getScrollTop() {　　
            var scrollTop = 0,
                bodyScrollTop = 0,
                documentScrollTop = 0;　　
            if (document.body) {　　　　 bodyScrollTop = document.body.scrollTop;　　 }　　
            if (document.documentElement) {　　　　 documentScrollTop = document.documentElement.scrollTop;　　 }　　
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            //console.log('滚动条在Y轴上的滚动距离',scrollTop);
            　　
            return scrollTop;
        },
        //文档的总高度 
        getScrollHeight() {　　
            var scrollHeight = 0,
                bodyScrollHeight = 0,
                documentScrollHeight = 0;　　
            if (document.body) {　　　　 bodyScrollHeight = document.body.scrollHeight;　　 }　　
            if (document.documentElement) {　　　　 documentScrollHeight = document.documentElement.scrollHeight;　　 }　　
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            //console.log('文档的总高度:',scrollHeight);
            　　
            return scrollHeight;
        },
        //浏览器视口的高度 
        getWindowHeight() {　　
            var windowHeight = 0;　　
            if (document.compatMode == "CSS1Compat") {　　　　 windowHeight = document.documentElement.clientHeight;　　 } else {　　　　 windowHeight = document.body.clientHeight;　　 }
            //console.log('浏览器视口的高度',windowHeight)
            　　
            return windowHeight;
        }
}
