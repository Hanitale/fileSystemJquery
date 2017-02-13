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

var lastId = 6;
var root = fs[0];
var currentFolder = root;
var counter = 0;

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

function findItemByName(itemName) {
    if(itemName!='root'){
        for(var item of root.children) {
            if(item.name == itemName) {
            return item;
        }
        }
    } else {
      return root;
    }
    return false;
        // throw new Error("Couldn't find a folder by that name");
}


function findItemById(id, fileSystem) {
   if(id == 0) return root;
    fileSystem = fileSystem || root;
    for(var item of fileSystem.children) {
        if(item.id == id) {
            return item;
        } else if(item.children){
             var sub= findItemById(id, item);
            if(sub) return sub;
        }
    }
    return false;
}

function buildTree(id, fileSystem) {
    fileSystem = fileSystem || root;
    for(var item of fileSystem.children) {
        if(item.children){
            var sub= buildTree(id, item);
            if(sub) return sub;
        } else{
            buildMe(item);
        }
    }
    return false;
}

function buildMe(){
    var li = 0;
}

function openFile() {
    var fileName = readlineSync.question('Enter name of File to open');
    var index = fsRecursion(root, findItemByName);
    if(index) {
        console.log(currentFolder.children[index].content);
    } else {
        console.log('No Such File');
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
