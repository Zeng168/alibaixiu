//当用户选择图片时
$('#logo').on('change',function(){
    var formData = new FormData();
    formData.append('logo',this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            // console.log(response[0].logo)
            $('#img_logo').attr('src', response[0].logo);
            $('#hiddenLogo').val(response[0].logo);
        }
    });
})
//表单提交事件
$('#settingsForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(){
            location.reload();
        }
    });
    return false;
})
//网站数据信息展示
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response){
        // console.log(response);
        if(response){
            $('#hiddenLogo').val(response.logo);
            $('#img_logo').attr('src',response.logo);
            $('input[name="title"]').val(response.title);
            $('textarea[name="description"]').val(response.description);
            $('input[name="keywords"]').val(response.keywords);
            $('input[name="comment"]').prop('checked',response.comment);
            $('input[name="review"]').prop('checked',response.review);
        }
    }
});