(function(){
  if(window.Worker){
    initializeDedicatedWorker()
  }
  else{
    dedicated.querySelector('.errors').innerHTML = "Unfortunately, workers are not supported in this browser"
  }
  if(window.SharedWorker){
    initializeSharedWorker()
  }
  else{
    shared.querySelector('.errors').innerHTML = "Unfortunately, shared workers are not supported in this browser"
  }

  function initializeSharedWorker(){
    var mySharedWorker = new SharedWorker("shared-worker.js");
    setTitleButton.onclick = function(){
      mySharedWorker.port.postMessage(titleSetter.value);
    }
    mySharedWorker.port.start(); 

    mySharedWorker.port.onmessage = function(e) {
      document.title = e.data
    }
  }

  function initializeDedicatedWorker(){
    var myWorker = new Worker("worker-1.js");
    first.onchange = calculate;
    second.onchange = calculate;

    myWorker.onmessage = function(e) {
      result.value = e.data;
    }
    myWorker.onerror = function(e) {
      console.log("********* Error: " + e.message);
    }

    function calculate(){
      myWorker.postMessage([first.value, second.value]);
    }
  }
})()