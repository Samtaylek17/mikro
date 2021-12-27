import { Request, Response, NextFunction } from 'express';
import * as EmailValidator from 'email-validator';
import ContactModel from '../model/contact';

const Contact = {
  create(req: Request, res: Response) {
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

    const user = { name, email, phoneNumber };

    const contact = new ContactModel().create(user);
    return res.status(201).send(contact);
  },
};
