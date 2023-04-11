// returns a mime type based on the path entered
const detectType = path => {
    // gets the file type from a path (without the dot)
    const fileType = path.match(/(?<=\.).*$/g)[0];
    
    switch (fileType) {
        case "html":
            return {"Content-type": "text/html"};
        case "css":
            return {"Content-type": "text/css"};
        case "js":
            return {"Content-type": "application/javascript"};
        case "jpg":
        case "jpe.g":
            return {"Content-type": "image/jpeg"}
        default:
            console.log("Unknown mime type: " + fileType);
            return undefined;
    }
}

module.exports = detectType;