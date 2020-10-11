// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 上传图片,获取图片按钮点击上传
$('#btnChooseImage').on('click', function () {
    $('#file').click();
})

// // 给文件选择绑定change事件
var layer = layui.layer;
$('#file').on('change', function (e) {

    // console.log(111);
    // 获取文件
    var filelist = e.target.files[0];
    if (filelist.length === 0) {
        return layer.msg("请选择用户头像");
    }
    // 将文件转化为路径
    var imgURL = URL.createObjectURL(filelist);
    // 3. 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})
$('#btnUpload').on('click', function () {
    var dataURL = $image.cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
    })
        .toDataURL('image/png')

    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败！')
            }
            layer.msg('更换头像成功！')
            window.parent.getUserInfo()
        }
    })
})
getUserInfo();
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            // renderAvatar(res.data)

            // 请求成功 渲染用户头像信息
            // renderAvatar(res.data);
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', res.data.user_pic)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域

        }
    })
}