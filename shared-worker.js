var ports = [];
self.addEventListener('connect', function(e) { 
  var currentPort = e.ports[0];
  ports.push(currentPort);
  currentPort.onmessage = function(e) {
    ports.forEach(p => p.postMessage(e.data))
  }
});