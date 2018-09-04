//WhatDo main
export class WdMain extends React.Component
{
  constructor(props)
  {
    super(props);
    this.addChoice=this.addChoice.bind(this);
    this.mainKeys=this.mainKeys.bind(this);

    this.state={
      choices:[]
    };

    this.choicesId=0;
  }

  addChoice()
  {
    this.choicesId++;
    this.state.choices.push(this.choicesId);
    this.setState({choices:this.state.choices});
  }

  //main key handler
  mainKeys(e)
  {
    if (e.key=="Enter")
    {
      e.preventDefault();
      this.addChoice();
    }
  }

  render()
  {
    return (<>
      <div className="title"
        contentEditable=""
        onKeyDown={this.mainKeys}
      >
        どうしよう
      </div>

      {this.state.choices.map((x,i)=>{
        return <Choice number={i} key={x} mainKeys={this.mainKeys}/>;
      })}
    </>);
  }
}

//choice(int number,function mainKeys)
//number: the number of the choice that appears
//mainKeys: function from parent
class Choice extends React.Component
{
  render()
  {
    return (
      <div className="choice">
        <span>{this.props.number}</span>
        <div className="input" contentEditable="" onKeyDown={this.props.mainKeys}>sample</div>
      </div>
    );
  }
}