
// If the document is clicked somewhere hide the menu
$(document).bind("mousedown", function (e) {
    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu").length > 0) {
        // Hide it
        $(".custom-menu").hide(100);
    }
});

$('.custom-menu').click(function(e){

    var id = $(e.target).attr('data-id');
    $('.custom-menu').css('display', 'block');
    $('.custom-menu').css('left', e.pageX + 'px');
    $('.custom-menu').css('top', e.pageY + 'px');
    $('.custom-menu').data('id', id);

    switch($(e.target).attr('data-id')){
        case "update": console.log("update"); break;
        case "create": createNew();
        case "delete": console.log("delete"); break;
        case "open": console.log("open"); break;
    }
    $('.custom-menu').hide(100);
});
