window.browser = window.browser || window.chrome;

function handleMessage(request, sender, sendResponse) {
  if (request.openTab) {
    browser.tabs.create({
      url: request.openTab
    });
  }
}
browser.runtime.onMessage.addListener(handleMessage);
