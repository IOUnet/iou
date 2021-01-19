import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';


import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
import ReactGA from 'react-ga';
import List from 'react-list-select';
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
      currKey: 0,
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
      allKeys: []
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

  handleChangeKeyList(e) {
    let keyVal = {}
    keyVal["currKey"] = this.state.allKeys[e];
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
  //  e.preventDefault();
   // await EmbarkJS.enableEthereum();

   await StoreIOUs.methods.getIOUListKey(a2h(this.state.currKey)).call().then(_value => this.setState({ IOUsList: _value }));
    
  }

  async getKeysList() {
    //e.preventDefault();
    await EmbarkJS.enableEthereum();
    let  account;
    let numberIss = await StoreIOUs.methods.getKeystotal().call();
    let Keys = [numberIss];
    for (let n=0; n<numberIss; n++) {
      Keys.push(h2a(await StoreIOUs.methods.allKeywords(n).call()));
    }
    this.setState({ allKeys: Keys });
    
  }



  render() {
    this.getKeysList()
    return (<React.Fragment>
        
        
          <h3> List of IOUs Keys: </h3>          
          <Form>
          <FormGroup>
            <br />
            <FormText >Select key: </FormText>

            <List class="pointer"
                items={this.state.allKeys}
            //  selected={[0]}
            //    disabled={[4]}
                multiple={false}
          //      onClick={(selected) => {this.state.getValue = _this.props.children }}
                onChange={(e) => this.handleChangeKeyList(e)}/>
            <p>Current key's value is <span className="value font-weight-bold">{this.state.currKey}</span></p>
              <Button color="primary" onClick={(e) => this.getIOUList(e)}>Get IOUs list with this key</Button>
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
                    onChange={(e) => this.handleChange(e)}/>
          
            </FormGroup>
        </Form>
        <IOUdescription state={this.props.state}
                    setState={state => this.props.setState(state)} 
                    getValue={() => this.props.getValue()} />

    

      </React.Fragment>
    ); /**        <IOUdescription curIOUaddr = {this.state.getValue} />
    */
  }
}

export default MintIOU;
