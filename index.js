import {WdMain} from "./wdmain.js";

window.onload=main;

function main()
{
    ReactDOM.render(React.createElement(WdMain),document.querySelector(".wrap"));
}
