import { openDB } from "idb";
import { encryptKey, decryptKey } from "./crypto.js";

const dbName = "walletDB";
const storeName = "keys";

export const storePrivateKey = async (walletType, privateKey, password) => {
    const db = await openDB(dbName, 1, {
        upgrade(db) {
            db.createObjectStore(storeName);
        },
    });

    const encryptedKey = encryptKey(privateKey, password);
    await db.put(storeName, encryptedKey, walletType);
};

export const getPrivateKey = async (walletType, password) => {
    const db = await openDB(dbName, 1);
    const encryptedKey = await db.get(storeName, walletType);
    return encryptedKey ? decryptKey(encryptedKey, password) : null;
};
