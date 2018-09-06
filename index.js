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

//returns true if at start of a selection
export function isStartSelection()
{
    if (!_selection.anchorOffset)
    {
        return true;
    }

    return false;
}

//return true if end of a selection or not a text node
export function isEndSelection()
{
    if (!_selection.anchorNode.data || _selection.anchorOffset==_selection.anchorNode.data.length)
    {
        return true;
    }

    return false;
}

export function randomO(amount,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",`https://www.random.org/integers/?num=1&min=1&max=${amount}&col=1&base=10&format=plain&rnd=new`);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(r.response);
        }
    };

    r.send();
}