window.browser = window.browser || window.chrome;

const validNewTabPages = ["https://www.msn.com/spartan/ntp", "https://www.google.com/_/chrome/newtab", "chrome://startpage/"];

if(validNewTabPages.some(newTabPage => window.location.href.includes(newTabPage))) {
    let pages = browser.storage.sync.get('pages', result => {
        if(result.pages.length > 0) {
            location.href = result.pages[Math.floor(Math.random()*result.pages.length)].pageMessage;
        }
    });
}