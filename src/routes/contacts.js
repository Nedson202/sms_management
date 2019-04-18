import { Router } from 'express';
import { ContactController } from '../controllers';
import { validator, validateContact } from '../middlewares';
import helper from '../helper';

const contactRouter = Router();

const { newContactRequest, loginContactRequest } = validator;
const {
  createContact, loginContact, deleteContact
} = ContactController;

contactRouter.post(
  '/',
  newContactRequest,
  createContact
);

contactRouter.post(
  '/login',
  loginContactRequest,
  loginContact
);

// general authentication middleware
contactRouter.use(helper.authenticate);

contactRouter.delete(
  '/',
  validateContact,
  deleteContact
);

export default contactRouter;
