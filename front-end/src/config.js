export const config = {
    firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
    },
    paypalOptions: {
        clientId: "",
        currency: "BRL"
    },
    api: "http://localhost:3000",
    endpoints: {
        office: {
            delete_avatar: "/office/remove/avatar",
            list: "/office/list",
            remove_member: "/office/remove/member",
            update: "/office/update",
            update_avatar: "/office/update/avatar",
            info: "/office/info",
            members: "/office/members",
            invite: "/office/invite",
            reject_invite: "/office/invite/reject",
            accept_invite: "/office/invite/accept"
        },
        notifications: "/notifications",
        people: {
            list: "/people/list"
        },
        account: {
            follow: "/account/follow",
            signin_firebase: "/account/signin/firebase",
            validate: "/account/validate/",
            signup: "/account/signup",
            signin: "/account/signin",
            logout: "/account/logout",
            name: "/account/%1/name",
            profile: "/account/profile/",
            update: {
                profile: "/account/update/profile",
                password: "/account/update/password",
                interests: "/account/update/interests",
                education: "/account/update/education",
                courses: "/account/update/courses",
                experiences: "/account/update/experiences"
            },
            editInfo: {
                profile: "/account/edit-info/profile"
            },
            uploadAvatar: "/account/upload-avatar",
            deleteAvatar: "/account/delete-avatar"
        },
        collection: {
            upload: "/collection/upload",
            upload_details: "/collection/upload-details",
            list: "/collection/list",
            newlist: "/collection/newlist",
            like: "/collection/%1/like",
            view: "/collection/%1/view"
        },
        paypal: {
            createOrder: "/paypal/create-order",
            captureOrder: "/paypal/capture-order"
        },
        session: "/session/"
    }
}
