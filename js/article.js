(function(){
    var GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var id = GetQueryString('articleId');
    var type = GetQueryString('type')
    console.log(type);
    if(type == 0) {
        $('#moduleName').text('热点资讯');
        $('#module').attr('href','./articleList.html?type='+type)
    }else if(type == 1) {
        $('#moduleName').text('政策解读');
        $('#module').attr('href','./articleList.html?type='+type)
    }
    $.ajax({
        async: false,
        url:'http://admin.isungood.com/web/article/getArticleById',
        type: 'GET',
        data:{
          id:id,
        },
        dataType: "jsonp",
        jsonpCallback: "callBack",
        success: function(res) {
            console.log(res);
            if(res.statusCode == 200 ) {
                var content = res.data.content;
                var author = res.data.author;
                var readNum = res.data.readNum;
                var remark = res.data.remark;
                var title = res.data.title;
                var addTime = res.data.addTime;
                var nextArticleId = res.data.nextArticleId;
                var lastArticleId = res.data.lastArticleId;
                var nextArticleTitle = res.data.nextArticleTitle;
                var lastArticleTitle = res.data.lastArticleTitle;
                console.log(nextArticleId);
                if(lastArticleId == undefined){
                    $('.prevAt').css('display','none');
                }else {
                    $('.prevAt').text("上一篇:"+lastArticleTitle);
                    $('.prevAt').on('click',function(){
                        window.location.href='./article.html?type='+type+'&articleId='+lastArticleId;
                    })
                }
                if(nextArticleId == undefined){
                    $('.nextAt').css('display','none');
                }else {
                    $('.nextAt').text("下一篇:"+nextArticleTitle);
                    $('.nextAt').on('click',function(){
                        window.location.href='./article.html?type='+type+'&articleId='+nextArticleId;
                    })
                }

                var data = new Date(addTime);
                var time = data.getFullYear()+'/'+(parseInt(data.getMonth())+1)+"/"+data.getDate();
                $('.articleTitle')[0].textContent = title;
                $('.artAuthor')[0].textContent = author;
                $('.artMeg')[0].textContent = remark;
                $('.watchNum')[0].textContent = readNum;
                $('.artTime')[0].textContent = time;


                var para = document.getElementById('content');
                var div = document.createElement('div');
                div.innerHTML = content;
                var content1 = div.childNodes[0];
                console.log(content1);
                para.appendChild(div);
            }
            return moreArticle();
        }
    });
    function testAuto(title,length){

        var nowLeng = title.length;
        if(nowLeng > length){
            var nowWord = title.substr(0,length)+'...';
        }
        else{
            var nowWord = title;
        }
        return nowWord;
    }
    var moreArticle = function () {
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
                    for(var i  in list) {
                        var title = testAuto(list[i].title,14);
                        var id = list[i].id;
                        var type = list[i].type;
                        var i = '<a href="./article.html?type='+type+'&articleId='+id+'"><li>'+title+'</li></a>';
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
})()