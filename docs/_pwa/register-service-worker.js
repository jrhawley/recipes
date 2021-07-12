// source: https://codelabs.developers.google.com/codelabs/workbox-lab/#2

var indexController = this;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('service-workers.js')
            .then(registration => {
                // determine if the PWA is waiting
                if (registration.waiting) {
                    indexController.updateReady(registration.waiting);
                    return;
                }
                // determine if the PWA is being installed
                if (registration.installing) {
                    indexController.trackInstalling(registration.installing);
                    return;
                }

                // determine if there is an update found for the PWA
                registration.addEventListener('updatefound', function () {
                    indexController.trackInstalling(registration.installing);
                });

                console.log(`Service worker registered. Scope: ${registration.scope}.`);
            })
            .catch(err => {
                console.log(`Service worker registration failed. ${err}.`);
            });
    })
}

// function for tracking installation
function trackInstalling(worker) {
    var indexController = this;
    worker.addEventListener('statechange', function () {
        if (worker.state == 'installed') {
            indexController.updateReady(worker);
        }
    });
}

// function for checking if an update is ready
function updateReady(worker) {
    var res = confirm('New version available. Reload page to update?');
    if (res) {
        worker.postMessage({ action: 'skipWaiting' });
        location.reload();
    }
}