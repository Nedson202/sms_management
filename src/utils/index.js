import dotenv from 'dotenv';

dotenv.config();

export const appUrl = 'App: http://localhost:4000';
export const port = process.env.PORT || 4000;
export const exitZero = 0;
export const logType = 'log';

export const defaultRoute = '/api/v1';
export const defaultContactRoute = '/contact';
export const defaultSmsRoute = '/sms';

export const readMeLink = 'https://github.com/Nedson202/sms_management/blob/develop/README.md';

export const jwtSecret = process.env.SECRET;
export const tokenValidDuration = process.env.EXPIRES_IN;
export const connectionString = process.env.NODE_ENV.match('development')
  ? process.env.DEV_DB : process.env.PROD_DB;

export const unhandledRejection = 'unhandledRejection';
export const uncaughtException = 'uncaughtException';
export const sigterm = 'SIGTERM';

export const defaultLimit = 15;
export const defaultPage = 1;

export const smsType = {
  sent: 'sender',
  received: 'receiver'
};

export const connectionMessage = 'Database connected successfully';
export const deleteContactMessage = 'Contact deleted successfully';
export const unauthorizedMessage = 'Invalid credentials provided!';
export const loginSuccessMessage = 'Login successfully';
export const invalidContactID = 'Contact ID is not valid!';
export const noContactMessage = 'This contact does not exist!';
export const forbiddenAccess = 'You tried to access unauthorized content!';
export const smsSent = 'Sms sent successfully';
export const noSmsRetrieved = 'No sms retrieved';
export const noSmsUpdated = 'Sms status update failed';
export const smsRetrieved = 'Sms retrieved successfully';
export const smsUpdated = 'Sms status updated successfully';
export const noReceiverInfo = 'Phone number of receiver not found';
export const failedJwtValidation = 'Unable to complete your request, you\'re not logged in.';
export const phoneCountMessage = 'phoneNumber should be 13 digits';

export const validationError = 'validationError';

export const phoneField = 'phoneNumber';
export const messageField = 'message';
export const passwordField = 'password';

export const statusEnum = ['Sent', 'Received'];
export const defaultStatus = 'Sent';

export const updateReturnOptions = {
  new: true,
  fields: '_id message sender receiver status createdAt updatedAt'
};

export const statusData = { status: 'Received' };
