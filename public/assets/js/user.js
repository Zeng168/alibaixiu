//当表单发生提交行为时
$('#userForm').on('submit', function () {
    //获取表单输入内容
    var formData = $(this).serialize();
    //发送请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            //刷新页面
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        }
    });
    //阻止表单默认提交行为
    return false;
});
//当用户选择图片文件
$('#modifyBox').on('change', '#avatar', function () {
    //用户选择到的文件
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            //实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
})
//向服务器端发送请求
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response);
        var html = template('userTpl', { data: response });
        $('#userBox').html(html);
    },
    error: function (err) {
        console.log(err)
    }
});
//通过实践委托添加编辑按钮事件
$('#userBox').on('click', '.edit', function () {
    //获取被点击用户的id
    var id = $(this).attr('data-id');
    //根据id获取用户详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            // console.log(response)
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
});
//为 修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    //阻止表单默认提交
    return false;
});

//删除按钮事件
$('#userBox').on('click', '.del', function () {
    if (confirm('你真的要删除吗！')) {
        //获取被点击用户的id
        var id = $(this).attr('data-id');
        //根据id进行删除
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                location.reload();
            },
        });
    }
});
//获取全选按钮  批量删除事件
$('#selcetAll').on('change',function(){
    //获取按钮状态
    var status = $(this).prop('checked');
    if(status){
        $('#delMany').show().attr('disabled',false);
    }
    else{
        $('#delMany').attr('disabled',true);
    }
    //使用户信息按钮与全选按钮同步
    $('#userBox').find('input').prop('checked',status);
});
//当用户的复选框按钮状态发生改变时
$('#userBox').on('change','.userStatus',function(){
    var inputs = $('#userBox').find('input');
    if(inputs.length == inputs.filter(':checked').length){
        $('#selcetAll').prop('checked',true);
    }
    else {
        $('#selcetAll').prop('checked',false);
    }
    //对复选框进行判断 若选中数量大于0显示批量删除否则隐藏
    if(inputs.filter(':checked').length > 0){
        $('#delMany').show().attr('disabled',false);
    }
    else{
        $('#delMany').attr('disabled',true);
    }
});
//为批量删除按钮添加点击事件
$('#delMany').on('click',function(){
    var ids = [];
    //获取选中用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    //循环复选框，获取复选框的data-id值
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'));
    })
    // console.log(ids).
    if(checkedUser.length > 0) {
        if(confirm('您真的要删除用户吗？')){
            $.ajax({
                type: 'delete',
                url: '/users/' + ids.join('-'),
                success: function(){
                    location.reload();
                }
            });
        }
    }
});