import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input,  Button, FormText} from 'reactstrap';

//import StoreIOUs from '../../embarkArtifacts/contracts/StoreIOUs';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
//import ReactGA from 'react-ga';
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";

//ReactGA.initialize('UA-161540415-1');
//ReactGA.pageview(window.location.pathname + window.location.search);
const h2a = web3.utils.hexToAscii;
const a2h = web3.utils.asciiToHex;

class IOUdescription extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      valueSet: 0,
      getValue: this.props.curIOUaddr,
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

  async getValue(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    
    this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.options.jsonInterface,
        address: this.props.curIOUaddr});
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

            }
            this.setState(keyVal);
          });
    this._addToLog("IOU address: ", this.props.curIOUaddr );
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



  render() {
    return (<React.Fragment>
        
        
          <h3> IOU description: </h3>          
          <Form>
          <FormGroup>
            {this.props.curIOUaddr && this.props.curIOUaddr !== 0 &&
            <Button color="primary" onClick={(e) => this.getValue(e)}>Get full IOU description</Button>
            }
            <FormText color="muted">Click the button to get the IOU address value.</FormText>
            {this.props.curIOUaddr && this.props.curIOUaddr !== 0 &&
            <p>Current IOU is at  <span className="value font-weight-bold">{this.props.curIOUaddr}</span> <br />
            <br/>
           Name: {this.state.name}
           <br /> 
            Symbol: {this.state.symbol } <br/>
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
            Feedbacks:  
              {
                <DynamicDataTable 
                  rows={this.state.feedbacks}  
                  hoverable
                  buttons=""
                  totalRows={this.state.feedBackLen}
                  perPage={10}
                  onClick={(event, row) => console.warn(event, row.name)}
                  orderByField={this.state.orderByField}
                  orderByDirection={this.state.orderByDirection}
                  changeOrder={(field, direction) => this.changeOrder(field, direction)}
                  disallowOrderingBy = {['comment']}
                />

              }
            </p>}
          </FormGroup>
        </Form>
        
    

      </React.Fragment>
    );
  }
}

export default IOUdescription;
