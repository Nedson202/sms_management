# SMS Manager
The SMS Management system helps to facilitate the transfer and retrieval of messages to and from a contact. This API ensures that SMS's sent out are delivered to the right recipients and can only be viewed by them.

# Hosted API
https://sms-manaqer-api.herokuapp.com/api/v1

# Requirements
* Node.js v10.x or higher
* MongoDB instance
* yarn

# Project Structure

```
  ├── README.md
  ├── controllers
  │   ├── ContactController.js
  │   ├── SmsController.js
  │   └── index.js
  ├── db
  │   └── index.js
  ├── helper
  │   └── index.js
  ├── index.js
  ├── middlewares
  │   ├── errorHandler.js
  │   ├── index.js
  │   ├── validateContact.js
  │   └── validator.js
  ├── models
  │   ├── Contact.js
  │   ├── Sms.js
  │   └── index.js
  ├── routes
  │   ├── contacts.js
  │   ├── index.js
  │   └── sms.js
  └── utils
      └── index.js
```

# Installation

```bash
$ git clone https://github.com/nedson202/sms_manager.git
$ cd sms_manager
$ yarn
$ yarn start:dev               # Start the development environment
$ yarn start                   # Run the production build
```

### Note
You need to create a .env file and use the .env.sample as a guide to add your development details.

You can access the API via http://localhost:4000/api/v1/

## Project Details
  `SMS:`

    person sending sms
    person receiving sms
    message of sms
    sms status

  `Contact:`

    name of person
    phone number of person
  

  `The following relationships are represented in the model:`

      All sms sent by a Contact are linked to them
      All sms sent to a Contact are linked to them
      Deleting a contact removes the messages they sent and references to messages they received.

## Usage

| HTTP VERB | Description | Endpoints |
| --- | --- | --- |
| `Post` | Creates a contact | /api/v1/contact |
| `POST` | Logs in a contact | /api/v1/contact/login |
| `DELETE` | Deletes a contact, SMS's sent out and references to received ones | /api/v1/contact |
| `Post` | Sends an SMS to a specified recipient | /api/v1/sms |
| `GET` | Retrieves SMS's based on query type which is either Sent or Received | /api/v1/sms?type= |
| `PUT` | Updates the status of an SMS to Received | /api/v1/sms/status/:smsID |



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please endeavour to update tests as appropriate.
