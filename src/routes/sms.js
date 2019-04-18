import { Router } from 'express';
import { SmsController } from '../controllers';
import helper from '../helper';
import { validator, validateContact } from '../middlewares';

const router = Router();

const { newSmsRequest } = validator;
const { sendSms, retrieveSms, updateSmsStatus } = SmsController;

// general authentication middleware
router.use(helper.authenticate);

router.post(
  '/',
  newSmsRequest,
  validateContact,
  sendSms
);

router.get(
  '/',
  validateContact,
  retrieveSms
);

router.put(
  '/status/:smsID',
  validateContact,
  updateSmsStatus
);

export default router;
