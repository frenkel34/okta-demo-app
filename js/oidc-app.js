requirejs.config({
    "baseUrl": "js",
    "paths": {
      "jquery": "jquery-2.1.4.min",
      "okta-auth-sdk": "OktaAuth.min",
      "okta-config": "config"
    }
});

define(["jquery", "okta-auth-sdk", "okta-config"], function($, OktaAuth, OktaConfig) {

  console.log('Okta Configuration: %o', OktaConfig);
  console.log(OktaAuth);
  var client = new OktaAuth({
    url: OktaConfig.orgUrl,
    clientId: OktaConfig.clientId,
    redirectUri: window.location.href
  });

  var resetDisplay = function() {
    $('div.error').remove();
    $('#claims').empty();
    $('#api-resources').empty();
  };

  var displayClaims = function(claims) {
    $('#claims').append('<pre><code class="json">' +
      JSON.stringify(claims, null, '  ') + '</code></pre>');
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };

  var displayError = function(msg) {
    $('div.error').remove();
    $('div.login-box').append('<div class="error"><p>'+ msg + '</p></div>');
  }

  $(document).ready(function() {
    $('#btn-idp').click(function() {
      resetDisplay();
      client.idToken.authorize({
        scope: OktaConfig.scope,
        prompt: 'login',
        idp: OktaConfig.idp
      })
        .then(function(res) {
          console.log('id_token: %s', res.idToken);
          displayClaims(res.claims);
          localStorage.setItem('id_token', res.idToken);
        })
        .fail(function(err) {
          console.log(err);
          displayError(err.message);
        })
    });
  });
});
