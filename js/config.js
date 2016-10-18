(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.OktaConfig = factory();
  }
}(this, function () {

    return {
      orgUrl: 'https://randomcompany.okta-emea.com',
      clientId: '2jPOJJZ4fxZxgS5x0uPV',
      idp: 'ijGrNFMY1FFImpmrDWYT',
      scope: ['openid', 'email', 'profile', 'phone', 'groups']
    };

}));
