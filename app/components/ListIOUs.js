import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
import ReactGA from 'react-ga';
import List from 'react-list-select';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";

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
      curIOUaddr: "",
      creditorAddr: "",
      descrDebt:"", 
      totalMinted: 0,
      totalBurned: 0,
      keywords: [],
      avRate: 0,
      allIssuers: [],
      IOUsList: []
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

  async getIOUsList(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    const numberIOUs = await StoreIOUs.methods.getIOUstotal().call();
    let curIOU;
    
    let keyVal = {numberIOUs};
    keyVal["IOUsList"] =[];
    for (let n=0; n<numberIOUs; n++) {
    //  issuers.push(await StoreIOUs.methods.allIssuers(n).call());
      await StoreIOUs.methods.allIOU(n).call().then(_IOUaddr =>  {
              curIOU =  EmbarkJS.Blockchain.Contract({
                    abi: IOUs.options.jsonInterface,
                    address: _IOUaddr}) }).then(() =>  {
              curIOU.methods.name().call().then(_name =>
                          { 
                            var curKeys ={};
                            curKeys.address= curIOU.options.address; 
                            curKeys.name = _name;
                            keyVal["IOUsList"].push(curKeys);
                          })});
            }
      this.setState(keyVal);
    
  }



  async getValue(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    
    this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.options.jsonInterface,
        address: this.state.curIOUaddr});
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
      this.setState({issuer: _value.issuer});
      this.setState({location: _value.location});
      this.setState({units: h2a( _value.units)});
      this.setState({avRate: _value.avRate});
      this.setState({totalMinted: _value.totalMinted});
      this.setState({totalBurned: _value.totalBurned});
      });
      await this.state.curIOU.methods.thisIOUkeywords().call().then(_value =>
        {
          let value = _value.map((e) => {
            return h2a(e)
          })
        this.setState({keywords: value});
        });

      
      await this.state.curIOU.methods.getlen().call().then((_value ) =>
        {
         this.setState({IOULen: _value [0]});
         this.setState({feedBackLen: _value [1]});
        }).then(async () => {

          let keyVal = {};
          keyVal["feedbacks"] =[];
          for (let n=0; n<this.state.feedBackLen; n++) {
              await this.state.curIOU.methods.allFeedbacks(n).call().then((_value ) =>
              {
                var value = {}
                value.sender= _value['sender'];
                value.amount= _value['amount'] / 10**18;
                
                value.time= new Date(_value['time']*1000).toLocaleDateString('en-US');
                value.rating= _value['rating'];
                value.comment = _value['text'];

                keyVal["feedbacks"].push(value);

              });
              this.setState(keyVal);
            }
            
          });

  }

  changeOrder(field, direction) {
    this.setState({ orderByField: field, orderByDirection: direction }, () => {
        const feedbacksS = this.state.feedbacks.sort((a,b) => {
          if (direction == "asc") {
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
          }
          else if (direction == "desc") {
            if (a[field] > b[field]) return -1;
            if (a[field] < b[field]) return 1;
          }
        })
        this.setState({ feedbacks: feedbacksS });
    });
}

  render() { /**           
  */
    
    return (<React.Fragment>
        
        
          <h3> List of IOUs </h3>          
          <Form>
          <FormGroup>
            <br />
            <Button color="primary" onClick={(e) => this.getIOUsList(e)}>IOUs list</Button>
            
            <List class="pointer"
                items={this.state.IOUsList.map(_value => _value.name)}
          
            //  selected={[0]} .forEach(_value => {return _value.description})
            //    disabled={[4]}
                multiple={false}
          //      onClick={(selected) => {this.state.getValue = _this.props.children }}
                onChange={(e) => this.handleChangeList(e)}/>
                
           
            {this.state.curIOUaddr && this.state.curIOUaddr !== 0 &&<p>Current key's value is <span className="value font-weight-bold">{this.state.curIOUaddr}</span>
            <Button color="primary" onClick={(e) => this.getValue(e)}>Get full IOU description</Button>
            <FormText color="muted">Click the token to get the IOU address value.</FormText>     
            </p>}
            
            {this.state.curIOUaddr && this.state.curIOUaddr !== 0 &&
            <p>
           Name: {this.state .name}
           <br /> 
            Symbol: {this.state .symbol } <br/>
            Issuer name: {this.state.myName } <br/>
            Issuer Eth address: {this.state.issuer } <br/>
            Social Profile: {this.state.socialProfile} <br/>
            Location: {this.state.location} <br/>
            Description: {this.state.description }  <br/>
            keywords: {this.state.keywords }  <br/>
            Units: {this.state.units }  <br/>
            Total minted: {this.state.totalMinted / 10**18}, by {this.state.IOULen} IOUs <br/>
            Total burned: {this.state.totalBurned / 10**18}, by {this.state.feedBackLen} feedbacks <br/>
            Balance: {(this.state.totalMinted - this.state.totalBurned)/10**18}
            <br />
            Average Rating: {this.state.avRate} "from -100 to 100". <br/>
            
            Feedbacks:</p>}
            <DynamicDataTable 
                  rows={this.state.feedbacks}  
                  hoverable
                  buttons={[]}
                  totalRows={parseInt(this.state.feedBackLen)}
                  perPage={10}
                  onClick={(event, row) => console.warn(event, row.name)}
                  orderByField={this.state.orderByField}
                  orderByDirection={this.state.orderByDirection}
                  changeOrder={(field, direction) => this.changeOrder(field, direction)}
                  disallowOrderingBy = {['comment']}
                />
          </FormGroup>
        </Form>
        
    

      </React.Fragment>
    );
  }
}

export default ListIOU;
