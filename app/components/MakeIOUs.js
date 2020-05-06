import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

import ERC20 from '../../embarkArtifacts/contracts/ERC20Detailed';
import SimpleStorage from '../../embarkArtifacts/contracts/SimpleStorage';
import MakeIOUs from '../../embarkArtifacts/contracts/MakeIOU';
//import IOUs from '../../embarkArtifacts/contracts/IOUs';
//import ERC20 from '../../embarkArtifacts/contracts/ERC20';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-161540415-1');
ReactGA.pageview(window.location.pathname + window.location.search);

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
      description: 18,
      location: 18,
      units: "",     
      IOUsList: [],
      curIOU: "",
      curOptstate:"" ,
      ERC20: "" ,

    };
  }

  handleChange(e) {
    let keyVal = {}
    keyVal[e.target.name] = e.target.value;
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
    let gasAmount;
    await MakeIOUs.methods.makeIOU(
      this.state.name,
      this.state.symbol,
      this.state.myName,
      this.state.socialProfile,
      this.state.description,
      this.state.location,
      this.state.units,
     ).estimateGas({from: account}).then(e => { gasAmount = e;  
     }); ;
    MakeIOUs.methods.makeIOU(
        this.state.name,
        this.state.symbol,
        this.state.myName,
        this.state.socialProfile,
        this.state.description,
        this.state.location,
        this.state.units,
                ).send({from:account, gas: gasAmount});
    this._addToLog("MakeIOUs.methods.MakeIOUs: ", this.state.getValue);

  }


  async getValue(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    let  account;
    await web3.eth.getAccounts().then(e => { account = e[0];  
      });
    MakeIOUs.methods.getLast(account).call().then(_value => this.setState({ getValue: _value }));
    
    this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.IOUs.jsonInterface,
        address: this.state.getValue});
    
    await this.state.curIOU.methods.thisOpt().call().then(_value =>
      {
      const paramsToString = params => Object.entries(params).reduce((acc, [key, value], index, array) => `${acc}${key}=${encodeURIComponent(value)}${index !== (array.length - 1) ? '&' : ''}`, "");    
      this.setState({addrBA1sell: _value.addrBA1sell});
      this.setState({addrBA2buy: _value.addrBA2buy});
      this.setState({amountBA1sell: _value.amountBA1sell});
      this.setState({amountBA2buy: _value.amountBA2buy});
      this.setState({sd1: _value.sd1});
      this.setState({sd2: _value.sd2});
      this.setState({expDays: _value.expDays});
      this.setState({description: _value.description});
      this.setState({isDeposited: _value.isDeposited});
      this.setState({fullDeposited: _value.fullDeposited});
      this.setState({ curOptstate: paramsToString(_value) })
      });
    this._addToLog("IOU address: ", this.state.getValue );
  }

    
  async registerDeposite(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    this.state.curIOU =  EmbarkJS.Blockchain.Contract({
                                    abi: IOUs.IOUs.jsonInterface,
                                    address: this.state.getValue});

    this.state.curIOU.methods.isHandMadeDeposite().send(); //({gas: gasAmount});

    this._addToLog("IOU deposited time: ", this.state.isDeposited);
  }

/*

  async getValueDeposited(e) {
    e.preventDefault();
    
    await EmbarkJS.enableEthereum();
    this.state.curIOU =  EmbarkJS.Blockchain.Contract({
                                    abi: IOUs.IOUs.jsonInterface,
                                    address: this.state.getValue});

    this.state.curIOU.methods.isDeposited().call().then(_value => this.setState({ isDeposited: _value }));
    
    this._addToLog("IOU deposited time: ", this.state.isDeposited);
    
  }
*/
  async approveDep(e) {
    
    await EmbarkJS.enableEthereum();
    try {

      this.state.ERC20 =  EmbarkJS.Blockchain.Contract({
      abi: ERC20.IOUs.jsonInterface,
      address: this.state.addrBA1sell
      });
      
      //const decimals = await this.state.ERC20.methods.decimals().call();
      const amountSD = web3.utils.toBN( this.state.sd1 * this.state. amountBA1sell / 100 );
  
      this.state.ERC20.methods.approve(this.state.getValue, amountSD.toString()).send();
   }
   catch (err) {
     console.log (err);
   }
  }

  async makeDeposite(e) {    
    await EmbarkJS.enableEthereum();
    try {
      this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.IOUs.jsonInterface,
        address: this.state.getValue
      });
      
      this.state.curIOU.methods.makeDeposite().send();
   }
   catch (err) {
     console.log (err);
   }
  }
  

  async approveFull(e) {
    
    await EmbarkJS.enableEthereum();
    try {

      this.state.ERC20 =  EmbarkJS.Blockchain.Contract({
      abi: ERC20.IOUs.jsonInterface,
      address: this.state.addrBA1sell
      });
      
      //const decimals = await this.state.ERC20.methods.decimals().call();
      const amountSD = web3.utils.toBN( (100- this.state.sd1) * this.state.
        amountBA1sell / 100 );
  
      this.state.ERC20.methods.approve(this.state.getValue, amountSD.toString()).send();
   }
   catch (err) {
     console.log (err);
   }
  }

  async finalFundOpt(e) {    
    await EmbarkJS.enableEthereum();
    try {
      this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.IOUs.jsonInterface,
        address: this.state.getValue
      });
      
      this.state.curIOU.methods.finalFundOpt().send();
   }
   catch (err) {
     console.log (err);
   }
  }
  
  async withdrawSeller(e) {    
    await EmbarkJS.enableEthereum();
    try {
      this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.IOUs.jsonInterface,
        address: this.state.getValue
      });
      let amntWthdrSelBN = web3.utils.toWei (web3.utils.toBN(this.state.sumToWithdrawSel));
    
      this.state.curIOU.methods.withdrawSeller(amntWthdrSelBN.toString()).send();
   }
   catch (err) {
     console.log (err);
   }
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
                    placeholder="My token"                  
                    onChange={(e) => this.handleChange(e)}/>
                <FormText color="muted">ERC20 token symbol (4 char)</FormText>
                  <Input type = "text"
                    key="symbol"
                // initialValues  = {this.state.addrBA1sell}
                    name="symbol"
                    placeholder="SYM1"                  
                    onChange={(e) => this.handleChange(e)}/>                    
                 
                 <FormText color="muted">You name, surname (up to 255 chr)</FormText>
                  <Input type = "text"
                    key="myName"
                // initialValues  = {this.state.addrBA1sell}
                    name="myName"
                    placeholder="Bond, James"                  
                    onChange={(e) => this.handleChange(e)}/>                    

                 
              <FormText color="muted">You name, surname (up to 255 chr)</FormText>
                  <Input type = "text"
                    key="socialProfile"
                // initialValues  = {this.state.addrBA1sell}
                    name="socialProfile"
                    placeholder="www.bondbook.com/JamesBond007"                  
                    onChange={(e) => this.handleChange(e)}/>   

                <FormText color="muted">You location: country, city, area (up to 255 chr)</FormText>
                  <Input type = "text"
                    key="location"
                // initialValues  = {this.state.addrBA1sell}
                    name="location"
                    placeholder="45 Wellington Street, Covent Garden, London WC2E 7BN, England"                  
                    onChange={(e) => this.handleChange(e)}/>                      
                                 
                <FormText color="muted">Description for IOU </FormText>
                  <Input type = "text"
                      key="description"
                      // initialValues  = {this.state.addrBA2buy}
                      name="description"
                      placeholder="description of your product or service here. "  
                    onChange={(e) => this.handleChange(e)}/>
                  <br />

                  <FormText color="muted">Description for IOU </FormText>
                  <Input type = "text"
                      key="units"
                      // initialValues  = {this.state.addrBA2buy}
                      name="units"
                      placeholder="units of measure for your product or service... "  
                    onChange={(e) => this.handleChange(e)}/>
                  <br />

                <Button color="primary" onClick={(e) => this.deployIOU(e)}>Deploy IOU </Button>
                </FormGroup>
          </Form>
          <h3> 2. Get the current IOU address value</h3>
        <Form>
          <FormGroup>
            <Button color="primary" onClick={(e) => this.getValue(e)}>Get Value</Button>
            <FormText color="muted">Click the button to get the IOU address value.</FormText>
            {this.state.getValue && this.state.getValue !== 0 &&
           <p>Current IOU is at  <span className="value font-weight-bold">{this.state.getValue}</span> <br />
            
           Description: {this.state.description}
           <br /> 
           ETH Address active to sell: {this.state.addrBA1sell } <br/>
           ETH symbol active to sell: {this.state.symbolBA1 } <br/>
           Amount active to sell: {this.state.amountBA1sell / 10**(this.state.decimalsBA1)} <br/>
           Depositing active to sell: {this.state.sd1 } % <br/>
           <br/>
           Address active  to buy: {this.state.addrBA2buy  } <br/>
           ETH symbol active to buy: {this.state.symbolBA2 } <br/>
           Amount active to buy: {this.state.amountBA2buy / 10**(this.state.decimalsBA2) } <br/>
           Depositing active to buy: {this.state.sd2 } % <br/>
           <br/>
           
           </p>
            }
            
          </FormGroup>
        </Form>
      
       <h3> Logs </h3>
        <p> calls being made: </p>
        <div className="logs">
          {
            this.state.logs.map((item, i) => <p key={i}>{item}</p>)
          }
        </div>
      </React.Fragment>
    );
  }
}

export default MakeIOU;
