"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const moment_1 = __importDefault(require("moment"));
class ContactModel {
    constructor() {
        this.contacts = [];
    }
    /**
     *
     * @param data
     * @returns {object} contact object
     */
    create(data) {
        const newContact = {
            id: uuid_1.default.v4(),
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dateCreated: moment_1.default.now(),
            dateModified: moment_1.default.now(),
        };
        this.contacts.push(newContact);
        return newContact;
    }
    /**
     * @param {uuid} id
     * @returns {object} contact object
     */
    findOne(id) {
        return this.contacts.find((contact) => contact.id === id);
    }
    /**
     * @param {string} phoneNumber
     * @returns {object} contact object
     */
    findOneByPhoneNumber(phoneNumber) {
        return this.contacts.find((contact) => contact.phoneNumber === phoneNumber);
    }
    /**
     * @returns {object} returns all contacts
     */
    findAll() {
        return this.contacts;
    }
    /**
     *  @param {uuid} id
     */
    deleteOne(id) {
        const contact = this.findOne(id);
        if (contact !== undefined) {
            const index = this.contacts.indexOf(contact);
            this.contacts.splice(index, 1);
        }
        return {};
    }
}
exports.default = ContactModel;
