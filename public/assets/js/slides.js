//当管理员选择文件时
$('#file').on('change',function(){
    var formData = new FormData();
    formData.append('image',this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            // console.log(response[0].image)
            $('#image').val(response[0].image);
        }
    });
});
//表单提交事件
$('#slidesForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(){
            location.reload();
        }
    });
    return false;
})
//数据列表显示
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response){
        var html = template('slidesTpl',{data:response});
        // console.log(html);
        $('#slidesBox').html(html);
    }
});
//删除功能
$('#slidesBox').on('click','.del',function(){
    var id = $(this).attr('data-id');
    if(confirm('您是否确认删除此轮播图？')){
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function(){
                location.reload();
            }
        });
    }
});