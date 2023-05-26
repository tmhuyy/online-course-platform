const Admin = require("../models/admin");
module.exports = {
    resource: Admin,
    features: [],
    options: {
        // or you can provide an object with your custom resource options
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
                isAccessible: (context) => {
                    const { record, currentAdmin } = context;

                    // We are only allowing to edit records created by currently logged in user
                    return (
                        record?.params?.createdByUserId ===
                        currentAdmin.id
                    );
                },
                isVisible: true,
            },
        },
    },
}