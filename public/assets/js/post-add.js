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
$('#feature').on('change',function(){
    var formData = new FormData;
    formData.append('cover',this.files[0])
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
