import React from 'react';
import ReactDOM from 'react-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

import EmbarkJS from 'Embark/EmbarkJS';
import MakeIOUs from './components/MakeIOUs';
import MintIOUs from './components/MintIOUs';
import BurnIOUs from './components/BurnIOUs';
import './i18n';

import 'bootstrap/dist/css/bootstrap.css';
import './dapp.css';


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
    const { t } = this.props;

    if (this.state.error) {
      return (<div>
        <div>{t("Something went wrong connecting to ethereum. Please make sure you have a node running or are using metamask  to connect to the ethereum network:")}
        </div>
        <div>{this.state.error}</div>
        <div> 
        <a href = "https://metamask.io/" target="_blank">
        <img src = "https://raw.githubusercontent.com/MetaMask/faq/master/images/download-metamask-dark.png">{t("Install Metamask")} </img>
        </a>
        </div>
      </div>);
    }
    return (<div>
      <h2>{t("Emit your IOU tokens - and you don't need fiat money anymore!")}</h2>
      <Nav tabs>
        <NavItem>
          <NavLink onClick={() => this.handleSelect('1')} className={classnames({ active: this.state.activeKey === '1' })}>
            {this._renderStatus({t('Make new IOU')}, this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => this.handleSelect('2')} className={classnames({ active: this.state.activeKey === '2' })}>
            {this._renderStatus({t("Mint & Give IOU")}, this.state.blockchainEnabled)}
          </NavLink>
        </NavItem>
        <NavItem>

        <NavLink onClick={() => this.handleSelect('3')} className={classnames({ active: this.state.activeKey === '3' })}>
            {this._renderStatus({t("Pay off & burn IOU")}, this.state.blockchainEnabled)}
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
     
      </TabContent>
    </div>);
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
