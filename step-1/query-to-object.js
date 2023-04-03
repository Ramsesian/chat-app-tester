// converts a query to an object, cory must be in the form of:
// email=test%40gmail.com&password=srats&remember=true

// splits the input string to get the fields
const toObject = query => query.split("&").reduce((accumulator, field) => {
        // splits the field into key and value pairs
        const pairs = field.split("=");
        accumulator[pairs[0]] = pairs[1];
        return accumulator;
}, {});


module.exports = toObject;