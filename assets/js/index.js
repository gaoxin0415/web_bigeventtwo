$(function () {

    // 调用用户信息
    getUserInfo();




})
//  1  封装获取用户信息
var layer = layui.layer;
function getUserInfo() {
    // ajax发送请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // header请求头配置对象(请求认证)
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            // 认证是否成功
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('获取用户信息成功');
            renderAvatar(res.data);
        },
        // 每次请求都得判断太麻烦，同意设置
        // complete: function (res) {
        //     // console.log('执行了 complete 回调：')
        //     // console.log(res)
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }

    })
}
//2 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp;' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', 'user.user_pic').show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }

}

// 实现退出功能
var layer = layui.layer

// 点击按钮，实现退出功能
$('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {

        // 清除本地存储的token
        localStorage.removeItem('token');
        // 返回登录界面
        location.href = "/login.html";
        layer.close(index);
    });
})
