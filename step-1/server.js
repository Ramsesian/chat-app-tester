const http = require("http"),
      fs = require("fs"),
      parse = require("url").parse,
      strDecoder = require("string_decoder").StringDecoder,
      detectType = require("./mime.js"),
      toObject = require("./query-to-object.js");

const indexPage = "html/index.html";

// is run whenever an HTTP request is made
const server = http.createServer((request, resolve) => { 
    // gets the url
    let parsed = parse(request.url, true);
    // removes leading and trailing slashes
    let path = parsed.pathname.replace(/^\/+|\/+$/g, "");
    // if (path === "") path = indexPage;
    path ||= indexPage;
    
    // save some data pertaining to the request or the resolve object
    const query = parsed.query;
    const headers = request.headers;
    const method = request.method.toLowerCase();

    // creates a stream, on receiving a chunk add it to the buffer
    // is only relevant if information was sent along, something like a get request probably wouldn't even run this
    const decoder = new strDecoder("utf-8");
    let buffer = "";
    request.on("data", chunk => buffer += decoder.write(chunk)); 

    request.on("end", () => {
        // gets the data from the stream if there was any
        buffer += decoder.end();
        
        // gets the function that corresponds with the route from the route's object
        const route = typeof routes[path] !== "undefined"
            ? routes[path]
            : routes["serve"];

        // organizes all the data in an orderly way
        data = {
            path: path,
            query: query,
            headers: headers,
            method: method,
            payload: buffer
        }

        // executes the code associated with the route while passing in the relevant information
        route(data, resolve);
    })
});

// it opens the server
server.listen(3000, "localhost", () => {
    console.log("server opened on port 3000")
})






/**
 * ========================
 * ==== HANDLES ROUTES ====
 * ========================
 */

// handles the routes
const routes = {
    "login": (data, resolve) => {
        console.log(toObject(data.payload))
        // call user.js to add a new user here
        

        resolve.writeHead(302, {"Location": indexPage});
        resolve.end();
    },
    serve: serveFile
}

// handle the request and send back a static files
function serveFile(data, resolve) {
    const path = data.path;
    const file = __dirname + "/public/" + path;
    console.log(`The path "${data.path}" was requested`);


    fs.readFile(file, (error, content) => {
        if (error) {
            // if there's an error right to consul
            console.error(error);
            resolve.writeHead(404);
            resolve.end();
        } else {
            console.log("Returning: " + path);
            // make sure the browser doesn't assume the mind type
            resolve.setHeader("X-Content-Type-Options", "nosniff")
            resolve.writeHead(200, detectType(data.path))
            resolve.end(content)
        }
    });
}
