import React from 'react';
import ReactDOM from 'react-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

import EmbarkJS from 'Embark/EmbarkJS';
import Blockchain from './components/blockchain';
import Whisper from './components/whisper';
import MakeIOUs from './components/MakeIOUs';
import MintIOUs from './components/MintIOUs';
import BurnIOUs from './components/BurnIOUs';
import ENS from './components/ens';
import Storage from './components/storage';
import 'bootstrap/dist/css/bootstrap.css';
import './dapp.css';

import MetamaskOnboarding from '@metamask/onboarding'; //  to ./app/  https://github.com/MetaMask/metamask-onboarding.git  

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      activeKey: '1',
      whisperEnabled: false,
      storageEnabled: false,
      blockchainEnabled: false
    };
  }

  componentDidMount() {
    EmbarkJS.onReady((err) => {
      if (err) {
        // If err is not null then it means something went wrong connecting to ethereum
        // you can use this to ask the user to enable metamask for e.g
        return this.setState({error: err.message || err});
      }

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

  render() {
    const ensEnabled = EmbarkJS.Names.currentNameSystems && EmbarkJS.Names.isAvailable();
    if (this.state.error) {
      return (<div>
        <div>Something went wrong connecting to ethereum. Please make sure you have a node running or are using metamask
          to connect to the ethereum network:
        </div>
        <div>{this.state.error}</div>
      </div>);
    }
    return (<div>
      <h3>Embark - Usage Example</h3>
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

          <NavLink onClick={() => this.handleSelect('5')} className={classnames({ active: this.state.activeKey === '5' })}>
            {this._renderStatus('P2P communication (Whisper)', this.state.whisperEnabled)}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => this.handleSelect('4')} className={classnames({ active: this.state.activeKey === '4' })}>
            {this._renderStatus('Naming (ENS)', ensEnabled)}
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
        <TabPane tabId="5">
          <Whisper enabled={this.state.whisperEnabled}/>
        </TabPane>
        <TabPane tabId="4">
          <ENS enabled={ensEnabled}/>
        </TabPane>
      </TabContent>
    </div>);
  }
}
//const onboarding = new MetamaskOnboarding()
//onboarding.startOnboarding()
ReactDOM.render(<App/>, document.getElementById('app'));
