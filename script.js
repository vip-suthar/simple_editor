class Caret{
  setState() {
    var range,selection;

    if (window.getSelection &&window.getSelection().rangeCount) {
      selection = getSelection();
      range = selection.getRangeAt(0).cloneRange();
    }
    if (!range && document.selection) {
        selection = document.selection
        range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
    }
    this.currentState = [range.startContainer,range.startOffset,range.endContainer,range.endOffset];
    return this.currentState;
}
reIntTxt(node){
  if (node.nodeType === 3) {
    if (node.previousSibling && node.previousSibling.nodeType === 3) {
      node.previousSibling.append(node);
      //node.remove();
    }
    if (node.nextSibling && node.nextSibling.nodeType === 3) {
      node.append(node.nextSibling);
      //node.nextSibling.remove();
    }
  }
   
}
}

const myCaret = new Caret();



class Shortcuts{
  static modifiers = {
   ctrlKey:'ctrl',
   shiftKey:'shift',
   altKey:'alt' ,
   metaKey:'meta'  //Meta is Mac specific
 };
 static special_keys = {
  'esc':27, 'tab':9,'space':32, 'enter':13, 'backspace':8, 'delete':46,

  'scroll_lock':145, 'caps_lock':20, 'num_lock':144, 'pause':19, 'insert':45,'home':36, 'end':35, 'page_up':33, 'page_down':34,
  
  'left':37,'up':38,'right':39,'down':40,
  
  'f1':112,'f2':113,'f3':114, 'f4':115, 'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123
  };
 
 shortcutsList = {};
 constructor(name){
   this.similarTo = name;
 }
 addShortcut(shortcut){
   for (const sName in shortcut) {
     this.shortcutsList[sName] = shortcut[sName];
   }
   return this.shotcutsList;
 }
 getShortcut = name => this.shortcutsList[name] ;
 processKeyEvent = (e)=>{
   var commandKey = '';
   var commandLevel= 0;
   var special_keys_codes = Object.values(Shortcuts.special_keys);
   for (const keyName in Shortcuts.modifiers) {
      if (e[keyName] && !(e['key']=="Control" || e['key']=="Shift" || e['key']=="Alt" || e['key']=="Meta")){commandKey += Shortcuts.modifiers[keyName]+"_";}
   }
   if (commandKey !=''){
     commandLevel=2;
     if (commandKey =='shift_' && !special_keys_codes.includes(e.keyCode)) commandLevel=0;
   }
   else{
     commandLevel = 0;
     if (special_keys_codes.includes(e.keyCode)) commandLevel=1;
     if (e['key']=="Control" || e['key']=="Shift" || e['key']=="Alt" || e['key']=="Meta") commandLevel = -1;
   }

   commandKey += e.code;
   if (commandLevel===2) {
    e.preventDefault();
    // console.log("cmd lvl 2 called");
    if (this.getShortcut(commandKey)) (this.getShortcut(commandKey))();
    else console.log("No command defined");
   }
   else if (commandLevel===1) {
    // console.log("cmd lvl 1 called");
    if (e.keyCode>=37 && e.keyCode<=40) /* setCaret(e.keyCode) */;
    else e.preventDefault = false;
   }
   else if (commandLevel===0) {
    // console.log("cmd lvl 0 called");
    e.target.innerHTML += e.key;
    console.log("cmd lvl 0 called")
   }
   else{
    console.log("cmd lvl -1 called, Key:"+e.code)
   }
   
  //  currentSelection = myCaret.setState();
  //  console.log(currentSelection[0].previousSibling)
  //  console.log(currentSelection[0].nextSibling)
  //  myCaret.reIntTxt(currentSelection[0]);
  //  myCaret.reIntTxt(currentSelection[2]);
 }
}

// vs code shortcuts
const vscodeSort = new Shortcuts('vscode');
(function() {
  const sel = window.getSelection();
  const range = document.createRange();
  const textarea = document.querySelector("#textarea");

  vscodeSort.addShortcut({
  ctrl_KeyA: ()=>{
    
    range.setStart(textarea.firstChild, 0);
    range.setEnd(textarea.lastChild,textarea.lastChild.nodeValue.length);
    sel.removeAllRanges();
    sel.addRange(range);
  },
  ctrl_KeyC: ()=>{
    navigator.clipboard.writeText(sel.getRangeAt(0).toString()).then(function() {
      // copy success code here
    }, function(err) {
      // copy failed code here
    });
  }
})
})();

/* 
*
*code which is working.
*
*/
const el = document.querySelector("#textarea");
const format = (sel, node)=>{
  var range = document.createRange();
  range.setStart(sel[0],sel[1]);
  range.setEnd(sel[2],sel[3]);
  var oldContent = range.toString();
  range.deleteContents();
  var newContent = document.createElement(node);
  if (oldContent==="") {
    oldContent = "&nbsp;";
  }
  newContent.innerHTML = oldContent;
  range.insertNode(newContent);
  range.setEndAfter(newContent);
  range.collapse(false);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  console.log(range);
}

const addList = (sel, node)=>{
  var range = document.createRange();
  range.setStart(sel[0],sel[1]);
  range.setEnd(sel[2],sel[3]);
  var oldContent = range.toString();
  range.deleteContents();
  var newContent = document.createElement(node);
  let innerContent = document.createElement('li');
  innerContent.innerHTML = oldContent;
  newContent.append(innerContent);
  range.insertNode(newContent);
  range.setEndAfter(innerContent);
  range.collapse(false);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  console.log(range);
}

const addImage = ()=>{
  document.querySelector('#tools>input[type="file"]').click();
  let sel = document.getSelection();
  if (sel.rangeCount > 0) {
    var range = sel.getRangeAt(0);
    var filesSelected = document.querySelector('#tools>input[type="file"]').files;
    if (filesSelected.length > 0 && filesSelected[0].type.match("image.*")) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(filesSelected[0]);
      fileReader.onload = function(e){
        let img = document.createElement("img");
        img.src = e.target.result;
        img.width="250";
        img.style.display="block";
        range.insertNode(img);
        }
      }
    }
}

const addLink = (sel, value)=>{
  var range = document.createRange();
  range.setStart(sel[0],sel[1]);
  range.setEnd(sel[2],sel[3]);
  var oldContent = range.toString();
  range.deleteContents();
  var newContent = document.createElement('a');
  newContent.href = value;
  if (oldContent ==="") newContent.innerHTML = value;
  else newContent.innerHTML = oldContent;
  range.insertNode(newContent);
  range.setEndAfter(newContent);
  range.collapse(false);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  console.log(range);
}

const addColor = (sel, value, where)=>{
  var range = document.createRange();
  range.setStart(sel[0],sel[1]);
  range.setEnd(sel[2],sel[3]);
  var oldContent = range.toString();
  range.deleteContents();
  var newContent = document.createElement('span');
  if (where === 'tc') newContent.style.color = value;
  else if (where === 'bgc') newContent.style.backgroundColor = value;
  newContent.innerHTML = oldContent;
  range.insertNode(newContent);
  range.setEndAfter(newContent);
  range.collapse(false);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  console.log(range);
}

  //        caret                 //
  
  var currentSelection = [];
  el.addEventListener('blur', myCaret.getState);
  el.addEventListener('mouseup',()=>{
    currentSelection= myCaret.setState();
  });
  const anyArray = ['b','i','u','s'];
  const elements = document.querySelectorAll('#format');
  for (const key in elements) {
    if (key < elements.length) {
      let element = elements[key];
      element.addEventListener('click',()=>{
        if (Array.isArray(currentSelection) && currentSelection.length != 0) {
          format(currentSelection, anyArray[key]);
        }
      })
    }
  }
  
  const lists = document.querySelectorAll("#list");
  const anyArray2 = ['ul','ol']
  for (const key in lists) {
    if (key < elements.length) {
      let list = lists[key];
      list.addEventListener('click',()=>{
        if (Array.isArray(currentSelection) && currentSelection.length != 0) {
          addList(currentSelection, anyArray2[key]);
        }
      })
    }
  }

  document.querySelector('#link').addEventListener('click',()=>{
    let href = document.querySelector('#link_addr');
    if (Array.isArray(currentSelection) && currentSelection.length != 0) {
      if (href.value!=="") {
        addLink(currentSelection,href.value);
        document.querySelector('#link_addr').value = '';
      }
      else href.focus();
    }
  })
  document.querySelector('#link_addr').addEventListener('keydown',(e)=>{
    if (e.keyCode == 13) {
      if (Array.isArray(currentSelection) && currentSelection.length != 0) {
        if (document.querySelector('#link_addr').value!=="") {
        addLink(currentSelection,document.querySelector('#link_addr').value);
        document.querySelector('#link_addr').value = '';
      }
      }
    }
  });

  const textColor = document.querySelector('#tools>#tc');
  textColor.addEventListener('click',()=>{
    textColor.children[0].click();
    textColor.children[0].addEventListener('change',()=>{
      if (Array.isArray(currentSelection) && currentSelection.length != 0) {
        textColor.style.color= textColor.children[0].value;
        addColor(currentSelection, textColor.children[0].value, 'tc');
      }
    })
  })

  const backgroundColor = document.querySelector('#tools>#bgc');
  backgroundColor.addEventListener('click',()=>{
    backgroundColor.children[0].click();
    backgroundColor.children[0].addEventListener('change',()=>{
      if (Array.isArray(currentSelection) && currentSelection.length != 0) {
        backgroundColor.style.backgroundColor= backgroundColor.children[0].value;
        addColor(currentSelection, backgroundColor.children[0].value, 'bgc');
      }
    })
  })

  el.addEventListener('keydown',vscodeSort.processKeyEvent)
  // document.querySelector('#addNote').addEventListener('click',()=>{
  //   if (Array.isArray(currentSelection) && currentSelection.length != 0) {
  //     if (currentSelection[0].nodeType === 3) {
  //       console.log(currentSelection[0])
  //       console.log(currentSelection[0].nextSibling)
  //     }
  //     console.log(currentSelection[0].nodeType)
  //   }
  // })
  // document.querySelector('#tools>#addImg').addEventListener('click',()=>{
  //   addImage()
  // })
  
  /* function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
} */