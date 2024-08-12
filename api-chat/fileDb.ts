import {promises as fs} from 'fs';
import {IMessage} from "./types";

const fileName = './db.json';
let data: IMessage[] = [];

const fileDb = {
    async init() {

    },
    async getMessages() {

    },
    async addMessage() {

    },
};

export default fileDb;