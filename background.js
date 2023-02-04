// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "1",
    title: 'ChatGPT: explain %s',
    type: 'normal',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  console.log({item})

  // check if user is already on chat.openai.com
  if(item.pageUrl.indexOf('https://chat.openai.com') === 0) 
    return askGPTInCurrentTab(item, tab);

  // otherwise open a new tab
  let url = new URL(`https://chat.openai.com/chat`)
  url.searchParams.set('q', encodeURIComponent('Explain the following: ' + item.selectionText));
  console.log('url.href ', url.href)
  chrome.tabs.create({ url: url.href, index: tab.index + 1 });
});

async function askGPTInCurrentTab(item, tab) {
  console.log({item, tab});
  const response = await chrome.tabs.sendMessage(tab.id, {query: "Explain the following: " + item.selectionText});
  console.log({response})
}