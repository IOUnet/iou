import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';
//import ReactDOM from 'react-dom';
//import {PreferencesController, NetworkController} from '@metamask/controllers';
import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';

import ReactGA from 'react-ga';
import Slider from '@material-ui/core/Slider';

import List from 'react-list-select';
ReactGA.initialize('UA-161540415-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const h2a = web3.utils.hexToAscii;
const a2h = web3.utils.asciiToHex;

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
      issuer: "",
      IOUsList: [],
      curIOU: "",
      creditorAddr: "",
      descrDebt:"",
      rate: 0,
      feedback: "",
      totalMinted: 0,
      totalBurned: 0,
      keywords:[],
      avRate:0,
      IOULen:0, 
      feedBackLen:0, 
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

  handleChangeSlider(e) {
    let keyVal = {}
    keyVal["rate"] = e.target.textContent;
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
      const rate = parseInt(this.state.rate) ;
      curIOU.methods.burn(
        web3.utils.toWei(this.state.valueSet),
        rate.toString(),
        this.state.feedback
                ).send({from:account});
    this._addToLog("StoreIOUs.methods.StoreIOUs: ", this.state.getValue);

  }

  async getIOUList(e) {
    e.preventDefault();
    let  account;
    await web3.eth.getAccounts().then(e => { account = e[0];  
      });
   // await EmbarkJS.enableEthereum();

    StoreIOUs.methods.getIOUListHold(account).call().then(_value => this.setState({ IOUsList: _value }));
    
  }



  async getValue(e) {
    e.preventDefault();
   // await EmbarkJS.enableEthereum();
    
    this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.options.jsonInterface,
        address: this.state.getValue});
    
    await this.state.curIOU.methods.name().call().then(_value =>
    {
      this.setState({name: _value});
    });
    await this.state.curIOU.methods.symbol().call().then(_value =>
      {
        this.setState({symbol: _value});
      });
    await this.state.curIOU.methods.thisIOU().call().then(_value =>
      {
      this.setState({myName: _value.myName});
      this.setState({socialProfile: _value.socialProfile});
      this.setState({description: _value.description});
      this.setState({keywords: _value.keywords});
      this.setState({location: _value.location});
      this.setState({issuer: _value.issuer});
      this.setState({units: h2a(_value.units)});
      this.setState({totalMinted: _value.totalMinted});
      this.setState({totalBurned: _value.totalBurned});
      this.setState({avRate: _value.avRate});
      });

      await this.state.curIOU.methods.getlen().call().then((_value ) =>
     {
      this.setState({IOULen: _value [0]});
      this.setState({feedBackLen: _value [1]});
     }); 

     await this.state.curIOU.methods.thisIOUkeywords().call().then(_value =>
      {
        let value = _value.map((e) => {
          return h2a(e)
        })
      this.setState({keywords: value});
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
        
        
          <h3> Enter address of IOU token to pay off and burn </h3>          
          <Form>
          <FormGroup> 
          <Button color="primary" onClick={(e) => this.getIOUList(e)}>Get list of given me IOUs</Button>
          <br />
            <List
                items={this.state.IOUsList}
                // selected={[0]}
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
            Issuer Eth address: {this.state.issuer } <br/>
            Social Profile: {this.state.socialProfile} <br/>
            Location: {this.state.location} <br/>
            Description: {this.state.description }  <br/>
            Keywords: {this.state.keywords }  <br/>
            Units: {this.state.units }  <br/>
            Total minted: {this.state.totalMinted / 10**18}, by {this.state.IOULen} IOUs <br/>
            Total burned: {this.state.totalBurned / 10**18}, by {this.state.feedBackLen} feedbacks <br/>
            Balance: {(this.state.totalMinted - this.state.totalBurned)/10**18} <br/>
            Average Rating: {this.state.avRate} "from -100 to 100". <br/>
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
           
              <FormText > and give the rate (-100-superugly, +100-superfine): </FormText>
     
                <Slider
                  defaultValue={0}
            //      getAriaValueText={"rate"}
                  aria-labelledby="discrete-slider-always"
                  min = {-100}
                  max = {100}
                  step={10}                
             //     marks={[0, 1, 2,3,4,5,6,7,8,9,10]}
                  valueLabelDisplay="on"
                  key="rate"
                  name="rate"
                  onChange={(e) => this.handleChangeSlider(e)}
                  />                

                  <FormText > with the feedback: </FormText>
                <Input type = "text"
                      key="feedback"
                      name="feedback"
                      placeholder="enter feedback..."
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
