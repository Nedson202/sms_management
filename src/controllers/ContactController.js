import { Contact, Sms } from '../models/';
import db from '../db';
import { deleteContactMessage, unauthorizedMessage, loginSuccessMessage } from '../utils';
import Helper from '../helper';

/**
 * Controller to manage contact related data like contact creation, login
 *
 * @class ContactController
 */
class ContactController {
  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in like errorHandler
   * @returns
   * @memberof ContactController
   */
  static async createContact(req, res, next) {
    try {
      const { name, phoneNumber, password } = req.body;
      const data = { name, phoneNumber: Number(phoneNumber), password };
      const contactInfo = await db.create(Contact, data);
      const token = contactInfo.generateToken(true);
      return res.status(201).json({ contactInfo, token });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} res call next action in like errorHandler
   * @returns
   * @memberof ContactController
   */
  static async loginContact(req, res, next) {
    try {
      const { phoneNumber, password } = req.body;
      const contact = await db.findOne(Contact, 'phoneNumber', phoneNumber);

      if (!contact || contact.deleted) {
        return res.status(404).json({
          error: true,
          message: 'This contact does not exist!'
        });
      }

      const { password: hashedPassword } = contact;

      const passwordMatch = await Helper
        .comparePassword(hashedPassword, String(password));

      if (!passwordMatch) {
        return res.status(401).json({
          error: true,
          message: unauthorizedMessage
        });
      }

      delete (contact.password);
      const token = await contact.generateToken(contact);

      return res.status(200).json({
        success: true,
        message: loginSuccessMessage,
        token
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} res call next action in like errorHandler
   * @returns
   * @memberof ContactController
   */
  static async deleteContact(req, res, next) {
    try {
      const { contact: { phoneNumber }, contact } = req;
      await db.delete(Contact, contact);
      await db.deleteMany(Sms, { sender: String(phoneNumber) });
      await db.deleteMany(Sms, { receiver: String(phoneNumber) });
      return res.status(200).json({
        error: false,
        message: deleteContactMessage
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ContactController;
