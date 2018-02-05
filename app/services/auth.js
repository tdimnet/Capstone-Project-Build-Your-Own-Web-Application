'use strict';

function AuthService(sessionService, validationService, dataService, $q) {
  var _this = this;

  _this.signIn = function(emailAddress, password) {
    var validationErrors = validationService.getValidationErrorsObject();

    if (!emailAddress) {
      validationService.addRequiredValidationError(
        validationErrors,
        'emailAddress',
        'Please provide an email address.'
      )
    }

    if (!password) {
      validationService.addRequiredValidationError(
        validationErrors,
        'password',
        'Please provide a password.'
      )
    }

    if (validationService.hasValidationErrors(validationErrors)) {
      return validationService.prepareErrorResponse(validationErrors);
    }

    var currentUser = sessionService.currentUser;
    currentUser.emailAddress = emailAddress;
    currentUser.password = password;

    return dataService
      .getUser()
      .then(
        function(response) {
          var user = response && response.data && response.data.data && response.data.data[0];
          currentUser.isAuthenticated = true;
          currentUser._id = user._id;
          currentUser.fullName = user.fullName;
          return $q.resolve(null);
        },
        function(response) {
          sessionService.resetSession();
          validationService.addValidationError(
            validationErrors,
            'password',
            validationService.validationCodes.loginFailure,
            'The login failed for the provided email address and password'
          );
          return validationService.prepareErrorResponse(validationErrors);
        }
      );
  }

  _this.signOut = function() {
    sessionService.resetSession();
  }
}

module.exports = AuthService;
