function createNewFile(){

    var newItem = prompt('Enter name of file to add');
    var ifExists = findItemByName(newItem);
    if(!ifExists){
        ++lastId;
        currentFolder.children.push({type: 'file', id: lastId, name: newItem, content: ''});
        $('.textarea').css('display', 'block');
        $('textarea').focusin();
        $('button.clearFileContent').on('click',clearFileContent);
        $('button.saveFileContent').on('click', function(){
            newItem = newItem || 'New File';
            var itemContent = $('textarea').val();
            currentFolder.children[currentFolder.children.length -1].content = itemContent;
            $('.textarea').css('display', 'none');
          // $('textarea').val('');
           showContent();
        })
     } else {
        $('.messageArea').text('Sorry, the name '+ newItem + " is taken.");
        setTimeout(clearMessage, 3000);
    }
}

function createNewFolder(){
    var newItem = prompt('Enter name of folder to add');
    var ifExists = findItemByName(newItem);
    if(!ifExists){
        ++lastId;
        var newFolder = {type: 'folder', id: lastId, name: newItem, children: []}
        currentFolder.children.push(newFolder);
        updateFolderList(newFolder);
    } else {
        $('.messageArea').text('Sorry, the name '+ newItem + " is taken.");
        setTimeout(clearMessage, 4000);
    } showContent();
}


function updateFolderList(item){
   var htmlToAppend = '<li class="liFolder'+item.id+'"><a href="#" data-id="'
        + item.id +
        '" ><img src="folders.png"> '
        + item.name + '</a><ul class="collapsed"></ul></li>';
    var whereToAppend = '.liFolder' + currentFolder.id + '> ul';
    $(whereToAppend).append(htmlToAppend);
}





function saveFileContent(x , newItem) {

}
function clearFileContent() {
    $('textarea').val('');
    $('textarea').focus();

}

function deleteItem(){
    var itemToDelete = prompt('Enter name of item to delete');
    var ifExists = getIndexInFathersChildrenArrayByName(itemToDelete);
    if(!ifExists){
        alert('No Such File or Folder');
    } else {
        var areYouSure = prompt('Are you sure? y/n');
        if (areYouSure == 'n') {
            alert('action cancelled');
        } else {
            var index = ifExists
            currentFolder.children.splice(index, 1);
        }

        updateFolderListAfterDeletion(ifExists.id);
        showContent();
        $('.messageArea').text(itemToDelete + " has been deleted");
        setTimeout(clearMessage, 3000);
    }
}

function updateFolderListAfterDeletion(id){
    var whereToAppend = '.liFolder' + id +'>ul';
    $(whereToAppend).remove()
}

function updateName(){
    var newName = prompt('Enter new name');
    var ifExists = findItemByName(newName);
    if(!ifExists){
    var folder = findItemById();
    folder.name = newName;
    showFolderList()
    showContent()
    } else {
        $('.messageArea').text('Sorry, the name '+ newName + " is taken.");
        setTimeout(clearMessage, 3000);
    }
}

function saveToTextFile(){
    var fs = require('fs');
    var file = './text.txt'
    var content = JSON.stringify(fileSystem);
    fs.writeFileSync(file, content, 'utf8');
    $('.messageArea').text('FileSystem saved Successfully to JSON text.txt');
    setTimeout(clearMessage, 3000);
}

//###################################   UI  ###################################

$(document).ready(function(){
    "use strict";
      init();
});

function init(){
    showTopMenu();
    buildRootAndListeners();
    showContent();
    setRightMenuEventListeners()
}


function showTopMenu(){
    $('.path').append(' i am here = ' + currentFolder.name);
}

function buildRootAndListeners(){

    var htmlToAppend = '<li class="liFolder'+counter+'">' +
        '<a href="#" data-id="0" id="aRoot" data-custom ="folder">' +
        '<img src="folders.png"> '+currentFolder.name +'</a>' +
        '<ul class="collapsed"></ul></li>';
    $('.folderList').append(htmlToAppend);
//---------a listeners:
    var parent = $(".folderList");
    parent.on("click", "a", function() {
    whoClicked = $(this).attr('data-id');
    collapseExpand();

 });
}

function collapseExpand(){
    var whereTo = '.liFolder' + whoClicked + '> ul';
    if($(whereTo).attr('class') == 'collapsed'){
        $(whereTo).attr('class', 'expanded');
        showFolderList();


    }else {
       // debugger;
        $(whereTo).attr('class', 'collapsed');
        $(whereTo).empty();
        showContent();
    }
}

function showFolderList(){
    if(currentFolder.children) {
        currentFolder = findItemById(whoClicked);
        if(currentFolder.children){
            for (var item of currentFolder.children) {
                if (item.type == 'folder') {
                    var htmlToAppend = '<li class="liFolder'+item.id+'"><a href="#" data-id="'
                    + item.id +'" data-custom ="folder"><img src="folders.png"> '
                    + item.name + '</a><ul class="collapsed"></ul></li>';
                    var whereToAppend = '.liFolder' + whoClicked + '> ul';
                    $(whereToAppend).append(htmlToAppend);
                }
            }
        }
        showContent();
    }
}


function showContent() {
   $('.content').empty();
   currentFolder = findItemById(whoClicked);
    if (currentFolder.children && currentFolder.children.length > 0) {
        for (var item of currentFolder.children) {
            var liFolder = '<span><a href="#" data-custom ="folder" data-id="'+ item.id +'"> <img src="folders.png"> '
            + item.name + '</a></span>';
            var liFile = '<span><a href="#" data-custom ="file" data-id="'+ item.id +'"><img src="File.png"> '
                + item.name + '</a> </span>';
            if (item.type == 'folder') {
                $('.content').append(liFolder);
            } else {
                $('.content').append(liFile);
            }
        }
    }
    setRightMenuEventListeners()
}



