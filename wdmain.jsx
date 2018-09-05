//WhatDo main
export class WdMain extends React.Component
{
  constructor(props)
  {
    super(props);
    this.addChoice=this.addChoice.bind(this);
    this.mainKeys=this.mainKeys.bind(this);

    this.state={
      choices:[] //choice IDs in order
    };

    this.choicesId=0; //the last used choice id
  }

  //give it key to insert after
  addChoice(insertAfter)
  {
    this.choicesId++;

    //insert new id after the insertafter id
    this.state.choices.splice(this.state.choices.indexOf(insertAfter)+1,0,this.choicesId);

    this.setState({choices:this.state.choices});
  }

  //main key handler.
  //but also needs cid.
  mainKeys(e,cid)
  {
    if (e.key=="Enter")
    {
      e.preventDefault();
      this.addChoice(cid);
    }
  }

  render()
  {
    return (<>
      <div className="title"
        contentEditable=""
        onKeyDown={(e)=>{
          this.mainKeys(e,0);
        }}
      >
        どうしよう
      </div>

      {this.state.choices.map((x,i)=>{
        return <Choice number={i+1} key={x} cid={x} mainKeys={this.mainKeys} addChoice={this.addChoice}/>;
      })}
    </>);
  }
}

//choice(int number,int cid,function mainKeys,function addChoice)
//number: the number of the choice that visually appears on the left side
//cid: unique id of the choice. should be same as react-key
//mainKeys: function from parent
//addChoice: function from parent
class Choice extends React.Component
{
  render()
  {
    return (
      <div className="choice">
        <span>{this.props.number}</span>
        <div className="input"
          contentEditable=""
          onKeyDown={(e)=>{
            this.props.mainKeys(e,this.props.cid);
          }}
        >
          sample
        </div>
      </div>
    );
  }
}