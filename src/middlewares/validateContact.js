import db from '../db';
import { Contact } from '../models';
import {
  invalidContactID, noContactMessage,
  forbiddenAccess
} from '../utils';

/**
 * Validate contact info for proof of existence
 *
 * @static
 * @param {*} req request object from client
 * @param {*} res response object sent to client
 * @param {*} next call next action in the call chain
 * @returns
 */
const validateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { authenticationData } = req;
  const { id: authId } = authenticationData;
  const contact = await db.findById(Contact, contactId || authId);

  if (!contact) {
    return res.status(404).json({
      error: true,
      message: invalidContactID
    });
  }
  if (authenticationData.id !== contact.id) {
    return res.status(403).json({
      error: false,
      message: forbiddenAccess
    });
  }
  if (contact.deleted) {
    return res.status(404).json({
      error: true,
      message: noContactMessage
    });
  }
  req.contact = contact;
  next();
};

export default validateContact;
