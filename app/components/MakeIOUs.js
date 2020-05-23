import EmbarkJS from 'Embark/EmbarkJS';

import React from 'react';
import {Form, FormGroup, Input, HelpBlock, Button, FormText} from 'reactstrap';

import MakeIOUs from '../../embarkArtifacts/contracts/MakeIOU';
import IOUs from '../../embarkArtifacts/contracts/IOUtoken';
import ReactGA from 'react-ga';
import { Translation } from 'react-i18next';
import { useTranslation } from 'react-i18next';

ReactGA.initialize('UA-161540415-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class MakeIOU extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      valueSet: 10,
      getValue: "",
      logs: [],
      name: "",
      symbol: "",
      myName: "",
      socialProfile: "",
      description: "",
      location: "",
      units: "hours",     
      IOUsList: [],
      curIOU: "",
      curOptstate:"" ,
      ERC20: "" ,
      keywords:""

    };
  }
/*
tt(_tstr)
 {
  const { t, i18n } = useTranslation();
  // or const [t, i18n] = useTranslation();

  return t(_tstr)
}
*/

/*
  tt(_tstr) {
    return ( //i18n={i18n}
      <Translation > 
        {
          (t, { i18n }) => <span>{this.tt(_tstr)}</span>
        }
      </Translation>
    )
  }
*/
tt(_tstr) {
  const { t } = useTranslation();

  return <Trans t={t}>{_tstr}</Trans>;
}


  handleChange(e) {
    let keyVal = {}
    keyVal[e.target.name] = e.target.value;
    this.setState( keyVal );
                 
  }

  handleChangeList(e) {
    let keyVal = {}
    keyVal["getValue"] = this.state.IOUsList[e];
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

  async deployIOU (e) {
    
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    let  account;
    await web3.eth.getAccounts().then(e => { account = e[0];  
      });
      
      const keys = this.state.keywords.split(',', 5);

   let gasAmount;
    await MakeIOUs.methods.makeIOU(
      this.state.name,
      this.state.symbol,
      this.state.myName,
      this.state.socialProfile,
      this.state.description,
      this.state.location,
      this.state.units,
      keys
     ).estimateGas({from: account}).then(e => { gasAmount = e;  
     }); 
    MakeIOUs.methods.makeIOU(
        this.state.name,
        this.state.symbol,
        this.state.myName,
        this.state.socialProfile,
        this.state.description,
        this.state.location,
        this.state.units,
        keys
                ).send({from:account, gas: gasAmount}); //}
    this._addToLog("MakeIOUs.methods.MakeIOUs: ", this.state.getValue);

  }

  async getIOUList(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    let  account;
    await web3.eth.getAccounts().then(e => { account = e[0];  
      });
    MakeIOUs.methods.getIOUList(account).call().then(_value => this.setState({ IOUsList: _value }));
    
  }



  async getValue(e) {
    e.preventDefault();
    await EmbarkJS.enableEthereum();
    
    this.state.curIOU =  EmbarkJS.Blockchain.Contract({
        abi: IOUs.options.jsonInterface,
        address: this.state.getValue});
    
    await this.state.curIOU.methods.thisIOU().call().then(_value =>
      {
      this.setState({name: _value.name});
      this.setState({symbol: _value.symbol});
      this.setState({myName: _value.myName});
      this.setState({socialProfile: _value.socialProfile});
      this.setState({description: _value.description});
      this.setState({location: _value.location});
      this.setState({units: _value.units});
      });
    this._addToLog("IOU address: ", this.state.getValue );
  }

   

  render() {
    return (<React.Fragment>
        
        
        <h3> 1. {this.tt("Deploy IOU")}    </h3>
          <Form>
                <FormGroup>
                <FormText color="muted">{this.tt("ERC20 token name (12 char)")}</FormText>
                  <Input type = "text"
                    key="name"
                // initialValues  = {this.state.addrBA1sell}
                    name="name"
                    placeholder={this.tt("Sheldon Cooper's token")}
                    onChange={(e) => this.handleChange(e)}/>
                <FormText color="muted">{this.tt("ERC20 token symbol (4 char)")}</FormText>
                  <Input type = "text"
                    key="symbol"
                // initialValues  = {this.state.addrBA1sell}
                    name="symbol"
                    placeholder="SCT1"                  
                    onChange={(e) => this.handleChange(e)}/>                    
                 
                 <FormText color="muted">{this.tt("Your name, surname (up to 100 chr)")}</FormText>
                  <Input type = "text"
                    key="myName"
                // initialValues  = {this.state.addrBA1sell}
                    name="myName"
                    placeholder={this.tt("Sheldon Cooper")}
                    onChange={(e) => this.handleChange(e)}/>                    

                 
              <FormText color="muted">{this.tt("Your public profile in social network (up to 100 chr)")}</FormText>
                  <Input type = "text"
                    key="socialProfile"
                // initialValues  = {this.state.addrBA1sell}
                    name="socialProfile"
                    placeholder="www.sheldonbook.cop/ShellyPie"                  
                    onChange={(e) => this.handleChange(e)}/>   

                <FormText color="muted">{this.tt("Your location country, city, area (up to 100 chr)")}</FormText>
                  <Input type = "text"
                    key="location"
                // initialValues  = {this.state.addrBA1sell}
                    name="location"
                    placeholder={this.tt("Pasadena, California, US, Earth")}
                    onChange={(e) => this.handleChange(e)}/>                      
                                 
                <FormText color="muted">{this.tt("Description for IOU")} </FormText>
                  <Input type = "text"
                      key="description"
                      // initialValues  = {this.state.addrBA2buy}
                      name="description"
                      placeholder={this.tt("description of your product or service here")}
                    onChange={(e) => this.handleChange(e)}/>

              <FormText color="muted">{this.tt("Keywords for IOU (max is 5 keys, separated by comma)")} </FormText>
                  <Input type = "text"
                      key="keywords"
                      // initialValues  = {this.state.addrBA2buy}
                      name="keywords"
                      placeholder={this.tt("keywords of your product or service  here.")}
                    onChange={(e) => this.handleChange(e)}/>
                                    

                  <FormText color="muted">{this.tt("Unit of measure for your product or service (for example, hours)")}  </FormText>
                  <Input type = "text"
                      key="units"
                      // initialValues  = {this.state.addrBA2buy}
                      name="units"
                      placeholder={this.tt("hours, or other units of measure for your product or service")}
                    onChange={(e) => this.handleChange(e)}/>
                  <br />

                <Button color="primary" onClick={(e) => this.deployIOU(e)}>{this.tt("Deploy IOU")} </Button>
                </FormGroup>
          </Form>

      </React.Fragment>
    );
  }
}

export default MakeIOU;
