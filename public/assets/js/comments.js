/* //刷新添加评论
$.ajax({
	type: 'post',
	url: '/comments',
	data: {
		author: '5dd743eace151c13908153b0',
		content: 'nini',
		post: '5dda6ea05f0fa02d5834d94e'
	},
	success:function(){

	}
});
 */
//向服务器发送请求
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response){
        // console.log(response)
        var html = template('commentsTpl',response);
        $('#commentsBox').html(html);
        // console.log(html)
    }
});
//实现分页
function changePage(page){
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response){
            // console.log(response);
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            // console.log(html);
        } 
    });
}

// 当审核按钮被点击的时候
$('#commentsBox').on('click', '.status', function () {
	var status = $(this).attr('data-status');
	var id = $(this).attr('data-id');
	$.ajax({
		type: 'put',
		url: '/comments/' + id,
		data: {
			state: status == 0 ? 1 : 0
		},
		success: function () {
			location.reload();
		}
	})
});

// 当删除按钮被点击时
$('#commentsBox').on('click', '.del', function () {
	if (confirm('您真的要执行删除操作吗')) {
		var id = $(this).attr('data-id');
		$.ajax({
			type: 'delete',
			url: '/comments/' + id,
			success: function () {
				location.reload();
			}
		})
	}
});