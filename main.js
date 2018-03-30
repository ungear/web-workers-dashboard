(function(){
  if(window.Worker){
    initializeDedicatedWorker()
    initializeIntensiveWorker()
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

  function initializeIntensiveWorker(){
    const timesToSort = 20;
    var sampleToSort = [];
    for(let i = 0; i<100000; i++){
      sampleToSort.push(Math.random())
    };
    intensiveStartPlain.onclick = function(){
      report.innerHTML = "Calculations are progress, UI is blocked. Try to write something in the input below.";
      setTimeout(() => {
        for(let i = 0; i< timesToSort; i++){
          sampleToSort.sort();
        }
        report.innerHTML = "Calculations has been finished"
      })
    }

    var myWorker = new Worker("worker-2.js");
    myWorker.onmessage = function(e) {
      report.innerHTML = "Calculations has been finished"
    }
    intensiveStartWorker.onclick = function(){
      report.innerHTML = "Calculations has been started in a worker. UI is not blocked. Try to write something in the input below.";
      myWorker.postMessage({sampleToSort, timesToSort});
    }

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