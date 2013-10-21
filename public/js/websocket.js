  if ("WebSocket" in window)
  {
     // Let us open a web socket
     var ws = new WebSocket("ws://localhost:8888");
     ws.onopen = function()
     {
        //Connection to Web Socket Server is Established
        ws.send("Hello From Client");
     };
     ws.onmessage = function (evt) 
     { 
        //A Message is received
     };
     ws.onclose = function()
     { 
        //Connection to Web Socket Server is Closed
     };
  }
  else
  {
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
  }