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


$('#toggle').click(function() {
    console.log('123');
    ischecked = !ischecked;
    $('#isUp').attr('checked',ischecked);
})
document.getElementById('get').addEventListener('click', function () {
    console.log('qingqiu')
    var id = $('input:radio:checked').val();
    var course = Bmob.Object.extend("course");
//创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(course);
//查询单条数据，第一个参数是这条数据的objectId值
    query.equalTo("id",parseInt(id));
    var that = this;
    query.find({
        success: function (res) {
            // 查询成功，调用get方法获取对应属性的值
            var courseName = res[0].get('courseName')
            var price = res[0].get('price');
            var pic = res[0].get('pic');
            var arr = res[0].get('descibe').split(',');
            var content = res[0].get('content');
            $('#articleName').val(courseName);
            $('#coursePrice').val(price);
            $('#pic').val(pic);
            $('#desc1').val(arr[0]);
            $('#desc2').val(arr[1]);
            $('#desc3').val(arr[2]);
            $('#desc4').val(arr[3]);
            $('#desc5').val(arr[4]);
            editor.txt.html(content);

        },
        error: function (object, error) {
            alert(error);
        }
    });

})
document.getElementById('btn1').addEventListener('click', function () {
    var id = $('input:radio:checked').val();
    console.log(id);
    var courseName = $('#articleName').val();
    var coursePrice = $('#coursePrice').val();
    var pic = $('#pic').val();
    var desc1 = $('#desc1').val();
    var desc2 = $('#desc2').val();
    var desc3 = $('#desc3').val();
    var desc4 = $('#desc4').val();
    var desc5 = $('#desc5').val();
    var desc = desc1 + ',' + desc2 + ',' + desc3 + ',' + desc4 + ',' + desc5;
    console.log(desc);
    var content = editor.txt.html();

    // // 读取 html
    // alert(editor.txt.html())
    // console.log(editor.txt.html())
    //
    var course = Bmob.Object.extend("course");
//创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(course);
//查询单条数据，第一个参数是这条数据的objectId值
    query.equalTo("id",parseInt(id));
    var that = this;
    query.find({
        success: function (res) {
            // 查询成功，调用get方法获取对应属性的值
            var objId = res[0].id;
            query.get(objId, {
                success: function(res) {
                    res.set('price',coursePrice);
                    res.set('descibe',desc);
                    res.set('courseName',courseName);
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