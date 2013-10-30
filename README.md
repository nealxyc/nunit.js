nUnit v0.0.1
========

A Node-style require() for browsers.

### Usage
In `hello.js`

    exports.hi = function(){
    	return "Hello world!" ;
    };
    
Then in your `index.html`

    <script src="nrequire.js"></script>
    <script>
    var hello = require("./hello.js");
    console.log(hello.hi());
    </script>
