Bmob.initialize("46f2060ea2c4c94ee2b13a2406259153", "e44bf4e2278676417180492571813b4e");
var E = window.wangEditor
var editor = new E('#editor')
var ischecked = false;

(function(){
    console.log(getCookie('islogin'))
    if(getCookie('islogin') == 1){
        $("#cover").css('display','none');
    }
})()

$('#toggle').click(function() {
    console.log('123');
    ischecked = !ischecked;
    $('#isUp').attr('checked',ischecked);
})

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
document.getElementById('get').addEventListener('click', function () {

    var id = $('input:radio:checked').val();
    console.log(id);
    var course = Bmob.Object.extend("bannar");
//创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(course);
//查询单条数据，第一个参数是这条数据的objectId值
    query.equalTo("bannarId",id);
    var that = this;
    query.find({
        success: function (res) {
            // 查询成功，调用get方法获取对应属性的值
            console.log(res);
            var objId = res[0].get('pic');
            console.log(objId);
            var content = res[0].get('content');
            $('#pic').val(objId);
            editor.txt.html(content);

        },
        error: function (object, error) {
            alert(error);
        }
    });
});

document.getElementById('btn1').addEventListener('click', function () {
    var id = $('input:radio:checked').val();
    console.log(id);
    var pic = $('#pic').val();
    var content = editor.txt.html();

    // // 读取 html
    // alert(editor.txt.html())
    // console.log(editor.txt.html())
    //
    var course = Bmob.Object.extend("bannar");
//创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(course);
//查询单条数据，第一个参数是这条数据的objectId值
    query.equalTo("bannarId",id);
    var that = this;
    query.find({
        success: function (res) {
            // 查询成功，调用get方法获取对应属性的值
            console.log(res);
            var objId = res[0].id;
            query.get(objId, {
                success: function(res) {
                    res.set('pic',pic);
                    res.set('content',content);
                    res.save().then(function(obj) {
                        alert('成功')
                    }, function(error) {
                        alert('失败'+error);
                    });;
                },
                error: function(object, error) {

                }
            });
        },
        error: function (object, error) {
            alert(error);
        }
    });
});
// 或者 var editor = new E( document.getElementById('#editor') )
editor.create();