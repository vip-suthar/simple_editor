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
       console.log("cmd lvl 1 called");
     }
     else if (commandLevel===0) {
      console.log("cmd lvl 0 called");
     }
     else{
      console.log("cmd lvl -1 called, Key:"+e.code)
     }
     
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
  