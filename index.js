let tree =[];
let elementID;
let parent;
window.TreeAPI.getData().then(function(defs){
  tree = defs.data
  function createList(spacecrafts){
  let listView=document.createElement('ul');
  for(let i=0;i<spacecrafts.length;i++){
      elementID = tree[i].id;
      parent = tree[i].parent;
      if(spacecrafts[i].parent == null){
        document.getElementById('tree').innerHTML =
        '<ul><li><a>'+ spacecrafts[i].id +'</a><div class="actions"><button class="add" onclick="addIt(this.value)" value="'+elementID+'">add</button></div><ul id ="'+ spacecrafts[i].id +'"></ul>'
      }else{
        let newLi = document.createElement('li');
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

// delete item
function deleteIt(deleteItem){
  tree=tree.filter(item=>item.id!=deleteItem);
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].parent == deleteItem) {
      tree=tree.filter(item=>item.parent!=tree[i].id);
    };
  };
  tree=tree.filter(item=>item.parent!=deleteItem);
  document.getElementById(deleteItem).outerHTML = "";
  };
// add new item
  function addIt(addIt){
    let newId;
    let result = tree.map(a => Number(a.id));
    let count = result[result.length - 1];
        for ( let i = 1; i <= count; i++ ) {
          if (result.indexOf(i) == -1) {
            newId=i;
            break;
          }else {
             newId = +tree[tree.length-1].id+1;
          };
      };
    tree.push({id:newId,parent:addIt})
    //I do not see the content to convert the number into a string (id)
    let newItem = document.createElement('li');
    newItem.id = newId
    newItem.innerHTML =
    '<a>'+ newId +'</a><div class="actions"><button class="add" onclick="addIt(this.value)"  value="'+newId+'">add</button><button onclick="deleteIt(this.value)"  class="remove" value="'+ newId +'">remove</button ></div><ul class="vertical" id ="'+ newId +'"></ul>'
      document.getElementById(addIt).appendChild(newItem);
  };
