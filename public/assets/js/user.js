//当表单发生提交行为时
$('#userForm').on('submit',function(){
    //获取表单输入内容
    var formData = $(this).serialize();
    //发送请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(){
            //刷新页面
            location.reload();
        },
        error: function(){
            alert('用户添加失败')
        }
    });
    //阻止表单默认提交行为
    return false;
});
//当用户选择图片文件
$('#modifyBox').on('change','#avatar',function(){
    //用户选择到的文件
    var formData = new FormData();
    formData.append('avatar',this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response);
            //实现头像预览功能
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
})
//向服务器端发送请求
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response){
        console.log(response);
        var html = template('userTpl',{data: response});
        $('#userBox').html(html);
    },
    error: function(err){
        console.log(err)
    }
});
//通过实践委托添加编辑按钮事件
$('#userBox').on('click','.edit',function(){
    //获取被点击用户的id
    var id = $(this).attr('data-id');
    //根据id获取用户详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response){
            // console.log(response)
            var html = template('modifyTpl',response);
            $('#modifyBox').html(html);
        }
    });
});
//为 修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response){
            location.reload();
        }
    });
    //阻止表单默认提交
    return false;
});