App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: async function() {
    return App.initWeb3();
  },

  initWeb3: async function() {
    if (typeOf web3 !== 'undefined') {
      App.web3Provider = web3.currentProdvider;
      web3 = new Web3(web3.currentProdvider)
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7575/')
      web3 = new Web3(App.web3Provider)
    }

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
