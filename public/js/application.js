$(function(){
	$('select[multiple!=true]').customStyle();
	$('select').css({width: "380px"})

	var isShowPage = $("#list")[0];	

	if(isShowPage) ShowView.init();
});
