import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';
//import ReactDOM from 'react-dom';
//import {PreferencesController, NetworkController} from '@metamask/controllers';
import MakeIOUs from '../../embarkArtifacts/contracts/MakeIOU';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';

import ReactGA from 'react-ga';
import Slider from '@material-ui/core/Slider';
//import Typography from 'material-ui';

import List from 'react-list-select';
ReactGA.initialize('UA-161540415-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class BurnIOU extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      valueSet: 0,
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
      rate: 8,
      feedback: "",
      totalMinted: 0,
      totalBurned: 0,


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
      const rate = this.state.rate * 10;
      curIOU.methods.burn(
        web3.utils.toWei(this.state.valueSet),
        rate.toString(),
        this.state.descrDebt
                ).send({from:account});
    this._addToLog("MakeIOUs.methods.MakeIOUs: ", this.state.getValue);

  }

  async getIOUList(e) {
    e.preventDefault();
    let  account;
    await web3.eth.getAccounts().then(e => { account = e[0];  
      });
    await EmbarkJS.enableEthereum();

    MakeIOUs.methods.getIOUListHold(account).call().then(_value => this.setState({ IOUsList: _value }));
    
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

   /*
            <Button color="primary" onClick={(e) => this.getIOUList(e)}>Get my IOUs list</Button>
            <List
                items={this.state.IOUsList}
            //  selected={[0]}
            //    disabled={[4]}
                multiple={false}
          //      onClick={(selected) => {this.state.getValue = _this.props.children }}
                onChange={(e) => this.handleChangeList(e)}/>


                         <Typography id="discrete-slider-always" gutterBottom>Rate:</Typography>
   */

  render() {
    return (<React.Fragment>
        
        
          <h3> Enter address of IOU token to burn </h3>          
          <Form>
          <FormGroup> 
          <Button color="primary" onClick={(e) => this.getIOUList(e)}>Get  list of given me IOUs</Button>
            <List
                items={this.state.IOUsList}
            //  selected={[0]}
            //    disabled={[4]}
                multiple={false}
          //      onClick={(selected) => {this.state.getValue = _this.props.children }}
                onChange={(e) => this.handleChangeList(e)}/>                
            <FormText color="muted">Paste here IOU token  address </FormText>
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
        
        <h3> Pay off and burn IOU and burn tokens</h3>
        {this.state.getValue && this.state.getValue !== 0 && this.state.name !== "" &&
        <Form onKeyDown={(e) => this.checkEnter(e, this.setValue)}>

          <FormGroup > 
              <FormText > I want to pay off {this.state.name} IOUs in amount </FormText>
              <Input
                type= "number"
                step={'.01'}
                key="valueSet"
                name="valueSet"
                defaultValue={this.state.valueSet}
                placeholder="enter amount of IOS"
                onChange={(e) => this.handleChange(e)}/>   <FormText > of {this.state.units } to owner of IOU. </FormText> <br />
           
              <FormText > and give the rate (0-ugly, 10-fine): </FormText>
     
                <Slider
                  defaultValue={8}
            //      getAriaValueText={"rate"}
                  aria-labelledby="discrete-slider-always"
                  min = {0}
                  max = {10}
                  step={0.5}                
             //     marks={[0, 1, 2,3,4,5,6,7,8,9,10]}
                  valueLabelDisplay="on"
                  key="rate"
                  name="rate"
                  onChange={(e) => this.handleChange(e)}
                  />                

                  <FormText > with the feedback: </FormText>
                <Input type = "text"
                      key="feedback"
                      name="feedback"
                      placeholder="enter reason of debt..."
                      onChange={(e) => this.handleChange(e)}></Input> <br /> 
          <Button color="primary" onClick={(e) => this.sendIOU(e)}>Pay off and burn  IOUs</Button>
              <br />
            <FormText color="muted">Once you press "Pay off and burn  IOUs", the transaction will need to be mined and then the will be updated on the blockchain from secunds to minutes.</FormText>
          </FormGroup>
        </Form>
        }

      </React.Fragment>
    );
  }
}

export default BurnIOU;
