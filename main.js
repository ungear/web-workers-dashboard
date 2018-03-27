(function(){
  if(window.Worker){
    initialize()
  }
  else{
    console.error("Unfortunately, workers are not supported")
  }

  function initialize(){
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