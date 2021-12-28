"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailValidator = __importStar(require("email-validator"));
const contact_1 = __importDefault(require("../model/contact"));
const Contact = {
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} contact object
     */
    create(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        if (!name && !email && !phoneNumber) {
            throw new Error('All fields are required');
        }
        const validateEmail = EmailValidator.validate(email);
        if (validateEmail === true) {
            throw new Error('Enter a valid email address');
        }
        const user = { name, email, phoneNumber };
        const contact = new contact_1.default().create(user);
        return res.status(201).send(contact);
    },
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} contacts array
     */
    getAll(req, res) {
        const contacts = new contact_1.default().findAll();
        return res.status(200).send(contacts);
    },
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} contact object
     */
    getOne(req, res) {
        const contact = new contact_1.default().findOne(req.params.id);
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
    getOneByPhoneNumber(req, res) {
        const contact = new contact_1.default().findOneByPhoneNumber(req.params.phoneNumber);
        if (!contact) {
            return res.status(404).send({ message: 'contact not found' });
        }
        return res.status(200).send(contact);
    },
};
exports.default = Contact;
