const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    money: {
        type: Number,
        default: 150
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
    ]
});

UserSchema.statics.findAndValidate = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : false;
    }
    return false;
};

UserSchema.pre("save", async function (next) {
    // neu password duoc sua doi
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    }
    return next();
});

// automatically add a username and password
const User = mongoose.model("User", UserSchema);

module.exports = User;
