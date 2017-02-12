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
var fileSystem = fs[0];
var currentFolder = fileSystem;

function moveToId(id){
    currentFolder = findItemById(currentFolder, id);
    showFileSystem(currentFolder)
}
function findItemById(fs, id){
    if (fs.children && fs.children.length > 0) {
        for (var i = 0; i < fs.children.length; i++) {
            if (fs.children[i].id == id) {
                currentFolder = fs.children[i];
                return currentFolder;
            }
        }
    }
}

function moveToName(){
    var validate = findItem(currentFolder, name);
        if(typeof(validate)!= 'number'){
            console.log('No Such Folder');
        }
    }
    showFileSystem(currentFolder)
}

function findItemByName(fs, itemName){
    if (fs.children && fs.children.length > 0) {
        for (var i = 0; i < fs.children.length; i++) {
            if (fs.children[i].name == itemName) {
               currentFolder = fs.children[i];
               return i;
            }
        }
    }
    return false;
}
function createNew(fs){
    var newItem = prompt('Enter name of File or Folder to add?');
    console.log('i am '+ newItem);
    var ifExists = findInChildren(fs, newItem);
    if(ifExists == false){
        ++lastId;
        var itemContent = readlineSync.question('Enter text if file\n');
        if (itemContent < 1) {
            fs.children.push({type: 'folder', id: lastId, name: newItem, children: []});
        } else {
            fs.children.push({type: 'file', id: lastId, name: newItem, content: itemContent});
        }
        showFileSystem(fs);
        return;

    } else {
        alert('Sorry this name is taken');
      }
}
function createItem() {
    console.log('i am a '+ $(this)[0].className);
    var li = $('<li class="folder"> <a href="#"><img src="../folders.png">'+ currentFolder +' </a></li>');
    $(li).children('a').click(createItem);
    var ul = $('<ul></ul>');
    li.appendTo(ul);
    $(this).after(ul);
    return false;

}
function deleteItem(fs){
    var itemToDelete = readlineSync.question('Enter name of item to delete\n');
    var index = findInChildren(fs, itemToDelete);
    if(typeof (index) != 'number'){
        console.log('No Such File');
    } else {
        areYouSure = readlineSync.question('Are you sure? y/n\n');
        if (areYouSure == 'n') {
            console.log('action cancelled');
        } else {
            fs.children.splice(index, 1);                //deletes the item in index location
            // for (u = currentFolder.index; u < (fs.length); u++) {     //updates array to avoid hole
            //     fs[u][0] = u;
            //     if (fs[u][1] != 0) {
            //         fs[u][1] = (fs[u][1]) - 1;
            //     }
            // }
        }
        console.log(itemToDelete, "has been deleted");
        currentFolder = fs;
        showFileSystem(currentFolder);
    }
}
function openFile(fs) {
    var fileName = readlineSync.question('Enter name of File to open\n');
    var index = findInChildren(fs, fileName);
    if(typeof (index)== 'number') {
        console.log(fs.children[index].content);
    } else {
        console.log('No Such File');
    }
}
function quitProgram() {
    process.exit(0);
}
function saveToFile(fs){
    fs.writeFileSync(currentFolder + "/" + folderName, JSON.stringify(newArray));
    //need to ask Roman
}


