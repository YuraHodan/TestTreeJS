let tree =[];
var elementID;
var parent;
window.TreeAPI.getData().then(function(defs){
  tree = defs.data
  function createList(spacecrafts){
  var listView=document.createElement('ul');
  for(var i=0;i<spacecrafts.length;i++){
      elementID = tree[i].id;
      parent = tree[i].parent;
      if(spacecrafts[i].parent == null){
        document.getElementById('tree').innerHTML =
        '<ul><li><a>'+ spacecrafts[i].id +'</a><div class="actions"><button class="add" onclick="addIt(this.value)" value="'+elementID+'">add</button></div><ul id ="'+ spacecrafts[i].id +'"></ul>'
      }else{
        var newLi = document.createElement('li');
        newLi.id = elementID
        newLi.innerHTML =
        '<a>'+ elementID +'</a><div class="actions"><button class="add" onclick="addIt(this.value)" value="'+elementID+'">add</button><button onclick="deleteIt(this.value)"  class="remove" value="'+ elementID +'">remove</button ></div><ul class="vertical" id ="'+ elementID +'"></ul>'
          document.getElementById(parent).appendChild(newLi);
      };
  };
  return listView;
};
  document.getElementById("tree").appendChild(createList(tree));
});

// add new item
function deleteIt(deleteItem){
  tree=tree.filter(item=>item.id!=deleteItem);
  document.getElementById(deleteItem).outerHTML = "";
  };
// delete item
  function addIt(addIt){
    let newId = +tree[tree.length-1].id+1;
    tree.push({id:newId,parent:addIt})
    //I do not see the content to convert the number into a string (id)
    var newItem = document.createElement('li');
    newItem.id = newId
    newItem.innerHTML =
    '<a>'+ newId +'</a><div class="actions"><button class="add" onclick="addIt(this.value)"  value="'+newId+'">add</button><button onclick="deleteIt(this.value)"  class="remove" value="'+ newId +'">remove</button ></div><ul class="vertical" id ="'+ newId +'"></ul>'
      document.getElementById(addIt).appendChild(newItem);
  };
