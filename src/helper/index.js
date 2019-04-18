import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtSecret, tokenValidDuration, failedJwtValidation } from '../utils';

/**
 * Handles general data processing
 *
 * @class Helper
 */
class Helper {
  /**
   * Hashes password sent to the  database
   *
   * @static
   * @param {*} value data to hash
   * @returns
   * @memberof Helper
   */
  static hashPassword(value) {
    return bcrypt.hashSync(value, 10);
  }

  /**
   * Compares hashed password and new for a match
   *
   * @static
   * @param {*} existingPassword previously hashed data
   * @param {*} newPassword raw password to check against the previously hashed one
   * @returns
   * @memberof Helper
   */
  static comparePassword(existingPassword, newPassword) {
    return !bcrypt.compareSync((existingPassword), newPassword);
  }

  /**
   * Generate token from contact information
   *
   * @static
   * @param {*} expires boolean value that denotes that an expiration duration should be set
   * @returns
   * @memberof Helper
   */
  static generateToken(expires) {
    const payload = {
      id: this.id,
      name: this.name,
      phoneNumber: this.phoneNumber
    };
    return jwt
      .sign(payload, jwtSecret, expires
        ? {
          expiresIn: tokenValidDuration
        }
        : null);
  }

  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in like errorHandler
   * @returns
   * @memberof Helper
   */
  static authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader) {
      [token] = [authHeader.split(' ')[1]];
    } else {
      return res.status(403).json({
        error: true,
        message: failedJwtValidation
      });
    }

    try {
      jwt.verify(token, jwtSecret, (error, authenticationData) => {
        if (error) {
          return res.status(403).json({
            error: true,
            message: failedJwtValidation
          });
        }
        req.authenticationData = authenticationData;
        next();
      });
    } catch (error) {
      return error;
    }
  }
}

export default Helper;
