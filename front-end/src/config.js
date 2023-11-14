export const config = {
    firebase: {
        apiKey: "AIzaSyDMQCa87wo4i7OQOSP_yl6TaySs4qs0ChI",
        authDomain: "authtads-e3d62.firebaseapp.com",
        projectId: "authtads-e3d62",
        storageBucket: "authtads-e3d62.appspot.com",
        messagingSenderId: "493789784827",
        appId: "1:493789784827:web:6aadf77bcdc66467539e5e"
    },
    paypalOptions: {
        clientId: "AQpA-hhfzocEfg3jkMyuziheekP0vE8aV0qUYvImjibDqvfrmZcH0-sEq0QGaITen2_ZlxoXvzO6-_Tg",
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