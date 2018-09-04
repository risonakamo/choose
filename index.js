import {WdMain} from "./wdmain";

window.onload=main;

function main()
{
    ReactDOM.render(React.createElement(WdMain),document.querySelector(".main-inputs"));
}
