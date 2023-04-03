// handles user creation and deletion
// email=test%40gmail.com&password=srats&remember=true

const files = require("fs");
const userPath = "./database/users/"
// merges propertyUpdater with object. it will only update the key if it exists in the other object as well
function mergeObject(object, propertyUpdater) {
    for (const key in propertyUpdater) {
        if (!Object.hasOwn(object, key)) continue
        object[key] = propertyUpdater[key];
    }
}

// checks at the user exists
function checkUser(username, fileExtension = ".json") {
    return files.existsSync(userPath + username + fileExtension);
}

// deletes a file
function deleteFile(path) {
    files.unlink(path, error => {
        if (error) console.error(error);
        else console.log(`Deleted '${path}'`);
    });
}


class user {
    username = "";
    password = "";
    email = "";
    dateJoined = Date.now();
    theme = "light";
    karma = 0;
    bio = "";
    following = [];
    followedBy = [];    

    construct() {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateJoined = dateJoined;
        this.theme = theme;
        this.karma = karma;
        this.bio = bio;
        this.following = following;
        this.followedBy = followedBy;
    }

    // returns the users details as an object
    get details() {
        return this;
    }

    // accept an object where the keys are the details of the user you want to change, and the value is what you want to set it to
    // example: {email: "name@email.com"}
    set details(object) {
        mergeObject(this, object);
    }    

    // adds user
    add(userDetails = this) {
        const username = userDetails.username;
        const path = userPath + username + ".json";
        // if the file already exists then return false
        if (checkUser(username)) {
            console.error(`Can't add user '$username}' as it already exists`)
            return false;
        }
        // writes the user files and returns true
        files.writeFile(path, JSON.stringify(userDetails), () => {
            console.log(`User '${username}' was created`)
        });
        return true;
    }

    delete(username = this.username) {
        const path = userPath + username;
        if (checkUser(username)) deleteFile(path + ".json");
        if (checkUser(username, ".txt")) deleteFile(path + ".txt");
    }

    update(username = this.username) {
        // get a file by its user name, and merge the two
    }
}


const test = new user();
test.details = {
    username: "name",
    password: "password",
    email: "name@email.com"
}

test.add()
test.delete()