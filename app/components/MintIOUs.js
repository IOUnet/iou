import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

import ERC20 from '../../embarkArtifacts/contracts/ERC20Detailed';
import SimpleStorage from '../../embarkArtifacts/contracts/SimpleStorage';
import MakeIOUs from '../../embarkArtifacts/contracts/MakeIOU';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
//import IOUs from '../../embarkArtifacts/contracts/IOUs';
//import ERC20 from '../../embarkArtifacts/contracts/ERC20';
import ReactGA from 'react-ga';
import List from 'react-list-select';
ReactGA.initialize('UA-161540415-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class MintIOU extends React.Component {

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
      units: "",     
      IOUsList: [],
      curIOU: "",
      creditorAddr: "",
      descrDebt:"", 
      totalMinted: 0,
      totalBurned: 0
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

  async sendIOU (e) {
    
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    let  account;
    await web3.eth.getAccounts().then(e => { account = e[0];  
      });
      const curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.options.jsonInterface,
        address: this.state.getValue
        });

      curIOU.methods.mint(
        this.state.creditorAddr,
        web3.utils.toWei(this.state.valueSet),
        this.state.descrDebt
                ).send({from:account});
    this._addToLog("mintIOUs.methods.mintIOUs: ", this.state.getValue);

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
      this.setState({totalMinted: _value.totalMinted});
      this.setState({totalBurned: _value.totalBurned});
      });
    this._addToLog("IOU address: ", this.state.getValue );
  }

   

  render() {
    return (<React.Fragment>
        
        
          <h3> Choose IOU token </h3>          
          <Form>
          <FormGroup>
            <Button color="primary" onClick={(e) => this.getIOUList(e)}>Get my IOUs list</Button>
            <List
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
                    onChange={(e) => this.handleChange(e)}/>
            <p>Current address value is <span className="value font-weight-bold">{this.state.getValue}</span></p>
            {this.state.getValue && this.state.getValue !== 0 &&
            <Button color="primary" onClick={(e) => this.getValue(e)}>Get full IOU description</Button>
            }
            <FormText color="muted">Click the button to get the IOU address value.</FormText>
            {this.state.getValue && this.state.getValue !== 0 &&
            <p>Current IOU is at  <span className="value font-weight-bold">{this.state.getValue}</span> <br />
            <br/>
           Name: {this.state.name}
           <br /> 
            Symbol: {this.state.symbol } <br/>
            Issuer name: {this.state.myName } <br/>
            Social Profile: {this.state.socialProfile} <br/>
            Location: {this.state.location} <br/>
            Description: {this.state.description }  <br/>
            Units: {this.state.units }  <br/>
            Total minted: {this.state.totalMinted / 10**18} <br/>
            Total burned: {this.state.totalBurned / 10**18} <br/>
            Balance: {(this.state.totalMinted - this.state.totalBurned)/10**18}
            </p>}
          </FormGroup>
        </Form>
        
        <h3> Give new debt receipt and transfer IOU  tokens</h3>
        {this.state.getValue && this.state.getValue !== 0 && this.state.name !== "" &&
        <Form onKeyDown={(e) => this.checkEnter(e, this.setValue)}>

          <FormGroup > 
              <FormText > I want to give my {this.state.name} IOUs in amount </FormText>
              <Input
                type= "number"
                step={'.01'}
                key="valueSet"
                name="valueSet"
                defaultValue={this.state.valueSet}
                placeholder="enter amount of IOS"
                onChange={(e) => this.handleChange(e)}/>   <FormText > of {this.state.units } to owner of address </FormText> <br />
                <Input type = "text"
                      key="creditorAddr"
                      name="creditorAddr"
                      placeholder="Paste creditor's Ethereum address (0x...)"
                      onChange={(e) => this.handleChange(e)}></Input> <br /> 
                  <FormText > for reason: </FormText>
                <Input type = "text"
                      key="descrDebt"
                      name="descrDebt"
                      placeholder="enter reason of debt..."
                      onChange={(e) => this.handleChange(e)}></Input> <br /> 
          <Button color="primary" onClick={(e) => this.sendIOU(e)}>Send IOUs</Button>
              <br />
            <FormText color="muted">Once you press "Send IOUs", the transaction will need to be mined and then the will be updated on the blockchain from secunds to minutes.</FormText>
          </FormGroup>
        </Form>
        }

      </React.Fragment>
    );
  }
}

export default MintIOU;
