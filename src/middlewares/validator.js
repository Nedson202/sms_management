import { validationError, phoneField, messageField, phoneCountMessage, passwordField } from '../utils';

/**
 * User input validator
 *
 * @class Validator
 */
class Validator {
  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in the call chain
   * @returns
   * @memberof Validator
   */
  static errorHandler(req, res, next) {
    const errors = req.validationErrors();
    const errorArray = [];

    if (errors) {
      errors.map(error => errorArray.push(error.msg));
      return res.status(400).json({
        error: true,
        errorType: validationError,
        errorData: errorArray,
      });
    }
    next();
  }

  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in the call chain
   * @memberof Validator
   */
  static async newContactRequest(req, res, next) {
    const { errorHandler } = Validator;
    req.check(phoneField, 'phoneNumber should be digits').isInt();
    req.check(phoneField, phoneCountMessage).isLength({ min: 13 });

    errorHandler(req, res, next);
  }

  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in the call chain
   * @memberof Validator
   */
  static async newSmsRequest(req, res, next) {
    const { errorHandler } = Validator;
    req.check(messageField, 'Message cannot be empty').trim().notEmpty();
    req.check(phoneField, 'phoneNumber should be digits').isInt();
    req.check(phoneField, phoneCountMessage).isLength({ min: 13 });

    errorHandler(req, res, next);
  }

  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in the call chain
   * @memberof Validator
   */
  static async loginContactRequest(req, res, next) {
    const { errorHandler } = Validator;
    req.check(phoneField, 'phoneNumber should be digits').isInt();
    req.check(phoneField, phoneCountMessage).isLength({ min: 13 });
    req.check(passwordField, 'Password cannot be empty').trim().isLength({ min: 4 });

    errorHandler(req, res, next);
  }
}

export default Validator;
