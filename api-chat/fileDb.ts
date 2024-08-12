import {promises as fs} from 'fs';
import {IMessage} from "./types";

const fileName = './db.json';
let data: IMessage[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (error) {
            data = [];
        }
    },
    async getMessages() {
        return data;
    },
    async addMessage(message: IMessage) {
        data.push(message);
        await this.save();
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data, null, 2));
    },
};

export default fileDb;