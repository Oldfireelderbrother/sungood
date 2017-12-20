Bmob.initialize("46f2060ea2c4c94ee2b13a2406259153", "e44bf4e2278676417180492571813b4e");
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function login() {
    var userName = $('#account').val();
    var password = $('#password').val();
    Bmob.User.logIn(userName, password, {
        success: function(user) {
            window.location.href = './bannar.html'
            setCookie('islogin',1,1);
        },
        error: function(user, error) {
            alert('账号或密码错误');
        }
    });
}