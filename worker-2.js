onmessage = function(e) {
  for(let i = 0; i< e.data.timesToSort; i++){
    e.data.sampleToSort.sort();
  }
  postMessage("finished");
}