$(function(){
	$(".card-header").click(function() {
		console.log($(this).parent().children('.card-body'));
		if($(this).parent().children('.card-body').css("display") == "none") {
			$(this).parent().children('.card-body').css("display", "block");
		} else {
			$(this).parent().children('.card-body').css("display", "none");
		}
	});
});