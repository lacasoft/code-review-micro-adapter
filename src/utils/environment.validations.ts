import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_AUTHOR: Joi.string().required(),
  APP_VERSION: Joi.number().required(),
  APP_PORT: Joi.number().required(),
  APP_PORT_TCP: Joi.number().required(),
  APP_PROD: Joi.boolean().required(),
  APP_TIME_HOURS_LESS: Joi.number().required(),
  APP_TIME_HOURS: Joi.string().required(),

  RABBIT_MQ_HOST: Joi.string().required(),
  RABBIT_MQ_PORT: Joi.number().required(),
  RABBIT_MQ_USER: Joi.string().required(),
  RABBIT_MQ_PASS: Joi.string().required(),

  LOGS_QUEUE: Joi.string().required(),
  LOG_EVENT_PATTERN: Joi.string().required(),

  MAMBU_API: Joi.string().required(),
  MAMBU_ACCOUNT_CB: Joi.string().required(),
  MAMBU_CASH_BACK_FOUNDS: Joi.number().required(),
  MAMBU_SERVICE_PAYABLE: Joi.number().required(),
  MAMBU_CASH_BACK_LIABILITIES: Joi.number().required(),
  MAMBU_ACCOUNT_TYPE: Joi.string(),
  MAMBU_PRODUCT_TYPE_KEY: Joi.string(),
  MAMBU_ACCOUNT_HOLDER_TYPE: Joi.string(),
  MAMBU_ACCOUNT_CB_NAME: Joi.string(),
});
