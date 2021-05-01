class ActionTask{
    constructor(){

    }
    backColor(color, content){
        let node;
        node = document.createElement('span');
        node.style.backgroundColor = color;
        node.innerHTML = content;
        return node;
    }
    bold(content, nodeName, range){
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
}