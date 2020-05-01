import EmbarkJS from 'Embark/EmbarkJS';
import $ from 'jquery';
import ERC20Detailed from '../../embarkArtifacts/contracts/ERC20Detailed.js';

let currentToken;

$(document).ready(function() {

    var currentToken;
    $("#deployToken button").click(function() {
      var supply = $('#deployToken input').val();
      ERC20Detailed.deploy({arguments: [supply], data: ERC20Detailed.options.data}).send({gas: 400000}).then(function(deployedToken) {
        currentToken = deployedToken;
        $("#deployToken .result").append("<br>Token deployed with address: " + deployedERC20Detailed.options.address);
      });
    });
    $("#useToken button").click(function() {
      var address = $('#useToken input').val();
      currentToken = new EmbarkJS.Contract({
        abi: ERC20Detailed.options.jsonInterface,
        address: address
      });
    });
  
    web3.eth.getAccounts(function(err, accounts) {
      $('#queryBalance input').val(accounts[0]);
    });
  
    $('#queryBalance button').click(function() {
      var address = $('#queryBalance input').val();
      currentERC20Detailed.methods.balanceOf(address).then(function(balance) {
        $('#queryBalance .result').html(balance.toString());
      });
    });
  
    $('#transfer button').click(function() {
      var address = $('#transfer .address').val();
      var num = $('#transfer .num').val();
      currentERC20Detailed.methods.transfer(address, num).then(function() {
        $('#transfer .result').html('Done!');
      });;
    });
  
  });