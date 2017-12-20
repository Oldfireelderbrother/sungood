// Bmob.initialize("46f2060ea2c4c94ee2b13a2406259153", "e44bf4e2278676417180492571813b4e");
var api = 'http://47.96.156.228/';

((function(){

    $.ajax({
        async: true,
        url:'http://admin.isungood.com/web/banner/getBannerList',
        type: 'GET',
        dataType: "jsonp",
        jsonpCallback: "callBack",
        success: function(res) {
            console.log(res);
            var arr = [];
            if(res.statusCode == 200 ) {
                console.log(res.data);

                for (var i in res.data){
                    var url = res.data[i].pic;
                    var toUrl = res.data[i].url;
                    var paras = document.getElementsByClassName('swiper-slide');
                    var item = paras[0]
                    item.firstElementChild.href = toUrl;
                    item.firstElementChild.firstElementChild.src = url
                    console.log(item.firstElementChild.outerHTML);
                    var i = '<div class="swiper-slide">'+item.firstElementChild.outerHTML+'</div>';
                    mySwiper.appendSlide(i);
                }

            }
        return hot();
        }
    });

      var hot =  function(){

      $.ajax({
            async: false,
            url: 'http://admin.isungood.com/web/article/getArticleList',
            type: 'GET',
            data: {
                type: 0,
                pageNum: 1,
                pageSize: 5,
            },
            dataType: "jsonp",
            jsonpCallback: "callBack",
            success: function (res) {

                if (res.statusCode == 200) {
                    var list = res.data.list;
                    var item = $('#hot')[0];
                    console.log(item);
                    for (var i in list) {
                        var title = list[i].title;
                        var readNum = list[i].readNum;
                        var addTime = list[i].addTime;
                        var id = list[i].id;
                        var data = new Date(addTime);
                        console.log(id);
                        var time = (parseInt(data.getMonth())+1)+"/"+data.getDate();
                        console.log(time);
                        var author = list[i].author;
                        var i = '<li class="contentItem">'+
                            '<div style="width:4px;height:4px;background-color: #F55151;float: left;margin-top: 25px;margin-left:15px;"> </div>'+
                            '<a href="article.html?type=0&articleId='+id+'"><span class="contenItemTitle">'+title+'</span></a>'+
                        '<div class="contenItemLitTitleBox">'+
                            '<span class="contenItemLitTitle">'+author+'</span>'+
                            '<span class="contenItemLitTitle">'+time+'</span>'+
                            '</div>'+
                            '</li>'
                        var div = document.createElement('div');
                        div.innerHTML = i;
                        var content = div.childNodes[0];
                        item.appendChild(content);

                    }

                }
                return read();
            }
        });
      }

    var read =  function(){

      $.ajax({
            async: false,
            url: 'http://admin.isungood.com/web/article/getArticleList',
            type: 'GET',
            data: {
                type: 1,
                pageNum: 1,
                pageSize: 5,
            },
            dataType: "jsonp",
            jsonpCallback: "callBack",
            success: function (res) {
                console.log(res);
                if (res.statusCode == 200) {
                    var list = res.data.list;
                    var item = $('#read')[0];
                    for (var i in list) {
                        var title = list[i].title;
                        var readNum = list[i].readNum;
                        var addTime = list[i].addTime;
                        var id = list[i].id;
                        var data = new Date(addTime);
                        console.log(id);
                        var time = (parseInt(data.getMonth())+1)+"/"+data.getDate();
                        console.log(time);
                        var author = list[i].author;
                        var i = '<li class="contentItem">'+
                            '<div style="width:4px;height:4px;background-color: #F55151;float: left;margin-top: 25px;margin-left:15px;"> </div>'+
                            '<a href="article.html?type=1&articleId='+id+'"><span class="contenItemTitle">'+title+'</span></a>'+
                            '<div class="contenItemLitTitleBox">'+
                            '<span class="contenItemLitTitle">'+author+'</span>'+
                            '<span class="contenItemLitTitle">'+time+'</span>'+
                            '</div>'+
                            '</li>'
                        var div = document.createElement('div');
                        div.innerHTML = i;
                        var content = div.childNodes[0];
                        item.appendChild(content);

                    }

                }

            }
        });
      }
    //loadContentHot(0,1);
    // $.when(loadContentHot).done(function() {
    //     loadContentRead(1,1);
    // })

    // loadcontent(1,1,'read')
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper

        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        // 如果需要分页器
        pagination: '.swiper-pagination',
        paginationClickable:true,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

    })

    // var bannar = Bmob.Object.extend("course");
    // var query = new Bmob.Query(bannar);
    // var bannar1 = Bmob.Object.extend("bannar");
    // var query1 = new Bmob.Query(bannar1);
    // query.find( {
    //     success: function(object) {
    //         // The object was retrieved successfully.
    //         console.log(object);
    //         var item = object[0];
    //         var item1 = object[1];
    //         var item2 = object[2];
    //         var des = item.get('descibe');
    //         var des1 = item1.get('descibe');
    //         var des2 = item2.get('descibe');
    //         var courseName = item.get('courseName');
    //         var courseName1 = item1.get('courseName');
    //         var courseName2 = item2.get('courseName');
    //         var price = item.get('price');
    //         var price1 = item1.get('price');
    //         var price2 = item2.get('price');
    //         var arr = des.split(",");
    //         var arr1 = des1.split(",");
    //         var arr2 = des2.split(",");
    //         $('#course_1').find('h3').text(courseName);
    //         $('#course_2').find('h3').text(courseName1);
    //         $('#course_3').find('h3').text(courseName2);
    //         $('#course_1').find('.price').text(price)
    //         $('#course_2').find('.price').text(price1)
    //         $('#course_3').find('.price').text(price2)
    //         var length = $('#des1 li').length;
    //         for(var i = 0 ; i < length  ; i++){
    //             var lis = $('#des1 li')[i].textContent = arr[i];
    //         }
    //
    //         var length = $('#des2 li').length;
    //         for(var i = 0 ; i < length  ; i++){
    //             var lis = $('#des2 li')[i].textContent = arr1[i];
    //         }
    //
    //         var length = $('#des3 li').length;
    //         for(var i = 0 ; i < length  ; i++){
    //             var lis = $('#des3 li')[i].textContent = arr2[i];
    //         }
    //     },
    //     error: function(object, error) {
    //         alert("query object fail");
    //     }
    // });
    //
    //
    //
    // query1.find( {
    //     success: function(object) {
    //         // The object was retrieved successfully.
    //         console.log(object);
    //         var item = object[0];
    //         var item1 = object[1];
    //         var item2 = object[2];
    //         var url = item.get('pic');
    //         var url1 = item1.get('pic')
    //         var url2 = item2.get('pic')
    //         console.log('no');
    //         $('#banner1').css('background-image',"url(" + url2 + ")");
    //         $('#banner2').css('background-image',"url(" + url1 + ")");
    //         $('#banner3').css('background-image',"url(" + url + ")");
    //     },
    //     error: function(object, error) {
    //         alert("query object fail");
    //     }
    // });



})())

function confirmInput () {
    var contact = Bmob.Object.extend("contact");
    var add = new contact();
    add.set('name',$('#name').val());
    add.set('phoneNum',$('#phoneNum').val());
    add.set('email',$('#mail').val());
    add.set('detail',$('#detail').val());
    add.save(null,{
        success: function(obj) {
            alert('success');
        },
        error: function(m,err) {

        }
    })

}

// function checkMobile(str) {
//     if(str==""){
//         alert("手机号不能为空！");
//     }
//     else{
//         var re = /^1\d{10}$/;
//         if (re.test(str)) {
//             alert("正确");
//         } else {
//             alert("手机号格式错误！");
//         }
//     }
// }



// function go(index) {
//     console.log(index);
//     window.location.href = './blog.html?id='+ index;
// }
// function goto(index) {
//     switch (index) {
//         case 1: window.location.href = './index.html';
//             break;
//         case 2: window.location.href = './courses.html';
//             break;
//         case 3: window.location.href = './teacher.html';
//             break;
//         case 4: window.location.href = './about.html';
//             break;
//         case 5: window.location.href = './contact.html';
//             break;
//     }
// }
function goNtu () {
    console.log('haha');
    window.location.href = './ntu.html';
}
