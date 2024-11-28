// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/DV-proyecto_final/service-worker.js')
        .then(() => { console.log('Service Worker Registered'); });
  
  }
  
  let deferredPrompt;
  
  const addBtn = document.querySelector('.add-button');
  addBtn.style.display = 'none';
  
  
  console.log("pre-beforeinstallprompt")
  window.addEventListener('beforeinstallprompt', (e) => {
  
    console.log("beforeinstallprompt")

    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();

    console.log(e)
    console.log(e.plataforms)
  
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
  
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
  
    addBtn.addEventListener('click', () => {
  
        console.log('CLick en button download')

      // hide our user interface that shows our A2HS button
  
      addBtn.style.display = 'none';
  
      // Show the prompt
  
      deferredPrompt.prompt();
  
      // Wait for the user to respond to the prompt
  
      deferredPrompt.userChoice.then((choiceResult) => {
  
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
  
        deferredPrompt = null;
  
      });
  
    });
  
  });