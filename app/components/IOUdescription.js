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
    /*  valueSet: 0,
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
      allIssuers: [], */
      orderByField,
      orderByDirection,
      newIOU: true
    };
  }

  async getValue() {
 //   e.preventDefault();
    
  //  if ( this.props.curIOUaddr =="" || this.state.newIOU == false ) return;
    await EmbarkJS.enableEthereum();
    const curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.options.jsonInterface,
        address: this.props.curIOUaddr});

    await curIOU.methods.name().call().then(_value =>
    {
      curIOUstate.name= _value;
    });
  
    await curIOU.methods.symbol().call().then(_value =>
      {
        curIOUstate.symbol= _value;
      });
    await curIOU.methods.thisIOU().call().then(_value =>
      {

      curIOUstate.myName= _value.myName;
      curIOUstate.socialProfile= _value.socialProfile;
      curIOUstate.description= _value.description;
      curIOUstate.issuer= _value.issuer;
      curIOUstate.location= _value.location;
      curIOUstate.units= h2a( _value.units);
      curIOUstate.avRate= _value.avRate;
      curIOUstate.totalMinted= _value.totalMinted;
      curIOUstate.totalBurned= _value.totalBurned;
      });
    await curIOU.methods.thisIOUkeywords().call().then(_value =>
        {
          let value = _value.map((e) => {
            return h2a(e)
          })
        curIOUstate.keywords= value;
        });

      
    await curIOU.methods.getlen().call().then((_value ) =>
        {
         curIOUstate.IOULen= _value [0];
         curIOUstate.feedBackLen= _value [1];
        }).then(async () => {

          let keyVal = {};
          curIOUstate.feedbacks =[];
          for (let n=0; n<this.state.feedBackLen; n++) {
              await curIOU.methods.allFeedbacks(n).call().then((_value ) =>
              {
                var value = {}
                value.sender= _value['sender'];
                value.amount= _value['amount'] / 10**18;
                
                value.time= new Date(_value['time']*1000).toLocaleDateString('en-US');
                value.rating= _value['rating'];
                value.comment = _value['text'];

                curIOUstate.feedbacks.push(value);

              });

            }
            
          });
      return curIOUstate;
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
    const thisstate = this.getValue();
    return (<React.Fragment>
        
        
          <h3> IOU description: </h3>          
            <div color="muted">Click the button to get the IOU address value.</div>
            {this.props.curIOUaddr && this.props.curIOUaddr !== 0 &&
            <div>Current IOU is at  <span className="value font-weight-bold">{this.props.curIOUaddr}</span> <br />
            <br/>
           Name: {thisstate.name}
           <br /> 
            Symbol: {thisstate.symbol } <br/>
            Issuer name: {thisstate.myName } <br/>
            Issuer Eth address: {thisstate.issuer } <br/>
            Social Profile: {thisstate.socialProfile} <br/>
            Location: {thisstate.location} <br/>
            Description: {thisstate.description }  <br/>
            keywords: {thisstate.keywords }  <br/>
            Units: {thisstate.units }  <br/>
            Total minted: {thisstate.totalMinted / 10**18}, by {thisstate.IOULen} IOUs <br/>
            Total burned: {thisstate.totalBurned / 10**18}, by {thisstate.feedBackLen} feedbacks <br/>
            Balance: {(thisstate.totalMinted - thisstate.totalBurned)/10**18}
            <br />
            Average Rating: {thisstate.avRate} "from -100 to 100". <br/>
            Feedbacks:  
              {  <DynamicDataTable 
                    rows={thisstate.feedbacks}  
                    hoverable
                    buttons = {[]}
                    totalRows={parseInt(thisstate.feedBackLen)}
                    perPage={10}
                    onClick={(event, row) => console.warn(event, row.name)}
                    orderByField={this.state.orderByField}
                    orderByDirection={this.state.orderByDirection}
                    changeOrder={(field, direction) => this.changeOrder(field, direction)}
                    disallowOrderingBy = {['comment']}
                  /> 
              }
            </div>}
      </React.Fragment>
    );
  } /**            */
}

export default IOUdescription;
