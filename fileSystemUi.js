var fs = [{type:'folder',
    id: 0,
    name: 'root',
    children: [{type:'folder',
        id: 1,
        name: 'sub1',
        children: [{type:'file',
            id: 2,
            name: 'file1',
            content: 'Hear me ROARRR'
        }, {type:'folder',
            id: 5,
            name: 'sub5',
            children: [{type:'file',
                id: 6,
                name: 'file3',
                content: 'I am playing...'
            }]
        }]
    }, {type:'folder',
        id: 3,
        name: 'sub2',
        children: [{
            id: 4,
            name: 'file2',
            content: 'text'
        }]
    },{type:'file',
        id: 7,
        name: 'file 8',
        content: 'I too am playing...'
    }]
}];

var lastId = 6;
var root = fs[0];
var currentFolder = root;

function findItemById(id, parent) {
    parent = parent || root;
    if (parent.children && parent.children.length > 0) {
        for (var i = 0; i < parent.children.length; i++) {
            if (parent.children[i].id == id) {
                currentFolder = parent.children[i];
                return currentFolder;
            } else {
                if (parent.children && parent.children.length > 0) {
                 for (var x = 0; x < parent.children[i].children.length; x++) {
                    if (parent.children[i].children[x].id == id) {
                        currentFolder = parent.children[i].children[x];
                        return currentFolder;
                   }
                 }
                }
              }
        }  findItemById(id, parent.children[i]);
    }
}
function moveToName(){
    var validate = findItem(currentFolder, name);
    if(typeof(validate)!= 'number'){
        console.log('No Such Folder');
    }
}

function findItemByName(currentFolder, itemName){
    if (currentFolder.children && currentFolder.children.length > 0) {
        for (var i = 0; i < currentFolder.children.length; i++) {
            if (currentFolder.children[i].name == itemName) {
                currentFolder = currentFolder.children[i];
                return i;
            }
        }
    }
    return false;
}
function createNew(currentFolder){
    var newItem = prompt('Enter name of File or Folder to add?');
    console.log('i am '+ newItem);
    var ifExists = findItemByName(currentFolder, newItem);
    if(ifExists == false){
        ++lastId;
        var itemContent = readlineSync.question('Enter text if file\n');
        if (itemContent < 1) {
            currentFolder.children.push({type: 'folder', id: lastId, name: newItem, children: []});
        } else {
            currentFolder.children.push({type: 'file', id: lastId, name: newItem, content: itemContent});
        }
        showFileSystem(myJqueryId, currentFolder);
        return;

    } else {
        alert('Sorry this name is taken');
    }
}
function createItem() {
    console.log('i am a '+ $(this)[0].className);
    var li = $('<li class="folder"> <a href="#"><img src="folders.png">'+ currentFolder +' </a></li>');
    $(li).children('a').click(createItem);
    var ul = $('<ul></ul>');
    li.appendTo(ul);
    $(this).after(ul);
    return false;

}
function deleteItem(currentFolder){
    var itemToDelete = readlineSync.question('Enter name of item to delete\n');
    var index = findInChildren(currentFolder, itemToDelete);
    if(typeof (index) != 'number'){
        console.log('No Such File');
    } else {
        areYouSure = readlineSync.question('Are you sure? y/n\n');
        if (areYouSure == 'n') {
            console.log('action cancelled');
        } else {
            currentFolder.children.splice(index, 1);                //deletes the item in index location
            // for (u = currentFolder.index; u < (currentFolder.length); u++) {     //updates array to avoid hole
            //     currentFolder[u][0] = u;
            //     if (currentFolder[u][1] != 0) {
            //         currentFolder[u][1] = (currentFolder[u][1]) - 1;
            //     }
            // }
        }
        console.log(itemToDelete, "has been deleted");

        showFileSystem(myJqueryId, currentFolder);
    }
}
function openFile(currentFolder) {
    var fileName = readlineSync.question('Enter name of File to open\n');
    var index = findInChildren(currentFolder, fileName);
    if(typeof (index)== 'number') {
        console.log(currentFolder.children[index].content);
    } else {
        console.log('No Such File');
    }
}
function quitProgram() {
    process.exit(0);
}
function saveToFile(){
    fs.writeFileSync(currentFolder + "/" + folderName, JSON.stringify(newArray));
    //need to ask Roman
}

//###################################   UI  ###################################

$(document).ready(function(){
      init();
});

function init(){
    showRoot(currentFolder);
    showContent(currentFolder);
    $('a#aRoot').click(function(e){
        //alert('init');
        var myJqueryIdArray = $(e.currentTarget);
        myJqueryId = myJqueryIdArray[0];
        var id = $(e.currentTarget).attr('data-id');
        var toggle = expandCollapseFolder(myJqueryId);
        if(toggle) {
        showFileSystem(myJqueryId, currentFolder, id);
        showContent(currentFolder);
        }
    });
}
function showRoot(currentFolder){
    $('#path').append(' i am here ' + currentFolder.name);
    var JqueryRoot = '<li data-state="collapsed" id="root" class="lifolder"><a href="#" data-id="0" id="aRoot"> <img src="folders.png"> '+currentFolder.name +'</a><ul class="toEmpty"></ul></li>';
    $('#folderList').append(JqueryRoot);
}
function showFileSystem(myJqueryId, currentFolder, id){
    if (currentFolder.children){
    for(x = 0;x < currentFolder.children.length; x++) {
        var ul = $(myJqueryId).parent('li').children('ul.toEmpty');
        var li = '<li class="lifolder" data-state="collapsed"><a id="aa" href="#" data-id="' + currentFolder.children[x].id + '"><img src="folders.png"> ' + currentFolder.children[x].name + ' </a><ul class="toEmpty"></ul></li>';
        if (currentFolder.children[x].type == 'folder') {
            ul.append(li);
        }

    }$('a#aa').click(function(e){
        // alert('not init');
        var myJqueryIdArray = $(e.currentTarget);
        myJqueryId = myJqueryIdArray[0];
        console.log(myJqueryId);
        var toggle = expandCollapseFolder(myJqueryId);
        if(toggle) {
            id = $(e.currentTarget).attr('data-id');
            currentFolder = findItemById(id);
            showFileSystem(myJqueryId, currentFolder, id);
            showContent(currentFolder);
            return;
        }


    });
    }
}

function showContent(currentFolder) {
    $('#content').empty();
    if(currentFolder.children && currentFolder.children.length>0){
    for(var x = 0;x < currentFolder.children.length; x++){
        var liFolder = '<span><a href="#"> <img src="folders.png"> '+currentFolder.children[x].name +'</a></span>'
        var liFile = '<span><a href="#"><img src="File.png"> '+currentFolder.children[x].name +'</a> </span>'
        if(currentFolder.children[x].type == 'folder' ){
            $('#content').append(liFolder);
        } else {
            $('#content').append(liFile);}
    }
    }
}

$('li.update').click(function(){
    createNew(fs)
});

function expandCollapseFolder(myJqueryId) {
    var parent = $(myJqueryId).parent('li');

    if (parent.attr('data-state') == 'collapsed') {
        parent.attr('data-state', 'expanded');
        return true;
    } else {
        parent.children('ul.toEmpty').text('');
        parent.attr('data-state', 'collapsed');
        return false;
    }
}
//####################right click menu:#############################

