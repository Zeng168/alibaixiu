//查询分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categroyTpl', { data: response });
        $('#category').html(html);
    }
});
//当管理员选择文件是触发事件
$('#feature').on('change', function () {
    var formData = new FormData;
    formData.append('cover', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            //实现封面预览功能
            $('#thumbnail').val(response[0].cover);
        }
    });
})
//当添加文章表单提交的时候
$('#addForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function (response) {
            // console.log(response)
            location.href = '/admin/posts.html';
        }
    });
    return false;
});
//获取id参数
var id = getUrlParams('id');
//当管理员是在做修改文章操作时
if (id != -1) {
    //根据id获取文章具体信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            // console.log(response)
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categroies) {
                    response.categroies = categroies;
                    console.log(response)
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                    //  console.log(html)           
                }
            });
        }
    });
}
//从浏览器地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    //循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var temp = paramsAry[i].split('=');
        if (temp[0] == name) {
            return temp[1];
        }
    }
    return -1;
}
//修改表单添加表单提交事件
$('#parentBox').on('submit','#modifyForm',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function (response) {
            // console.log(response)
            location.href = '/admin/posts.html';
        }
    });
    return false;
});

