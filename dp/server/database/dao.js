import { dirname, resolve } from "path";
import sqlite from "sqlite3";
import {fileURLToPath} from "url";

const db = new sqlite.Database(dirname(fileURLToPath(import.meta.url)) + "/app.db");

export default class {
    static beginTransaction() {
        return new Promise((resolve, reject) => {
            db.run("BEGIN TRANSACTION", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static commitTransaction() {
        return new Promise((resolve, reject) => {
            db.run("COMMIT", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static rollbackTransaction() {
        return new Promise((resolve, reject) => {
            db.run("ROLLBACK", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static run(query, args) {
        return new Promise((resolve, reject) => {
            db.run(query, args, (err, result) => {
                if(err) reject(err);
                resolve(result)
            })
        })
    }

    static get(query, args) {
        return new Promise((resolve, reject) => {
            db.get(query, args, (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }

    static all(query, args) {
        return new Promise((resolve, reject) => {
            db.all(query, args, (err, result) => {
                if(err) reject(err);
                resolve(result)
            })
        })
    }
}
