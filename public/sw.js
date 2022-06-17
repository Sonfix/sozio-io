self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(event.request.url).then(function(cache) {
        return cache.match(event.request).then(function (response) {
          if(navigator.onLine){
            return fetch(event.request).then(function(response) {
              if(event.request.method == 'GET'){
                cache.put(event.request, response.clone());
              }
              return response;
            });
          }else{
            if(response){
              return response
            }else{
              return null
            }
          }
        });
      })
    );
});


export function registerSync() {
    if ('serviceWorker' in navigator) {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then(registration => navigator.serviceWorker.ready)
        .then(registration => { // register sync
          if(registration.sync){
            registration.sync.register('order').then(() => {
                console.log('Sync registered');
            });
          }
        });
    } else {
    }
  }

  self.addEventListener('sync', function(event) {
    if (event.tag == 'order') {
      event.waitUntil(getOrderData());
    }
  });

  const URL = application_endpoint_url;

// get data from indexedb
function getOrderData(){
  var indexedDBOpenRequest = indexedDB.open('order',  1)
  indexedDBOpenRequest.onsuccess = function () {
    let db = this.result
    let transaction = db.transaction("order_requests", "readwrite");
    let storeObj = transaction.objectStore("order_requests");
    var cursorRequest = storeObj.openCursor();
    cursorRequest.onsuccess = function(evt) {                    
      var cursor = evt.target.result;
      if (cursor) {
        console.log("cursor.value", cursor.value)
          sendTableOrder(cursor.value, cursor.key)
          cursor.continue();
      }
    };
  }
  indexedDBOpenRequest.onerror = function (error) {
    console.error('IndexedDB error:', error)
  }
}

// order sent to the server
function sendTableOrder(data, index){
  fetch(URL + 'orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => {
    if(response){
      deleteFromIndexdb(index)
    }
  });
}

// delete data from indexedb, that sent to server 
function deleteFromIndexdb(index){
  var indexedDBOpenRequest = indexedDB.open('order',  1)
  indexedDBOpenRequest.onsuccess = function () {
    let db = this.result
    let transaction = db.transaction("order_requests", "readwrite");
    let storeObj = transaction.objectStore("order_requests");
    storeObj.delete(index)
  }
}