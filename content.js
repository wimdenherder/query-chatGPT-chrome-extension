chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('ask question here', {request, sender});
    query(request.query);
    sendResponse({message: "received"});
});

function query(text) {
  document.querySelector("textarea").value = decodeURIComponent(text);
  const buttons = document.querySelectorAll("button");
  console.log({buttons})
  if(buttons?.length > 0) {
      const sendButton = document.querySelector("#__next > div.overflow-hidden.w-full.h-full.relative > div > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient > form > div > div.flex.flex-col.w-full.py-2.flex-grow.md\\:py-3.md\\:pl-4.relative.border.border-black\\/10.bg-white.dark\\:border-gray-900\\/50.dark\\:text-white.dark\\:bg-gray-700.rounded-md.shadow-\\[0_0_10px_rgba\\(0\\,0\\,0\\,0\\.10\\)\\].dark\\:shadow-\\[0_0_15px_rgba\\(0\\,0\\,0\\,0\\.10\\)\\] > button") 
                          || buttons[buttons.length - 1];
      sendButton.click();
  }
}

function onload() {
  let timeout = 500;
  const noMachineCheck = document.querySelector("#cf-stage > div.ctp-checkbox-container > label > span");
  if(noMachineCheck) {
    noMachineCheck.click();
    timeout = 1000;
  }

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if(!params.q) return;
  
  setTimeout(() => {
    query(params.q)
  }, timeout);
}

onload();