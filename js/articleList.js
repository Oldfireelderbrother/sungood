var Al = this;

(function () {
    var GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var type = GetQueryString('type');
    var articleId = GetQueryString('article')
    if (type == 0) {
        $('.articleTitle').text('热点资讯')
    } else if (type == 1) {
        $('.articleTitle').text('政策解读')
    }
    var pageNum = 1;
    var n = 0;
    var loadcontent = function (type, pageNum) {
        $.ajax({
            async: false,
            url: 'http://admin.isungood.com/web/article/getArticleList',
            type: 'GET',
            data: {
                type: type,
                pageNum: pageNum,
                pageSize: 3,
            },
            dataType: "jsonp",
            jsonpCallback: "callBack",
            success: function (res) {
                console.log(res);
                if (res.statusCode == 200) {
                    var list = res.data.list;
                    var item = $('.articleList')[0];
                    if (list.length < 3) {
                        $('#loadmore').css('display', 'none');
                        $('#nomore').css('display', 'block');
                    }
                    console.log(item);
                    for (var i in list) {
                        var title = list[i].title;
                        var readNum = list[i].readNum;
                        var addTime = list[i].addTime;
                        var headPic = list[i].headPic;
                        var id = list[i].id;
                        var data = new Date(addTime);
                        console.log(id);
                        var time = data.getFullYear() + '/' + (parseInt(data.getMonth()) + 1) + "/" + data.getDate();
                        console.log(time);
                        var author = list[i].author;
                        var i = '<a href="article.html?type=' + type + '&articleId=' + id + '"><li >' +
                            '<div class="atLine"></div>' +

                            '<div class="articleLitList">' +

                            '<img src="' + headPic + '" class="articleLitImg">' +

                            '<div class="articleLitListTitle">' +
                            '<span class="allt">' + title + '</span>' +
                            '<div>' +
                            '<span class="alltauthor">' + author + '</span>' +
                            '<span class="alltime">' + time + '</span>' +
                            '</div>' +
                            '<div class="watchBox">' +
                            '<img src="images/watch.png" class="watchIcon">' +
                            '<span class="atwatchNum">' + readNum + '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                        var div = document.createElement('div');
                        div.innerHTML = i;
                        var content = div.childNodes[0];
                        item.appendChild(content);


                    }

                }
                if(n == 0) {
                    console.log('hahah');
                    return moreArticle();
                }else {
                    return 1;
                }



            }
        });
    }
    loadcontent(type, pageNum);

    function testAuto(title, length) {

        var nowLeng = title.length;
        if (nowLeng > length) {
            var nowWord = title.substr(0, length) + '...';
        }
        else {
            var nowWord = title;
        }
        return nowWord;
    }

    var moreArticle = function () {
        n = 1;
        $.ajax({
            async: false,
            url: 'http://admin.isungood.com/web/article/findMoreArticle',
            type: 'GET',
            data: {
                pageSize: 5
            },
            dataType: "jsonp",
            jsonpCallback: "callBack",
            success: function (res) {
                console.log(res);
                if (res.statusCode == 200) {
                    var list = res.data;
                    console.log(list);
                    for (var i  in list) {
                        var title = testAuto(list[i].title, 14);
                        var id = list[i].id;
                        var type = list[i].type;
                        var i = '<a href="./article.html?type=' + type + '&articleId=' + id + '"><li>' + title + '</li></a>';
                        var item = $('.mAarticles')[0];
                        var div = document.createElement('div');
                        div.innerHTML = i;
                        var content = div.childNodes[0];
                        item.appendChild(content);
                    }
                }
            }
        });
    }
    $('#loadmore').click(function () {
        pageNum++;
        loadcontent(type, pageNum);
    })
})()
