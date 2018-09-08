import { cursorEnd, isStartSelection, isEndSelection, randomO } from "./index.js"; //WhatDo main

export class WdMain extends React.Component {
  constructor(props) {
    super(props);
    this.addChoice = this.addChoice.bind(this);
    this.mainKeys = this.mainKeys.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);
    this.checkTitleEmpty = this.checkTitleEmpty.bind(this);
    this.state = {
      choices: [] //choice IDs in order
      //outputMode:false* if the system is in output mode

    };
    this.titleRef = React.createRef(); //the top most title block ref

    this.titlePlaceholderRef = React.createRef(); //title place holder ref

    this.choiceHolderRef = React.createRef();
    this.titleEmpty = true; //if the title is empty. speed optimisation

    this.choicesId = 0; //the last used choice id

    this.choiceRefs = {}; //refs of choices with cid as key
  }

  componentDidMount() {
    this.titleRef.current.focus();
  }

  componentDidUpdate() {
    if (this.state.outputMode) {
      anime({
        targets: this.choiceHolderRef.current,
        height: 0,
        duration: 200,
        easing: "easeOutQuad"
      });
    } else {
      this.choiceHolderRef.current.style.height = "";
    }
  } //give it key to insert after


  addChoice(insertAfter) {
    var inc = 1;
    this.choicesId++; //if at start of selection, new choice will be added before the insertAfter

    if (isStartSelection()) {
      inc = 0;
    }

    if (insertAfter > 0) {
      //insert new id after the insertafter id if it isnt 0
      this.state.choices.splice(this.state.choices.indexOf(insertAfter) + inc, 0, this.choicesId);
    } else {
      //for cid less than 0 (the title)
      this.state.choices.splice(0, 0, this.choicesId);
    }

    this.setState({
      choices: this.state.choices
    });
  } //delete the given choice ID


  deleteChoice(cid) {
    delete this.choiceRefs[cid];
    var index = this.state.choices.indexOf(cid);
    this.state.choices.splice(index, 1);

    if (index != 0) {
      this.choiceRefs[this.state.choices[index - 1]].focus();
    } else {
      this.titleRef.current.focus();
      cursorEnd();
    }

    this.setState({
      choices: this.state.choices
    });
  } //main key handler for choices and title bar.
  //but also needs cid.
  //give isEmpty as result of checkempty, whether or not
  //the choice textbox is empty.


  mainKeys(e, cid, isEmpty = false) {
    if (e.key == "Escape") {
      this.reset();
      return;
    } //mainkey operations do not trigger in output mode


    if (this.state.outputMode) {
      return;
    }

    if (e.key == "Enter") {
      e.preventDefault();

      if (e.ctrlKey) {
        this.getOutput();
      } else if (!isEmpty) {
        this.addChoice(cid);
      }
    } else if (e.key == "ArrowUp") {
      if (isStartSelection()) {
        var focusindex = this.state.choices.indexOf(cid) - 1;

        if (focusindex < 0) {
          this.titleRef.current.focus();
        } else {
          this.choiceRefs[this.state.choices[focusindex]].focus();
        }
      }
    } else if (e.key == "ArrowDown") {
      if (isEndSelection()) {
        this.choiceRefs[this.state.choices[this.state.choices.indexOf(cid) + 1]].focus();
      }
    } else if (e.key == "Backspace" && window.getSelection().anchorOffset == 0 && cid > 0) {
      e.preventDefault();
      this.deleteChoice(cid);
    }
  } //check if the title is empty and change the placeholder class as necessary


  checkTitleEmpty() {
    if (this.state.outputMode) {
      return;
    }

    if (this.titleRef.current.innerText.length > 0 && this.titleEmpty) {
      this.titlePlaceholderRef.current.classList.add("hidden");
      this.titleEmpty = false;
    } else if (this.titleRef.current.innerText.length == 0 && !this.titleEmpty) {
      this.titlePlaceholderRef.current.classList.remove("hidden");
      this.titleEmpty = true;
    }
  } //enter output mode.


  getOutput() {
    if (this.state.choices.length < 2) {
      return;
    }

    var initialHeight = this.titleRef.current.scrollHeight;
    this.titleRef.current.style.height = initialHeight + "px";
    this.setState({
      outputMode: 1
    }, () => {
      randomO(this.state.choices.length, choiceInt => {
        var res = `${this.titleRef.current.innerText}`;
        var index = 1;
        var selectString;

        for (var x in this.choiceRefs) {
          selectString = index == choiceInt ? ">" : "";
          res += `<br>${selectString}${index} ${this.choiceRefs[x].getText()}`;
          index++;
        }

        this.titleRef.current.innerHTML = res;

        anime({
          targets: this.titleRef.current,
          height: this.titleRef.current.scrollHeight,
          duration: 300,
          easing: "easeOutCubic"
        }).complete = () => {
          this.titleRef.current.style.height = "";
        };

        this.titleRef.current.focus();
      });
    });
  }

  reset() {
    this.choiceRefs = {};
    this.titleRef.current.innerHTML = "";
    this.titleRef.current.focus();
    this.setState({
      choices: [],
      outputMode: false
    });
  }

  render() {
    var enderShow = "";

    if (this.state.choices.length >= 2) {
      enderShow = "show";
    }

    var enderMessages = ["Ctrl+Enter to Choose", "Esc to Reset"];
    var enderMessage = 0;

    if (this.state.outputMode) {
      enderMessage = 1;
    }

    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "title-outer"
    }, React.createElement("div", {
      className: "title",
      contentEditable: "",
      onKeyDown: e => {
        this.checkTitleEmpty();
        this.mainKeys(e, 0);
      },
      onKeyUp: this.checkTitleEmpty,
      ref: this.titleRef
    }), React.createElement("div", {
      className: "title-placeholder",
      ref: this.titlePlaceholderRef
    }, "well, what is it?")), React.createElement("div", {
      className: "choices",
      ref: this.choiceHolderRef
    }, this.state.choices.map((x, i) => {
      return React.createElement(Choice, {
        number: i + 1,
        key: x,
        cid: x,
        mainKeys: this.mainKeys,
        addChoice: this.addChoice,
        ref: ref => {
          if (!this.choiceRefs[x] && ref) {
            this.choiceRefs[x] = ref;
            ref.focus();
          }
        }
      });
    })), React.createElement("div", {
      className: `ender ${enderShow}`
    }, React.createElement("i", null, enderMessages[enderMessage])));
  }

} //choice(int number,int cid,function mainKeys,function addChoice)
//number: the number of the choice that visually appears on the left side
//cid: unique id of the choice. should be same as react-key
//mainKeys: function from parent
//addChoice: function from parent

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
    this.maininput = React.createRef();
  } //focus on the main input


  focus() {
    this.maininput.current.focus();
    cursorEnd();
  } //disallow creation of another choice if
  //this choice is empty


  checkEmpty() {
    if (this.maininput.current.innerText == "") {
      return true;
    }

    return false;
  }

  getText() {
    return this.maininput.current.textContent;
  }

  render() {
    return React.createElement("div", {
      className: "choice"
    }, React.createElement("span", null, this.props.number), React.createElement("div", {
      className: "input",
      contentEditable: "",
      onKeyDown: e => {
        this.props.mainKeys(e, this.props.cid, this.checkEmpty());
      },
      ref: this.maininput
    }));
  }

}