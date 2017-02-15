// var foo = (function() {    //now we call the functions returned below as foo.function
//     "use strict";
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

var lastId = 7;
var root = fs[0];
var currentFolder = root;
var counter = 0;
var whoClicked = null;

function fsRecursion(root, visitor) {
    if(root.children){
        for(var item of root.children){
            visitor(root);
            console.log(item);
            if (item.type == 'folder') {
                fsRecursion(item, visitor);
            }
        }

    }
}
function getIndexInFathersChildrenArrayByName(itemName){
    if(itemName!='root'){
        for(var x=0; x <root.children.length; x++) {
            if(root.children[x].name == itemName) {
                var index = x;
                return index;
            }
        }
    } else {
        return root;
    }
    return false;
    // throw new Error("Couldn't find a folder by that name");
}

function getIndexInFathersChildrenArrayById(id, fileSystem){

    fileSystem = fileSystem || root;
    for(var x=0; x <fileSystem.children.length; x++) {
        if(fileSystem.children[x].id == id) {
            var index = x;
            return index;

    } else if(fileSystem.children[x].children){
           index = getIndexInFathersChildrenArrayById(id, fileSystem.children[x]);
           if(index) return index;
      }
    }
    return false;
}
function findItemByName(itemName, fileSystem) {
    fileSystem = fileSystem || root
    if(itemName!='root'){
        for(var item of fileSystem.children) {
            if(item.name == itemName) {
            return item;
        } else if(item.children){
            var folder = findItemByName(itemName, item);
            if(folder) return folder;

            }
        }
    }
    return false;         // throw new Error("Couldn't find a folder by that name");
}


function findItemById(id, fileSystem) {
   if(whoClicked == 0 || whoClicked == null) return root;
    fileSystem = fileSystem || root;
    for(var item of fileSystem.children) {
        if(item.id == id) {
            return item;
        } else if(item.children){
             var folder = findItemById(id, item);
            if(folder) return folder;
        }
    }
    return false;
}
function clearMessage(){

    $('.messageArea').css('display', 'none');
}

function openFile(id) {
    $('button.clearFileContent').on('click',clearFileContent);
    $('button.saveFileContent').on('click', function(){
        var itemContent = $('textarea').val();
        currentFolder.children[currentFolder.children.length -1].content = itemContent;
        $('.textarea').css('display', 'none');
        // $('textarea').val('');
        showContent();
    })

     console.log(whoClicked + 'clicked, currentFolder is' +  currentFolder.name );
     var index = getIndexInFathersChildrenArrayById(id);
    if(index) {
        $('textarea').text(currentFolder.children[index].content);
        $('.textarea').css('display', 'block');
        $('textarea').focusin();
    }
}

function quitProgram() {
    process.exit(0);
}

// return {
//         findItemByName: findItemByName,
//         findItemById: findItemById,
//         createNew: createNew,
//
//     };
// })();
