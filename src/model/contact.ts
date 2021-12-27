import uuid from 'uuid';
import moment from 'moment';

interface phoneBook {
  readonly id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateCreated: number;
  dateModified: number;
}

export default class ContactModel {
  contacts: phoneBook[];

  constructor() {
    this.contacts = [];
  }

  /**
   *
   * @param data
   * @returns {object} contact object
   */
  create(data: { name: string; email: string; phoneNumber: string }): phoneBook {
    const newContact: phoneBook = {
      id: uuid.v4(),
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dateCreated: moment.now(),
      dateModified: moment.now(),
    };

    this.contacts.push(newContact);
    return newContact;
  }

  /**
   * @param {uuid} id
   * @returns {object} contact object
   */
  findOne(id: string): phoneBook | undefined {
    return this.contacts.find((contact) => contact.id === id);
  }

  /**
   * @param {string} phoneNumber
   * @returns {object} contact object
   */
  findOneByPhoneNumber(phoneNumber: string): phoneBook | undefined {
    return this.contacts.find((contact) => contact.phoneNumber === phoneNumber);
  }

  /**
   * @returns {object} returns all contacts
   */
  findAll(): phoneBook[] {
    return this.contacts;
  }

  /**
   *  @param {uuid} id
   */
  deleteOne(id: string): {} {
    const contact = this.findOne(id);
    if (contact !== undefined) {
      const index = this.contacts.indexOf(contact);
      this.contacts.splice(index, 1);
    }
    return {};
  }
}
