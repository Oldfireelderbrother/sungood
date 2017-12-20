
Bmob.initialize("46f2060ea2c4c94ee2b13a2406259153", "e44bf4e2278676417180492571813b4e");
var GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var that = this;
((function(){
    var queryid = that.GetQueryString('id');
    console.log(queryid);
    if(queryid<=4) {
        var bannar = Bmob.Object.extend("course");
        var query = new Bmob.Query(bannar);
        query.equalTo("id", parseInt(queryid));
        query.find( {
            success: function(object) {

                console.log(object);
                var para = document.getElementById('content');
                var articleContent = object[0].get("content");
                var div = document.createElement('div');
                div.innerHTML = articleContent;
                var content = div.childNodes[0];
                console.log(content);
                para.appendChild(div);
            },
            error: function(object, error) {
                alert("query object fail");
            }
        });
    }else {
        var bannar = Bmob.Object.extend("bannar");
        var query = new Bmob.Query(bannar);
        query.equalTo("bannarId", queryid);
        query.find( {
            success: function(object) {

                console.log(object);
                var para = document.getElementById('content');
                var articleContent = object[0].get("content");
                var div = document.createElement('div');
                div.innerHTML = articleContent;
                var content = div.childNodes[0];
                console.log(content);
                para.appendChild(div);
            },
            error: function(object, error) {
                alert("query object fail");
            }
        });
    }

})())