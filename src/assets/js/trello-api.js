function login(key) {
  $.getScript(`https://trello.com/1/client.js?key=${key}`, function() {
    window.Trello.authorize({
      type: 'popup',
      name: 'Trello task list',
      scope: {
        read: 'true',
        write: 'true' },
      expiration: 'never',
      success: authenticationSuccess,
      error: authenticationFailure
    });
  });
}

var authenticationSuccess = function() {
   document.location.href = 'http://localhost:4200/mainpage'
};

var authenticationFailure = function() {
  console.log('Failed authentication');
};
