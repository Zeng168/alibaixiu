//表单的提交行为
$("#addCategory").on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (response) {
            location.reload();
            // console.log(response)
        }
    });
    //阻止表单默认提交
    return false;
});
//向服务器端发送请求
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categroyTpl', { data: response });
        $('#categoryBox').html(html);
        // console.log(html)
    }
});
//为编辑按钮添加编辑事件
$('#categoryBox').on('click', '.edit', function () {
    //获取被点击分类的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            // console.log(response)
            var html = template('modifyCategroyTpl', { data: response });
            $('#formBox').html(html);

        }
    });
});
//为 修改表单添加表单提交事件
$('#formBox').on('submit', '#modifyCategory', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    });
    //阻止表单默认提交
    return false;
});
//删除按钮事件
$('#categoryBox').on('click', '.del', function () {
    if (confirm('您是否确定删除此分类？')) {
        //获取被点击分类的id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (response) {
                // console.log(response)
                location.reload();
            }
        });
    }
});

