window.browser = window.browser || window.chrome

browser.storage.sync.get('pages', result => {
    if(result.pages.length > 0) {
        location.href = result.pages[Math.floor(Math.random()*result.pages.length)].pageMessage;
    }
});