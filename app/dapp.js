import React from 'react';
import ReactDOM from 'react-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

import EmbarkJS from 'Embark/EmbarkJS';
import ListIOUs from './components/ListIOUs.js';
import MakeIOUs from './components/MakeIOUs';
import MintIOUs from './components/MintIOUs';
import BurnIOUs from './components/BurnIOUs';
import ListIssuers from './components/ListIssuers';
import ListIssuersNames from './components/ListIssuersNames';
import ListKeys from './components/ListKeys';
import StoreIOUs from '../embarkArtifacts/contracts/StoreIOUs';
import IOUs from '../embarkArtifacts/contracts/IOUtoken';
const h2a = web3.utils.hexToAscii;
const a2h = web3.utils.asciiToHex;


import 'bootstrap/dist/css/bootstrap.css';
import './dapp.css';
import Whisper from './components/whisper';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      activeKey: '1',
      whisperEnabled: false,
      storageEnabled: false,
      blockchainEnabled: false,
      allIOUs:0,
      allKeys:0, 
      allIssuers:0,
      curIOUaddr: "",
      IOUsList: []
    };
  }
  
  async getValue() {
    //   e.preventDefault();
       
     //  if ( this.props.curIOUaddr =="" || this.state.newIOU == false ) return;
       await EmbarkJS.enableEthereum();
       const curIOU =  EmbarkJS.Blockchain.Contract({
           abi: IOUs.options.jsonInterface,
           address: this.state.curIOUaddr});
       var curIOUstate ={}; 
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
         curIOUstate.address =  this.state.curIOUaddr;
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
   
             curIOUstate.feedbacks =[];
             for (let n=0; n<curIOUstate.feedBackLen; n++) {
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
          let keyVal = {};
          keyVal["IOUsList"] =[];
          keyVal["IOUsList"][this.state.curIOUaddr] = curIOUstate;
          this.setState(keyVal);
     }
   

   

  componentDidMount() {
    EmbarkJS.onReady((err) => {
      if (err) {
        // If err is not null then it means something went wrong connecting to ethereum
        // you can use this to ask the user to enable metamask for e.g
        return this.setState({error: err.message || err});
      }
      
      this.getStat();
      EmbarkJS.Blockchain.isAvailable().then(result => {
        this.setState({blockchainEnabled: result});
      });

      EmbarkJS.Messages.isAvailable().then(result => {
        this.setState({whisperEnabled: result});
      });

      EmbarkJS.Storage.isAvailable().then((result) => {
        this.setState({storageEnabled: result});
      }).catch(() => {
        this.setState({storageEnabled: false});
      });
    });
  }

  _renderStatus(title, available) {
    let className = available ? 'pull-right status-online' : 'pull-right status-offline';
    return <React.Fragment>
      {title}
      <span className={className}/>
    </React.Fragment>;
  }

  handleSelect(key) {
    this.setState({activeKey: key});
  }

   async getStat() {
    //e.preventDefault();
    await EmbarkJS.enableEthereum();
    
    await StoreIOUs.methods.getIOUstotal().call().then ((_value) =>
      {
        this.setState({allIOUs: _value});
      });
     
    await StoreIOUs.methods.getKeystotal().call().then ((_value) =>
        {
          this.setState({allKeys: _value});
        });
       
    await StoreIOUs.methods.getIssuerstotal().call().then ((_value) =>
        {
          this.setState({allIssuers: _value});
        });
       
  }

 

  render() {
    const ensEnabled = EmbarkJS.Names.currentNameSystems && EmbarkJS.Names.isAvailable();
    if (this.state.error) {
      return (<div>
        <div>Something went wrong connecting to ethereum. Please make sure you have a node running or are using StatusIM
          to connect to the ethereum network:
        </div>
        <div>{this.state.error}</div>
        <div> 
        <a href = "https://Status.im/" target="_blank">
        <img src = "https://status.im/developer_tools/img/lp-status-logo.svg">Install Status </img>
        </a>
        </div>
      </div>);
    }
    return (<div>
      <h3>Emit your IOU tokens - and you don't need money anymore</h3>
      <div>
          IOUs already: {this.state.allIOUs}, from  {this.state.allIssuers} issuers, with {this.state.allKeys} keywords.</div>
      <Nav tabs>
        <NavItem>
          <NavLink onClick={() => this.handleSelect('1')} className={classnames({ active: this.state.activeKey === '1' })}>
            {this._renderStatus('Make new type of IOU ', this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => this.handleSelect('2')} className={classnames({ active: this.state.activeKey === '2' })}>
            {this._renderStatus('Mint & Give IOU', this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>

        <NavItem>
        <NavLink onClick={() => this.handleSelect('3')} className={classnames({ active: this.state.activeKey === '3' })}>
            {this._renderStatus('Pay off IOU', this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>

        <NavItem>
        <NavLink onClick={() => this.handleSelect('4')} className={classnames({ active: this.state.activeKey === '3' })}>
            {this._renderStatus('All IOUs', this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>

        <NavItem>
        <NavLink onClick={() => this.handleSelect('5')} className={classnames({ active: this.state.activeKey === '3' })}>
            {this._renderStatus('List IOUs by Keys', this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>

        <NavItem>
        <NavLink onClick={() => this.handleSelect('6')} className={classnames({ active: this.state.activeKey === '3' })}>
            {this._renderStatus('All Issuers by Addrs', this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>
        <NavItem>
        <NavLink onClick={() => this.handleSelect('7')} className={classnames({ active: this.state.activeKey === '3' })}>
            {this._renderStatus('All Issuers by Names', this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent activeTab={this.state.activeKey}>
        <TabPane tabId="1">
          <MakeIOUs/>
        </TabPane>
        <TabPane tabId="2">
          <MintIOUs />
        </TabPane>
        <TabPane tabId="3">
          <BurnIOUs />
        </TabPane>
        <TabPane tabId="4">
          <ListIOUs state={this.state}
                    setState={state => this.setState(state)} 
                    getValue={() => this.getValue()}/>
        </TabPane>
        <TabPane tabId="5">
          <ListKeys state={this.state}
                    setState={state => this.setState(state)} 
                    getValue={() => this.getValue()} />
        </TabPane>
        <TabPane tabId="6">
          <ListIssuers state={this.state}
                    setState={state => this.setState(state)} 
                    getValue={() => this.getValue()}/>
        </TabPane>

      </TabContent>
    </div>);
  }
}
/**
 *         <NavItem>
        <NavLink onClick={() => this.handleSelect('6')} className={classnames({ active: this.state.activeKey === '3' })}>
            {this._renderStatus('Whisper Them', this.state.whisperEnabled)}
          </NavLink>
        </NavItem>
        <TabPane tabId="6">
          <Whisper />
        </TabPane>
 */

ReactDOM.render(<App/>, document.getElementById('app'));
