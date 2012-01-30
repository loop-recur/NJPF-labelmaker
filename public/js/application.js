$(function(){
	$('select[multiple!=true]').customStyle();
	$('select').css({width: "380px"})

	var isShowPage = true;

	if(isShowPage) ShowView.init();
});
