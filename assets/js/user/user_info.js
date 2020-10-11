$(function () {
    // 1自定义校验规则
    var form = layui.form
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    // 2获取用户信息
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("获取用户信息成功1");
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 3重置按钮
    $('#formUserInfo').on('click', function (e) {
        //    阻止默认重置行为
        e.preventDefault();
        initUserInfo();
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        //    发表ajax请求
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('更新用户信息成功');
                // 调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo();
            }
        })
    })
})