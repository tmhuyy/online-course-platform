const { reviewSchema, userSchema } = require("../schema");
const AppError = require("../utils/AppError");

const validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        const [{ message }] = result.error.details;
        throw new AppError(message, 400);
    } else {
        return next();
    }
};

const validateUser = (req, res, next) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        const [{ message }] = result.error.details;
        throw new AppError(message, 400);
    } else {
        return next();
    }
};

module.exports = { validateReview, validateUser };
