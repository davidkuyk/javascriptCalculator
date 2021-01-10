class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDisplay: 0,
      currentNum: 0,
      prevNum: null,
      defaultDisplay: true,
      currentResult: null,
      equalPress: 0 };

    this.buttonClick = this.buttonClick.bind(this);
    this.equalIt = this.equalIt.bind(this);
    this.reset = this.reset.bind(this);
  }
  buttonClick(e) {
    console.log("----------------------------------------");
    let buttonValue = e.target.innerHTML;
    console.log("buttonValue: " + buttonValue);
    console.log("prevNum: " + this.state.prevNum);

    {/*SYMBOLS*/}
    if (e.target.classList.contains("sym")) {
      console.log("button is a symbol");

      if (buttonValue === "x") {
        buttonValue = "*";
      }

      if (this.state.prevNum === "=") {
        console.log("previousNum was an equal sign and current num is symbol");
        this.setState(state => ({
          currentDisplay: state.currentResult + buttonValue,
          currentNum: buttonValue,
          prevNum: state.currentNum }));

      } else if (this.state.prevNum.includes(buttonValue)) {
        console.log("two identical symbols in a row, so didn't add the new one");
      } else {
        console.log("default symbol behavior");
        if (this.state.prevNum === null) {
          console.log("prevnum is null so prevNum is set to button val");
          this.setState(state => ({
            currentDisplay: state.currentDisplay + buttonValue,
            currentNum: buttonValue,
            prevNum: buttonValue }));

        } else if (/[1-9]/.test(this.state.prevNum) && buttonValue === ".") {
          console.log("prevnum is a number and button is decimal, so concatenate");
          this.setState(state => ({
            currentDisplay: state.currentDisplay + buttonValue,
            currentNum: state.currentNum + buttonValue,
            prevNum: state.currentNum }));

        } else {
          console.log("prevnum is something so it's set to currentNum");
          this.setState(state => ({
            currentDisplay: state.currentDisplay + buttonValue,
            currentNum: buttonValue,
            prevNum: state.currentNum }));

        }
      }

      {/*NUMBERS*/}
    } else if (e.target.classList.contains("num")) {
      console.log("button is a number");
      if (this.state.defaultDisplay === true) {
        console.log("erased default display and replaced it with button");
        this.setState(state => ({
          currentDisplay: buttonValue,
          currentNum: buttonValue,
          prevNum: state.currentNum }));

      } else if (/^0/.test(this.state.currentNum) && buttonValue === "0") {
        console.log("currentNum starts with zero");
      } else if (this.state.prevNum === "+" ||
      this.state.prevNum === "-" ||
      this.state.prevNum === "/" ||
      this.state.prevNum === "*") {
        console.log("prevNum is a symbol, so don't concatenate");
        this.setState(state => ({
          currentDisplay: state.currentDisplay + buttonValue,
          currentNum: buttonValue,
          prevNum: state.currentNum }));

      } else {
        console.log("currentNum doesn't start with zero, so concatenated it with the currentNum");
        this.setState(state => ({
          currentDisplay: state.currentDisplay + buttonValue,
          currentNum: state.currentNum + buttonValue,
          prevNum: state.currentNum }));

      }
      console.log("got to the end somehow");
    }
    this.setState(state => ({
      prevNum: state.currentNum,
      defaultDisplay: false }));

  }

  equalIt() {
    let result = this.state.currentDisplay.replace(/([\+\/\*\-]+)([?=\+\/\*])/g, '$2');
    result = eval(result);
    const strResult = result.toString();
    console.log("equal sign pressed:" + result);
    this.setState(state => ({
      currentDisplay: state.currentDisplay + "=" + strResult,
      currentNum: strResult,
      currentResult: strResult,
      prevNum: "=",
      equalPress: state.equalPress + 1 }));

  }

  reset() {
    console.log("numbers reset");
    this.setState(state => ({
      currentNum: 0,
      currentDisplay: 0,
      prevNum: 0,
      currentResult: null,
      equalPress: 0,
      defaultDisplay: true }));

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "container-fluid" }, /*#__PURE__*/
      React.createElement("div", { class: "container" }, /*#__PURE__*/
      React.createElement("div", { class: "row", id: "sofar" }, this.state.currentDisplay), /*#__PURE__*/
      React.createElement("div", { class: "row", id: "display" },
      this.state.currentNum), /*#__PURE__*/

      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("div", { class: "col-md-6 but", id: "clear", onClick: this.reset }, "AC"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but sym", id: "divide", onClick: this.buttonClick }, "/"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but sym", id: "multiply", onClick: this.buttonClick }, "x")), /*#__PURE__*/

      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but num", id: "seven", onClick: this.buttonClick }, "7"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but num", id: "eight", onClick: this.buttonClick }, "8"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but num", id: "nine", onClick: this.buttonClick }, "9"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but sym", id: "subtract", onClick: this.buttonClick }, "-")), /*#__PURE__*/

      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but num", id: "four", onClick: this.buttonClick }, "4"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but num", id: "five", onClick: this.buttonClick }, "5"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but num", id: "six", onClick: this.buttonClick }, "6"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-3 but sym", id: "add", onClick: this.buttonClick }, "+")), /*#__PURE__*/

      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("div", { class: "col-md-9" }, /*#__PURE__*/
      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("div", { class: "col-md-4 but num", id: "one", onClick: this.buttonClick }, "1"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-4 but num", id: "two", onClick: this.buttonClick }, "2"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-4 but num", id: "three", onClick: this.buttonClick }, "3")), /*#__PURE__*/

      React.createElement("div", { class: "row" }, /*#__PURE__*/
      React.createElement("div", { class: "col-md-8 but num", id: "zero", onClick: this.buttonClick }, "0"), /*#__PURE__*/
      React.createElement("div", { class: "col-md-4 but sym", id: "decimal", onClick: this.buttonClick }, "."))), /*#__PURE__*/


      React.createElement("div", { class: "col-md-3 but sym", id: "equals", onClick: this.equalIt }, "=")))));




  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, { class: "App" }), document.getElementById('root'));