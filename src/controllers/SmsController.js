import { Contact, Sms } from '../models/';
import db from '../db';
import {
  smsSent, smsType, noSmsRetrieved, smsRetrieved,
  phoneField, noReceiverInfo, noSmsUpdated, smsUpdated,
  updateReturnOptions, statusData, defaultStatus
} from '../utils';

/**
 * Controller to manage transfer and retrieval of sms
 *
 * @class SmsController
 */
class SmsController {
  /**
   * Transfer sms between sender and recipient
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in like errorHandler
   * @returns
   * @memberof SmsController
   */
  static async sendSms(req, res, next) {
    try {
      const { phoneNumber, message } = req.body;
      const { phoneNumber: senderPhone } = req.contact;

      const receiver = await db.findOne(Contact, phoneField, phoneNumber);
      if (!receiver.id) {
        return res.status(404).json({
          error: true,
          message: noReceiverInfo
        });
      }
      if (senderPhone === receiver.phoneNumber) {
        return res.status(400).json({
          error: true,
          message: 'You cannot send a message to yourself'
        });
      }

      const data = { receiver: phoneNumber, sender: senderPhone, message };
      const sentSms = await db.create(Sms, data);
      return res.status(201).json({
        error: false,
        message: smsSent,
        sentSms
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve sms sent out or received
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in like errorHandler
   * @returns
   * @memberof SmsController
   */
  static async retrieveSms(req, res, next) {
    try {
      const { limit = 15, page = 1, type } = req.query;

      const field = smsType[type];
      const { contact: { phoneNumber } } = req;

      const retrieveOptions = { limit: Number(limit), page };
      const query = { [field]: phoneNumber };

      const sentSms = await db.findAll(Sms, query, retrieveOptions);
      if (!sentSms.length) {
        return res.status(404).json({
          error: true,
          message: noSmsRetrieved
        });
      }
      return res.status(200).json({
        error: false,
        message: smsRetrieved,
        sentSms
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update received sms to a received status
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in like errorHandler
   * @returns
   * @memberof SmsController
   */
  static async updateSmsStatus(req, res, next) {
    try {
      const { contact: { phoneNumber } } = req;
      const { smsID } = req.params;
      const query = {
        _id: smsID,
        receiver: phoneNumber,
        status: defaultStatus
      };

      const updatedSms =
        await db.updateOne(Sms, query, statusData, updateReturnOptions);

      if (!updatedSms) {
        return res.status(404).json({
          error: true,
          message: noSmsUpdated
        });
      }
      return res.status(200).json({
        error: false,
        message: smsUpdated,
        updatedSms
      });
    } catch (error) {
      next(error);
    }
  }
}

export default SmsController;
