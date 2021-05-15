import React from 'react';
import ReactDOM from 'react-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

import EmbarkJS from 'Embark/EmbarkJS';
import MakeIOUs from './components/MakeIOUs';
import MintIOUs from './components/MintIOUs';
import BurnIOUs from './components/BurnIOUs';
import ListIssuers from './components/ListIssuers';
import ListKeys from './components/ListKeys';
import StoreIOUs from '../embarkArtifacts/contracts/StoreIOUs';

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
      allIssuers:0
    };
  }

  componentDidMount() {
    EmbarkJS.onReady((err) => {
      if (err) {
        // If err is not null then it means something went wrong connecting to Celoereum
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
        <div>Something went wrong connecting to Celo. Please make sure you have a node running or are using StatusIM
          to connect to the Celo network:
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
            {this._renderStatus('List of Issuers', this.state.blockchainEnabled)}
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
          <ListIssuers />
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
