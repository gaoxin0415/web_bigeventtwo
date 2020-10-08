$(function () {
    // 1点击切换登录和注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();

    })


    // 2自定义校验规则
    var form = layui.form;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val();
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    // 3 ajax发起post请求
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜注册成功');
            }
        })
    })

    // 4.登录的ajax请求
    var layer = layui.layer;
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜登录成功');

                localStorage.setItem('token', res.token);

                location.href = '/index.html';

            }
        })
    })
})