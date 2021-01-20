import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
import ReactGA from 'react-ga';
import List from 'react-list-select';
import IOUdescription from "./IOUdescription";
ReactGA.initialize('UA-161540415-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const h2a = web3.utils.hexToAscii;
const a2h = web3.utils.asciiToHex;

class ListIOU extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      valueSet: 0,
      getValue: "",
      currIss: 0,
      logs: [],
      name: "",
      symbol: "",
      myName: "",
      socialProfile: "",
      description: "",
      location: "",
      units: "",     
      issuer: "",
      curIOU: "",
      creditorAddr: "",
      descrDebt:"", 
      totalMinted: 0,
      totalBurned: 0,
      keywords: [],
      avRate: 0,
      allIssuers: [],
      IOUsList:[]
    };
  }

  handleChange(e) {
    let keyVal = {}
    keyVal[e.target.name] = e.target.value;
    this.setState( keyVal );
                 
  }

  handleChangeList(e) {
    let keyVal = {}
    keyVal["curIOUaddr"] = this.state.IOUsList[e].address;
    this.props.setState( keyVal );
    if ( typeof this.props.state.IOUsList[this.state.IOUsList[e]] == "undefined") {

      this.props.getValue();                 
   }
  }           
  

  handleChangeIssList(e) {
    let keyVal = {}
    keyVal["currIss"] = this.state.allIssuers[e];
    this.setState( keyVal );
                 
  }

  checkEnter(e, func) {
    if (e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    func.apply(this, [e]);
  }


  _addToLog(txt) {
    this.state.logs.push(txt);
    this.setState({ logs: this.state.logs });
  }

  


  async getIOUList() {
    await EmbarkJS.enableEthereum();
    const numberIOUs = await StoreIOUs.methods.getIOUstotal().call();
    let curIOU;  
 
     
    let cIOUsList =[];
    for (let n=0; n<numberIOUs; n++) {
      await StoreIOUs.methods.allIOU(n).call().then(_IOUaddr =>  {
              curIOU =  EmbarkJS.Blockchain.Contract({
                    abi: IOUs.options.jsonInterface,
                    address: _IOUaddr}) }).then(() =>  {
              curIOU.methods.name().call().then(_name =>
                          {
                            const curKeyVal= {
                              address: curIOU.options.address,
                              name: _name
                            }
                            cIOUsList.push(curKeyVal);
                            this.setState({IOUsList: cIOUsList});
                          })});      
    }
    
    
  }


  render() {
    this.getIOUList();
    //if ( this.state.IOUsList.length == 0) return (<div> IOUs list loadnig... </div>);
    return (<React.Fragment>
        
        
          <h3> List of IOUs </h3>          
          <Form>
          <FormGroup>

  
            <List class="pointer"
                items={this.state.IOUsList.map(_value => _value.name)}

                multiple={false}

                onChange={(e) => this.handleChangeList(e)}/>
                
          </FormGroup>
        </Form>
        <IOUdescription state={this.props.state}
                    setState={state => this.props.setState(state)} 
                    getValue={() => this.props.getValue()}   
        />       
  
      </React.Fragment>
    );
  }
}

export default ListIOU;
