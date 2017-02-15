function setRightMenuEventListeners() {
    $('[data-custom]').off('contextmenu');
    $('[data-custom]').on('contextmenu', function (event) {
        event.stopPropagation();
        setCustomMenuItemsEventListeners();
        showContextMenu(event);
        return false;
    });

    $('.fileSystem').contextmenu(function () { return false; });
    $(window).click(function () { hideCustomMenu(); });
}

function setCustomMenuItemsEventListeners() {
    $('.custom-menu > menuitem').off('click');
    $('.custom-menu > .update').on('click', function () {
        var id = $('.custom-menu').data('id');
        alert('update'+ id);
        updateName(id);
    });
    $('.custom-menu > .createFolder').on('click', function () {
        createNewFolder();
    });
    $('.custom-menu > .createFile').on('click', function () {
       createNewFile();
    });
    $('.custom-menu > .delete').on('click', function () {
       var id = $('.custom-menu').data('id');
       deleteItem();
    });

    $('.custom-menu > .open').on('click', function () {
       var id = $('.custom-menu').data('id');
       alert(id);
       openFile(id);
    });
}

function showContextMenu(e) {
    var id = $(e.currentTarget).attr('data-id');
    var type = $(e.currentTarget).attr('data-custom');
    $('menu.custom-menu').css('display', 'block');
    $('menu.custom-menu').attr('data-type', type);
    $('menu.custom-menu').css('left', e.pageX + 'px');
    $('menu.custom-menu').css('top', e.pageY + 'px');
    $('menu.custom-menu').data('id', id);
}

function hideCustomMenu() {
    $('menu.custom-menu').css('display', 'none');
}