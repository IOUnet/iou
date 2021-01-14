import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
import ReactGA from 'react-ga';
import List from 'react-list-select';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
import IOUdescription from "./IOUdescription"
ReactGA.initialize('UA-161540415-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const h2a = web3.utils.hexToAscii;
const a2h = web3.utils.asciiToHex;

class MintIOU extends React.Component {

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
      IOUsList: [],
      curIOU: "",
      creditorAddr: "",
      descrDebt:"", 
      totalMinted: 0,
      totalBurned: 0,
      keywords: [],
      avRate: 0,
      allIssuers: [],
      orderByField:"",
      orderByDirection:""
    };
  }

  handleChange(e) {
    let keyVal = {}
    keyVal[e.target.name] = e.target.value;
    this.setState( keyVal );
                 
  }

  handleChangeList(e) {
    let keyVal = {}
    keyVal["getValue"] = this.state.IOUsList[e];
    this.setState( keyVal );
                 
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


  async getIOUList(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();

    StoreIOUs.methods.getIOUList(this.state.currIss).call().then(_value => this.setState({ IOUsList: _value }));
    
  }

  async getIssuersList() {
  //  e.preventDefault();
    await EmbarkJS.enableEthereum();
    let  account;
    let numberIss = await StoreIOUs.methods.getIssuerstotal().call();
    let issuers = [numberIss];
    for (let n=0; n<numberIss; n++) {
      issuers.push(await StoreIOUs.methods.allIssuers(n).call());
    }
    this.setState({ allIssuers: issuers });
    
  }


  render() {
    this.getIssuersList();
    return (<React.Fragment>
        
        
          <h3> List of IOUs issuers</h3>          
          <Form>
          <FormGroup>
  
            <br />
            <List class="pointer"
                items={this.state.allIssuers}
            //  selected={[0]}
            //    disabled={[4]}
                multiple={false}
          //      onClick={(selected) => {this.state.getValue = _this.props.children }}
                onChange={(e) => this.handleChangeIssList(e)}/>
            <p>Current Issuer's address value is <span className="value font-weight-bold">{this.state.currIss}</span></p>
              <Button color="primary" onClick={(e) => this.getIOUList(e)}>Get this issuers IOUs list</Button>
            <br />
            <List class="pointer"
                items={this.state.IOUsList}
            //  selected={[0]}
            //    disabled={[4]}
                multiple={false}
          //      onClick={(selected) => {this.state.getValue = _this.props.children }}
                onChange={(e) => this.handleChangeList(e)}/>
                
            <FormText color="muted">Or paste IOU Smart contract address </FormText>
                  <Input type = "text"
                    key="getValue"
                // initialValues  = {this.state.getValue}
                    name="getValue"
                    placeholder="Ethereum smart contract address 0x..."
                   // initial// initialValues  = {this.state.getValue}
                    onChange={(e) =>  this.handleChange(e)}/>       
          </FormGroup>
        </Form>
        <IOUdescription curIOUaddr = {this.state.getValue} />
    

      </React.Fragment>
    );
  }
}

export default MintIOU;
