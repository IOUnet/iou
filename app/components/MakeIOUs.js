import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

//import ERC20 from '../../embarkArtifacts/contracts/ERC20Detailed';
//import SimpleStorage from '../../embarkArtifacts/contracts/SimpleStorage';
import MakeIOUs from '../../embarkArtifacts/contracts/MakeIOU';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
//import ERC20 from '../../embarkArtifacts/contracts/ERC20';
import ReactGA from 'react-ga';
//import List from 'react-list-select';
ReactGA.initialize('UA-161540415-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const h2a = web3.utils.hexToAscii;
const a2h = web3.utils.asciiToHex;

class MakeIOU extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      valueSet: 10,
      getValue: "",
      logs: [],
      name: "",
      symbol: "",
      myName: "",
      socialProfile: "",
      description: "",
      location: "",
      units: "hours",     
      IOUsList: [],
      curIOU: "",
      curOptstate:"" ,
      ERC20: "" ,
      keywords: "",
      
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

  async deployIOU (e) {
    
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    let  account;
    await web3.eth.getAccounts().then(e => { account = e[0];  
      });
      
      let keys = this.state.keywords.split(',', 5)
      keys = keys.map((e)=>{
        return a2h(e);
      });

   let gasAmount;
    await MakeIOUs.methods.makeIOU(
      this.state.name,
      this.state.symbol,
      this.state.myName,
      this.state.socialProfile,
      this.state.description,
      this.state.location,
      a2h(this.state.units),
      keys
     ).estimateGas({from: account}).then(e => { gasAmount = e;  
     }); 
    MakeIOUs.methods.makeIOU(
        this.state.name,
        this.state.symbol,
        this.state.myName,
        this.state.socialProfile,
        this.state.description,
        this.state.location,
       a2h(this.state.units),
        keys).send({from:account, gas: gasAmount}); //}
    this._addToLog("MakeIOUs.methods.MakeIOUs: ", this.state.getValue);

  }

  async getIOUList(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    let  account;
    await web3.eth.getAccounts().then(e => { account = e[0];  
      });
    MakeIOUs.methods.getIOUList(account).call().then(_value => this.setState({ IOUsList: _value }));
    
  }



  async getValue(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    
    this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.options.jsonInterface,
        address: this.state.getValue});
    
    await this.state.curIOU.methods.thisIOU().call().then(_value =>
      {
      this.setState({name: _value.name});
      this.setState({symbol: _value.symbol});
      this.setState({myName: _value.myName});
      this.setState({socialProfile: _value.socialProfile});
      this.setState({description: _value.description});
      this.setState({location: _value.location});
      this.setState({units: _value.units});
      });
    this._addToLog("IOU address: ", this.state.getValue );
  }



  render() {
    return (<React.Fragment>
        

        
        <h3> 1. Deploy IOU    </h3>
          <Form>
                <FormGroup>
                <FormText color="muted">ERC20 token name (12 char)</FormText>
                  <Input type = "text"
                    key="name"
                // initialValues  = {this.state.addrBA1sell}
                    name="name"
                    placeholder="Sheldon Cooper's token"                  
                    onChange={(e) => this.handleChange(e)}/>
                <FormText color="muted">ERC20 token symbol (4 char)</FormText>
                  <Input type = "text"
                    key="symbol"
                // initialValues  = {this.state.addrBA1sell}
                    name="symbol"
                    placeholder="SCT1"                  
                    onChange={(e) => this.handleChange(e)}/>                    
                 
                 <FormText color="muted">You name, surname (up to 255 chr)</FormText>
                  <Input type = "text"
                    key="myName"
                // initialValues  = {this.state.addrBA1sell}
                    name="myName"
                    placeholder="Sheldon Cooper"                  
                    onChange={(e) => this.handleChange(e)}/>                    

                 
              <FormText color="muted">Your profile in social networks </FormText>
                  <Input type = "text"
                    key="socialProfile"
                // initialValues  = {this.state.addrBA1sell}
                    name="socialProfile"
                    placeholder="www.sheldonbook.cop/ShellyPie"                  
                    onChange={(e) => this.handleChange(e)}/>   

                <FormText color="muted">You location: country, city, area (up to 255 chr)</FormText>
                  <Input type = "text"
                    key="location"
                // initialValues  = {this.state.addrBA1sell}
                    name="location"
                    placeholder="app. 4A, 2311 North Los Robles Avenue  Pasadena, California, US, Earth"                  
                    onChange={(e) => this.handleChange(e)}/>                      
                                 
                <FormText color="muted">Description for IOU </FormText>
                  <Input type = "text"
                      key="description"
                      // initialValues  = {this.state.addrBA2buy}
                      name="description"
                      placeholder="description of your product or service here.  "  
                    onChange={(e) => this.handleChange(e)}/>

              <FormText color="muted">Keywords for IOU (max is 5 keys, separated by comma) </FormText>
                  <Input type = "text"
                      key="keywords"
                      // initialValues  = {this.state.addrBA2buy}
                      name="keywords"
                      placeholder="keywords of your product or service  here. "  
                    onChange={(e) => this.handleChange(e)}/>
                                    

                  <FormText color="muted">Unit of measure for your product or service (f.e. hours) </FormText>
                  <Input type = "text"
                      key="units"
                      // initialValues  = {this.state.addrBA2buy}
                      name="units"
                      placeholder="f.e. hours, or units of measure for your product or service... "  
                    onChange={(e) => this.handleChange(e)}/>
                  <br />

                <Button color="primary" onClick={(e) => this.deployIOU(e)}>Deploy IOU </Button>
                </FormGroup>
          </Form>

      </React.Fragment>
    );
  }
}

export default MakeIOU;
