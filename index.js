import {WdMain} from "./wdmain.js";

window.onload=main;
var _selection=window.getSelection();
var _range=document.createRange();

function main()
{
    ReactDOM.render(React.createElement(WdMain),document.querySelector(".wrap"));
}

//move cursor to end of current text node
export function cursorEnd()
{
    //if it is a text node
    if (_selection.anchorNode.data)
    {
        _range.setStart(_selection.anchorNode,_selection.anchorNode.data.length);
        _range.setEnd(_selection.anchorNode,_selection.anchorNode.data.length);
        _selection.removeAllRanges();
        _selection.addRange(_range);
    }
}