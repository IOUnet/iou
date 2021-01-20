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
      orderByField: 'asc',
      orderByDirection: 'asc',
      newIOU: true
    };
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
    

    if ( this.props.state.curIOUaddr == "" || Object.keys(this.props.state.IOUsList).length == 0) return (<div> Data loadnig... </div>);
        return (<React.Fragment>
          
  
          <h3> IOU description: </h3>          
          <Button color="primary" onClick={() => this.props.getValue()}>Update IOU</Button>
            <br /> 
            <div color="muted">Click the button to get the IOU address value.</div>
            {this.props.state.IOUsList[this.props.state.curIOUaddr].address && this.props.state.IOUsList[this.props.state.curIOUaddr].address !== 0 &&
            <div>Current IOU is at  <span className="value font-weight-bold">{this.props.state.IOUsList[this.props.state.curIOUaddr].address}</span> <br />
            <br/>
           Name: {this.props.state.IOUsList[this.props.state.curIOUaddr].name}
           <br /> 
            Symbol: {this.props.state.IOUsList[this.props.state.curIOUaddr].symbol } <br/>
            Issuer name: {this.props.state.IOUsList[this.props.state.curIOUaddr].myName } <br/>
            Issuer Eth address: {this.props.state.IOUsList[this.props.state.curIOUaddr].issuer } <br/>
            Social Profile: {this.props.state.IOUsList[this.props.state.curIOUaddr].socialProfile} <br/>
            Location: {this.props.state.IOUsList[this.props.state.curIOUaddr].location} <br/>
            Description: {this.props.state.IOUsList[this.props.state.curIOUaddr].description }  <br/>
            keywords: {this.props.state.IOUsList[this.props.state.curIOUaddr].keywords }  <br/>
            Units: {this.props.state.IOUsList[this.props.state.curIOUaddr].units }  <br/>
            Total minted: {this.props.state.IOUsList[this.props.state.curIOUaddr].totalMinted / 10**18}, by {this.props.state.IOUsList[this.props.state.curIOUaddr].IOULen} IOUs <br/>
            Total burned: {this.props.state.IOUsList[this.props.state.curIOUaddr].totalBurned / 10**18}, by {this.props.state.IOUsList[this.props.state.curIOUaddr].feedBackLen} feedbacks <br/>
            Balance: {(this.props.state.IOUsList[this.props.state.curIOUaddr].totalMinted - this.props.state.IOUsList[this.props.state.curIOUaddr].totalBurned)/10**18}
            <br />
            Average Rating: {this.props.state.IOUsList[this.props.state.curIOUaddr].avRate} "from -100 to 100". <br/>
            Feedbacks:  
              {  <DynamicDataTable 
                    rows={this.props.state.IOUsList[this.props.state.curIOUaddr].feedbacks}  
                    hoverable
                    buttons = {[]}
                    totalRows={parseInt(this.props.state.IOUsList[this.props.state.curIOUaddr].feedBackLen)}
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
