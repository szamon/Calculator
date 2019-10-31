import React from 'react';
import Button from './Button.jsx';
import Display from  './Display.jsx';
import './main.css';

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            prevDisplay: "", 
            currDisplay: 0,
            enteringVal: false,
            enteringOp: false,
            summed: false
        }
        this.lengthCheck=this.lengthCheck.bind(this);
        this.inputNum=this.inputNum.bind(this);
        this.inputOperator=this.inputOperator.bind(this);
        this.inputDecimal=this.inputDecimal.bind(this);
        this.inputEqual=this.inputEqual.bind(this);
        this.clearDisplay=this.clearDisplay.bind(this);
    }
    lengthCheck(val){
        let length = val.length + 1 || 1; 
        return length < 16
    }
    inputNum(e){
        //canI checks if the number entered by user isn`t to long
        let canI = this.lengthCheck(this.state.currDisplay);
        let val = e.target.innerText;
        if(canI){
            //if user starts to enter the value (where first value !== "0") this.state.enteringValue: true and currdDisplay is updated
            this.setState(this.state.enteringVal ? {currDisplay: this.state.currDisplay + val} : {currDisplay: val, enteringVal: val==="0" ? false : true, enteringOp: false});
        }
    }
    inputDecimal(e){
        //canI checks if the number entered by user isn`t to long
        let canI = this.lengthCheck(this.state.currDisplay);
        let val = e.target.innerText;
        let patt = /\./g;
        let hasDots = patt.test(this.state.currDisplay);
        if(canI){
            if(!hasDots){
                this.setState({currDisplay: this.state.currDisplay === "" || this.state.summed ? 0 + val : this.state.currDisplay + val, enteringVal: true, enteringOp: false});
            };
        };
    }
    inputOperator(e){
        let val = e.target.innerText;
        if(this.state.summed){
             //if equal operator was pressed
            this.setState({prevDisplay: this.state.currDisplay + val, currDisplay: "", enteringOp: true, summed: false})
        }else{
            //if I enter operator - i can switch for another before entering number,
            //then when I enter number and operator again eval takes place and I can choose operator again
            this.state.enteringOp ? this.setState({prevDisplay: this.state.prevDisplay.slice(0, -1) + val}) : this.setState({prevDisplay: this.state.prevDisplay + Number(this.state.currDisplay) + val, currDisplay: "", enteringVal: false, enteringOp: true});
        }
    }
    inputEqual(){
        this.setState({currDisplay: Math.round(eval(this.state.prevDisplay + Number(this.state.currDisplay))*1000000)/1000000, prevDisplay: "", enteringVal: false, enteringOp: false, summed: true});
    }
    clearDisplay(){
        this.setState({
            currDisplay: 0,
            prevDisplay: "",
            enteringVal: false
        })
    }
    render(){
        return <div className="calculator">
            <Display currDisplay={this.state.currDisplay} prevDisplay={this.state.prevDisplay} /> 
            <div className="numBoard">       
                <Button id="seven" className="button button__numBoard" onClick={this.inputNum} text={7} />
                <Button id="eight" className="button button__numBoard" onClick={this.inputNum} text={8} />
                <Button id="nine" className="button button__numBoard" onClick={this.inputNum} text={9} />
                <Button id="four" className="button button__numBoard" onClick={this.inputNum} text={4} />
                <Button id="five" className="button button__numBoard" onClick={this.inputNum} text={5} />
                <Button id="six" className="button button__numBoard" onClick={this.inputNum} text={6} />
                <Button id="one" className="button button__numBoard" onClick={this.inputNum} text={1} />
                <Button id="two" className="button button__numBoard" onClick={this.inputNum} text={2} />
                <Button id="three" className="button button__numBoard" onClick={this.inputNum} text={3} />
                <Button id="zero" className="button button__zero button__numBoard" onClick={this.inputNum} text={0} />
                <Button id="decimal" className="button button__numBoard" onClick={this.inputDecimal} text={'.'} />
            </div>
            <div className="opBoard">
                <Button id="clear" className="button button__AC" onClick={this.clearDisplay} text={'AC'} />
                <Button id="multiply" className="button button__opBoard" onClick={this.inputOperator} text={'*'} />
                <Button id="divide" className="button button__opBoard" onClick={this.inputOperator} text={'/'} />
                <Button id="add" className="button button__opBoard" onClick={this.inputOperator} text={'+'} />
                <Button id="equals" className="button button__equals button__opBoard" onClick={this.inputEqual} text={'='} />
                <Button id="subtract" className="button button__opBoard" onClick={this.inputOperator} text={'-'} />
            </div>
        </div>
    }
}

export default Calculator;