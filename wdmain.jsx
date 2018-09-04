//WhatDo main
export class WdMain extends React.Component
{
  render()
  {
    return (<>
      <div className="title" contentEditable="">どうしよう</div>
      <Choice number={1}/>
      <Choice number={2}/>
    </>);
  }
}

//choice(int number)
//number: the number of the choice that appears
class Choice extends React.Component
{
  render()
  {
    return (
      <div className="choice">
        <span>{this.props.number}</span>
        <div className="input" contentEditable="">sample</div>
      </div>
    );
  }
}