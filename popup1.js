/*
document.getElementById("buy").addEventListener("click", () => {
    alert("Buy & Sell feature coming soon!");
});

document.getElementById("swap").addEventListener("click", () => {
    alert("Swap feature coming soon!");
});

document.getElementById("bridge").addEventListener("click", () => {
    alert("Bridge feature coming soon!");
});

document.getElementById("send").addEventListener("click", () => {
    alert("Send feature coming soon!");
});

document.getElementById("receive").addEventListener("click", () => {
    alert("Receive feature coming soon!");
});
*/
import { storePrivateKey, getPrivateKey } from "./storage.js";
import { encryptKey, decryptKey } from "./crypto.js";
import { ethers } from "ethers";

document.getElementById("create-wallet").addEventListener("click", async () => {
    const password = document.getElementById("wallet-password").value;
    if (!password) return alert("Enter a password to encrypt your wallet!");

    // Generate Ethereum wallet
    const wallet = ethers.Wallet.createRandom();
    
    // Encrypt and store the private key
    await storePrivateKey("ethereum", wallet.privateKey, password);

    // Show wallet info
    document.getElementById("wallet-address").innerText = wallet.address;
    document.getElementById("wallet-section").style.display = "none";
    document.getElementById("wallet-info").style.display = "block";
});

document.getElementById("unlock-wallet").addEventListener("click", async () => {
    const password = document.getElementById("wallet-password").value;
    if (!password) return alert("Enter password to unlock!");

    const privateKey = await getPrivateKey("ethereum", password);
    if (!privateKey) return alert("Invalid password or no wallet found.");

    const wallet = new ethers.Wallet(privateKey);
    document.getElementById("wallet-address").innerText = wallet.address;
    document.getElementById("wallet-section").style.display = "none";
    document.getElementById("wallet-info").style.display = "block";
});

document.getElementById("lock-wallet").addEventListener("click", () => {
    document.getElementById("wallet-section").style.display = "block";
    document.getElementById("wallet-info").style.display = "none";
});
