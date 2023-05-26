const Course = require("../models/course");
module.exports = {
    resource: Course,
    options: {
        properties: {
            users: {
                isVisible: {
                    new: false,
                    show: true
                },
            },
            reviews: {
                isVisible: {
                    new: false,
                    show: true

                },
            },
            description: {
                type: "textarea",
                props: {
                    rows: 20,
                },
            },
        },
        actions: {
            // delete: {
            //     isVisible: false,
            // },
        },
    },
};
