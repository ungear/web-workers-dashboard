onmessage = function(e) {
  var numberRegexp = /^\d*$/;
  var isInputCorrect = numberRegexp.test(e.data[0]) && numberRegexp.test(e.data[1]);
  if(isInputCorrect){
    let a = parseInt(e.data[0]) || 0;
    let b = parseInt(e.data[1]) || 0;
    postMessage(a + b);
  }
  else
   throw Error("Wrong input")
}