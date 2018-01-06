'use strict';

function ValidationService($q) {
  var _this = this;

  _this.validationService = {
    required: 'required',
    loginFailure: 'login_failure',
    passwordMismatch: 'password_mismatch',
    existingUser: 'existing_user'
  };

  _this.addRequiredValidationError = function(validationErrors, key, message) {
    _this.addVlidationError(validationErrors, key, _this.validationCodes.required, message);
  };

  _this.addValidationError = function(validationErrors, key, code, message) {
    if (!validationErrors.errors.hasOwnProperty(key)) {
      validationErrors.errors[key] = [];
    }

    var error = {
      code: code,
      message: message
    };

    validationErrors.errors[key].push(error);
  };
}

module.exports = ValidationService;
