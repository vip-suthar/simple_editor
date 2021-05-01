(function () {
    const editor = document.querySelector("#textarea");
    var currentSelection = [];
    editor.addEventListener('mouseup', () => {
        currentSelection = myCaret.setState();
    });
    const anyArray = ['b', 'i', 'u', 's'];
    const elements = document.querySelectorAll('#format');
    for (const key in elements) {
        if (key < elements.length) {
            let element = elements[key];
            element.addEventListener('click', () => {
                if (Array.isArray(currentSelection) && currentSelection.length != 0) {
                    newAction.format(currentSelection,anyArray[key]);
                }
            })
        }
    }
    const lists = document.querySelectorAll("#list");
    const anyArray2 = ['ul', 'ol']
    for (const key in lists) {
        if (key < elements.length) {
            let list = lists[key];
            list.addEventListener('click', () => {
                if (Array.isArray(currentSelection) && currentSelection.length != 0) {
                    newAction.format(currentSelection, anyArray2[key]);
                }
            })
        }
    }

    document.querySelector('#link').addEventListener('click', () => {
        let href = document.querySelector('#link_addr');
        if (Array.isArray(currentSelection) && currentSelection.length != 0) {
            if (href.value !== "") {
                newAction.format(currentSelection,'a', href.value);
                document.querySelector('#link_addr').value = '';
            }
            else href.focus();
        }
    })
    document.querySelector('#link_addr').addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            if (Array.isArray(currentSelection) && currentSelection.length != 0) {
                if (document.querySelector('#link_addr').value !== "") {
                    newAction.format(currentSelection,'a', document.querySelector('#link_addr').value);
                    document.querySelector('#link_addr').value = '';
                }
            }
        }
    });

    const textColor = document.querySelector('#tools>#tc');
    textColor.addEventListener('click', () => {
        textColor.children[0].click();
        textColor.children[0].addEventListener('change', () => {
            if (Array.isArray(currentSelection) && currentSelection.length != 0) {
                textColor.style.color = textColor.children[0].value;
                newAction.format(currentSelection, 'tc', textColor.children[0].value );
            }
        })
    })

    const backgroundColor = document.querySelector('#tools>#bgc');
    backgroundColor.addEventListener('click', () => {
        backgroundColor.children[0].click();
        backgroundColor.children[0].addEventListener('change', () => {
            if (Array.isArray(currentSelection) && currentSelection.length != 0) {
                backgroundColor.style.backgroundColor = backgroundColor.children[0].value;
                newAction.format(currentSelection, 'bgc', backgroundColor.children[0].value );
            }
        })
    })

    const addTmg = document.querySelector('#tools>#addImg');
    addTmg.addEventListener('click', ()=>{
        document.querySelector('#tools>#addImg+input[type="file"]').click();
        if (Array.isArray(currentSelection) && currentSelection.length != 0) {
            document.querySelector('#tools>#addImg+input[type="file"]').addEventListener('change',()=>{
                newAction.format(currentSelection, 'img', document.querySelector('#tools>#addImg+input[type="file"]').files);
            })
            
            
        }
    })

    editor.addEventListener('keydown', vscodeSort.processKeyEvent);
    editor.addEventListener('keyup', () => {
        currentSelection = myCaret.setState();
        editor.normalize();
    })
})();