
function createNew(){
    debugger;
    var newItem = prompt('Enter name of File or Folder to add');
    var ifExists = findItemByName(newItem);
    if(!ifExists){
        ++lastId;
        var itemContent = prompt('Enter text if file');
        if (itemContent < 1) {
            currentFolder.children.push({type: 'folder', id: lastId, name: newItem, children: []});
            showFolderList();
        } else {
            currentFolder.children.push({type: 'file', id: lastId, name: newItem, content: itemContent});
          }
          showContent();
    } else {
        alert('Sorry this name is taken');
    }
}

function createItem() {
    var li = $('<li class="folder"> <img src="folders.png">'+ currentFolder.children[-1].name +'</li>');
    var ul = $('<ul></ul>');
    li.appendTo(ul);
    $(this).after(ul);
    return false;
}

function deleteItem(){
    var itemToDelete = prompt('Enter name of item to delete');
    var index = findItemByName(currentFolder, itemToDelete);
    if(!index){
        alert('No Such File');
    } else {
        var areYouSure = prompt('Are you sure? y/n');
        if (areYouSure == 'n') {
            alert('action cancelled');
        } else {
            currentFolder.children.splice(index, 1);
        }
        alert(itemToDelete, "has been deleted");

        showFileSystem(myJqueryId, currentFolder);
    }
}

function saveToTextFile(){
        var fs = require('fs');
        var file = './text.txt'
        var content = JSON.stringify(fileSystem);
        fs.writeFileSync(file, content, 'utf8');
        console.log('FileSystem saved Successfully to JSON text.txt');
}

//###################################   UI  ###################################

$(document).ready(function(){
    "use strict";
      init();

});

function init(){

     showTopMenu()
     buildRootAndListeners();
     showContent();

}



function showTopMenu(){
    $('.path').append(' i am here = ' + currentFolder.name);

}


function buildRootAndListeners(){

    var htmlToAppend = '<li class="liFolder'+counter+'">' +
        '<a href="#" data-id="0" id="aRoot">' +
        '<img src="folders.png"> '+currentFolder.name +'</a>' +
        '<ul class="collapsed"></ul></li>';
    $('.folderList').append(htmlToAppend);
//---------a listeners:
    var parent = $(".folderList");
    parent.on("click", "a", function() {
        var whoClicked = $(this).attr('data-id');
       // alert(whoClicked);
        collapseExpand(whoClicked);
//---------right-side-menu:
 });
    $('ul').bind("contextmenu", function (event) {
        event.preventDefault();
       // id = ($(event.target).attr('data-id'));
        $(".custom-menu").finish().toggle(100).css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
    });
}

function collapseExpand(id){
    var whereTo = '.liFolder' + id + '> ul';
    if($(whereTo).attr('class') == 'collapsed'){
        $(whereTo).attr('class', 'expanded');
        showFolderList(id);
    }else {
        $(whereTo).attr('class', 'collapsed');
        $(whereTo).empty();
    }
}
function showFolderList(whoClicked){
    if(currentFolder.children) {
        console.log(whoClicked);
        currentFolder = findItemById(whoClicked);
     for (var item of currentFolder.children) {
        if (item.type == 'folder') {
            var htmlToAppend = '<li class="liFolder'+item.id+'"><a href="#" data-id="'
            + item.id +
            '" ><img src="folders.png"> '
            + item.name + '</a><ul class="collapsed"></ul></li>';
                var whereToAppend = '.liFolder' + whoClicked + '> ul';
               $(whereToAppend).append(htmlToAppend);
            }
        }
        showContent();
    }
}


function showContent() {
    $('.content').empty();
    if (currentFolder.children && currentFolder.children.length > 0) {
        for (var x = 0; x < currentFolder.children.length; x++) {
            var liFolder = '<span><a href="#"> <img src="folders.png"> '
                + currentFolder.children[x].name + '</a></span>';
            var liFile = '<span><a href="#"><img src="File.png"> '
                + currentFolder.children[x].name + '</a> </span>';
            if (currentFolder.children[x].type == 'folder') {
                $('.content').append(liFolder);
            } else {
                $('.content').append(liFile);
            }
        }
    }
}



