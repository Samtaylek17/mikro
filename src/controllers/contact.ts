import { Request, Response, NextFunction } from 'express';
import * as EmailValidator from 'email-validator';
import ContactModel from '../model/contact';

const Contact = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} contact object
   */
  create(req: Request, res: Response, next: NextFunction): object {
    const name = (req.body as { name: string }).name;
    const email = (req.body as { email: string }).email;
    const phoneNumber = (req.body as { phoneNumber: string }).phoneNumber;

    if (!name && !email && !phoneNumber) {
      throw new Error('All fields are required');
    }

    const validateEmail: boolean = EmailValidator.validate(email);
    if (validateEmail === true) {
      throw new Error('Enter a valid email address');
    }

    const phoneExist = new ContactModel().findOneByPhoneNumber(phoneNumber);

    if (phoneExist !== undefined) {
      throw new Error('Phone number already exist');
    }

    const user = { name, email, phoneNumber };

    const contact = new ContactModel().create(user);
    return res.status(201).send(contact);
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} contacts array
   */
  getAll(req: Request, res: Response): object {
    const contacts = new ContactModel().findAll();
    return res.status(200).send(contacts);
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} contact object
   */
  getOne(req: Request, res: Response): object {
    const contact = new ContactModel().findOne((req.params as { id: string }).id);
    if (!contact) {
      return res.status(404).send({ message: 'contact not found' });
    }

    return res.status(200).send(contact);
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} contact object
   */
  getOneByPhoneNumber(req: Request, res: Response): object {
    const contact = new ContactModel().findOneByPhoneNumber((req.params as { phoneNumber: string }).phoneNumber);
    if (contact === undefined) {
      return res.status(404).send({ message: 'contact not found' });
    }
    return res.status(200).send(contact);
  },
};

export default Contact;
