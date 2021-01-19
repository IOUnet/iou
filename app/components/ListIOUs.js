import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

//import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
//import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
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
      curIOU: "",
      creditorAddr: "",
      descrDebt:"", 
      totalMinted: 0,
      totalBurned: 0,
      keywords: [],
      avRate: 0,
      allIssuers: [],
    };
  }

  handleChange(e) {
    let keyVal = {}
    keyVal[e.target.name] = e.target.value;
    this.setState( keyVal );
                 
  }

  handleChangeList(e) {
    let keyVal = {}
    keyVal["getValue"] = this.props.IOUsList[e];
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

  



  render() {
    return (<React.Fragment>
        
        
          <h3> List of IOUs </h3>          
          <Form>
          <FormGroup>

  
            <List class="pointer"
                items={this.props.state.IOUsList.map(_value => _value.name)}
                /**  <Button color="primary" onClick={(e) => this.handleChangeList(e)}>IOUs list</Button>
            <br /> */
            //  selected={[0]} .forEach(_value => {return _value.description})
            //    disabled={[4]}
                multiple={false}
          //      onClick={(selected) => {this.state.getValue = _this.props.children }}
                onChange={(e) => this.handleChangeList(e)}/>
                
           
          
      
            <FormText color="muted">Click the token to get the IOU address value.</FormText>
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
