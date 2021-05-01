class Caret {
    setState() {
        var range, selection;

        if (window.getSelection && window.getSelection().rangeCount) {
            selection = getSelection();
            range = selection.getRangeAt(0).cloneRange();
        }
        if (!range && document.selection) {
            selection = document.selection
            range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
        }
        this.currentState = [range.startContainer, range.startOffset, range.endContainer, range.endOffset];
        return this.currentState;
    }
}
const myCaret = new Caret();

class Action {
    format(sel, task, attr) {
        let range = document.createRange();
        range.setStart(sel[0], sel[1]);
        range.setEnd(sel[2], sel[3]);
        var content = range.toString();
        
        //range.deleteContents();
        if (task == 'b' || task == 'i' || task == 'u' || task == 's') this.togglebff(content, task, range);
        else if (task == 'ol' || task == 'ul') {
            this.list(content, task, range);
        }
        else if (task == 'a') {
            let newNode = this.link(content, attr);
            range.insertNode(newNode);
            range.setEndAfter(newNode);
        }
        else if (task == 'tc' || task == 'bgc') {
            let newNode = this.color(content, task, attr);
            range.insertNode(newNode);
            range.setEndAfter(newNode);
        }
        else if (task == 'img') {
            console.log(attr);
            this.addImg(attr, range);
            
        }
        
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
    togglebff(content, nodeName, range) {
        let node;
        let startElem = range.startContainer.nodeType == 3 ? range.startContainer.parentElement : range.startContainert;
        let endElem = range.endContainer.nodeType == 3 ? range.endContainer.parentElement : range.endContainer

        if (startElem.tagName == nodeName.toUpperCase() && endElem.tagName == nodeName.toUpperCase()) {
            let content_before = startElem.innerHTML.slice(0,range.startOffset);
            let content_after = endElem.innerHTML.slice(range.endOffset);
            content = content !='' ? content : " ";
            startElem.remove();
            node = document.createTextNode(content);
            let node_before = document.createElement(nodeName);
            node_before.innerHTML = content_before;
            let node_after = document.createElement(nodeName);
            node_after.innerHTML = content_after;
            range.insertNode(node_after);
            range.insertNode(node);
            range.insertNode(node_before);
        }
        else{
            node = document.createElement(nodeName);
            if (content === "") {
                content = "&nbsp;";
            }
            node.innerHTML = content;
            range.deleteContents();
            range.insertNode(node);
        }
        range.setEndAfter(node);
        range.collapse(false);
    }
    list(content, nodeName, range) {
        let node = document.createElement(nodeName);
        let listItem = document.createElement('li');
        listItem.innerHTML = content;
        node.append(listItem);
        range.insertNode(node);
        range.setEndAfter(listItem);
    }
    link(content, link_addr) {
        var node = document.createElement('a');
        node.href = link_addr;
        if (content === "") node.innerHTML = link_addr;
        else node.innerHTML = content;
        return node;
    }
    color(content, where, value) {
        var node = document.createElement('span');
        if (where === 'tc') node.style.color = value;
        else if (where === 'bgc') node.style.backgroundColor = value;
        node.innerHTML = content;
        return node;
    }
    addImg(value, range) {
        if (value.length > 0 && value[0].type.match("image.*")) {
            var node;
            let x = new Promise((res, rej) => {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(value[0]);
                fileReader.onload = function (e) {
                    node = document.createElement('img');
                    node.src = e.target.result;
                    node.width = "250";
                    node.style.display = "block";
                    res();
                    rej();
                }
            });
            x.then(() => {
                range.insertNode(node);
                range.setEndAfter(node);
            },(err) => {
                console.log(err);
            })
        }

    }
}

const newAction = new Action();

/*
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

*/