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
      IOUsList: []
    };
  }
  async getIOUList() {
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


   

  componentDidMount() {
    EmbarkJS.onReady((err) => {
      if (err) {
        // If err is not null then it means something went wrong connecting to ethereum
        // you can use this to ask the user to enable metamask for e.g
        return this.setState({error: err.message || err});
      }
      
      this.getIOUList();
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
          <ListIOUs IOUsList={this.state.IOUsList} />
        </TabPane>
        <TabPane tabId="5">
          <ListKeys />
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
