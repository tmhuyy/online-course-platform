const User = require("../models/user");
module.exports = {
    resource: User,
    options: {
        properties: {
            password: {
                isVisible: false,
            },
            _id: {
                isTitle: true,
            },
        },
        actions: {
            new: {
                isVisible: false,
            },
            delete: {
                isVisible: false,
            },
            edit: {
                // before: async (request) => {
                //     console.log(request)
                //     return request
                // },

                after: async (response) => {
                    const editedUser = response?.record?.params?._id;
                    const user = await User.findById(editedUser);
                    console.log(user);
                    return response;
                },
            },
        },
    },
};
