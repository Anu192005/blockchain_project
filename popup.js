document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start-btn").addEventListener("click", function () {
        console.log("🟢 Button Clicked!");
        chrome.tabs.create({ url: chrome.runtime.getURL("Page1.html") });
    });
});
