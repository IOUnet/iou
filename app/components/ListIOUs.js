import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
import ReactGA from 'react-ga';
import List from 'react-list-select';
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
      IOUsList: [],
      curIOU: "",
      creditorAddr: "",
      descrDebt:"", 
      totalMinted: 0,
      totalBurned: 0,
      keywords: [],
      avRate: 0,
      allIssuers: []
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
    const numberIOUs = await StoreIOUs.methods.getIOUstotal().call();
    let curIOU;
    
    let keyVal = {};
    keyVal["IOUsList"] =[];
    for (let n=0; n<numberIOUs; n++) {
    //  issuers.push(await StoreIOUs.methods.allIssuers(n).call());
      await StoreIOUs.methods.allIOU(n).call().then(_IOUaddr =>  {
              curIOU =  EmbarkJS.Blockchain.Contract({
                    abi: IOUs.options.jsonInterface,
                    address: _IOUaddr}) }).then((_IOUaddr) =>  {
              curIOU.methods.thisIOU().call().then(_value =>
                  {
                      keyVal["IOUsList"].push(_value);
                      keyVal["IOUsList"][n].address= curIOU.options.address; 
                  })}).then(() =>  {
              curIOU.methods.name().call().then(_name =>
                          {
                            keyVal["IOUsList"][n].name = _name;
                          })}).then(() =>  {
              curIOU.methods.symbol().call().then(_symb =>
                            {
                          keyVal["IOUsList"][n].symbol = _symb;
                        });
            }).then(() =>  {curIOU.methods.thisIOUkeywords().call().then(_value =>
              {
                let value = _value.map((e) => {
                  return h2a(e)
                })
                keyVal["IOUsList"][n].keywords= value;
              })}).then(() =>  {
                curIOU.methods.getlen().call().then((_value ) =>
                {
                  keyVal["IOUsList"][n].IOULen= _value [0];
                  keyVal["IOUsList"][n].feedBackLen= _value [1];
                })

              })

      this.setState(keyVal);
    }
  }


   

  render() {
    return (<React.Fragment>
        
        
          <h3> List of IOUs </h3>          
          <Form>
          <FormGroup>

              <Button color="primary" onClick={(e) => this.getIOUList(e)}>IOUs list</Button>
            <br />
            <List class="pointer"
                items={this.state.IOUsList.map(_value => _value.name)}
            //  selected={[0]} .forEach(_value => {return _value.description})
            //    disabled={[4]}
                multiple={false}
          //      onClick={(selected) => {this.state.getValue = _this.props.children }}
                onChange={(e) => this.handleChangeList(e)}/>
                
           
          
            {this.state.getValue && this.state.getValue !== 0 &&
            <Button color="primary" onClick={(e) => this.getValue(e)}>Get full IOU description</Button>
            }
            <FormText color="muted">Click the button to get the IOU address value.</FormText>
            {this.state.getValue && this.state.getValue !== 0 &&
            <p>
           Name: {this.state.getValue.name}
           <br /> 
            Symbol: {this.state.getValue.symbol } <br/>
            Issuer name: {this.state.getValue.myName } <br/>
            Issuer Eth address: {this.state.getValue.issuer } <br/>
            Social Profile: {this.state.getValue.socialProfile} <br/>
            Location: {this.state.getValue.location} <br/>
            Description: {this.state.getValue.description }  <br/>
            keywords: {this.state.getValue.keywords }  <br/>
            Units: {h2a(this.state.getValue.units) }  <br/>
            Total minted: {this.state.getValue.totalMinted / 10**18}, by {this.state.getValue.IOULen} IOUs <br/>
            Total burned: {this.state.getValue.totalBurned / 10**18}, by {this.state.getValue.feedBackLen} feedbacks <br/>
            Balance: {(this.state.getValue.totalMinted - this.state.getValue.totalBurned)/10**18}
            <br />
            Average Rating: {this.state.getValue.avRate} "from -100 to 100". <br/>
            
            </p>}
          </FormGroup>
        </Form>
        
    

      </React.Fragment>
    );
  }
}

export default ListIOU;
