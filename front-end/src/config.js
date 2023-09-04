export const config = {
    firebase: {
        apiKey: "AIzaSyDMQCa87wo4i7OQOSP_yl6TaySs4qs0ChI",
        authDomain: "authtads-e3d62.firebaseapp.com",
        projectId: "authtads-e3d62",
        storageBucket: "authtads-e3d62.appspot.com",
        messagingSenderId: "493789784827",
        appId: "1:493789784827:web:6aadf77bcdc66467539e5e"
    },

    api: "http://localhost:3000",
    endpoints: {
        account: {
            signin_firebase: "/account/signin/firebase",
            validate: "/account/validate/",
            signup: "/account/signup",
            signin: "/account/signin",
            logout: "/account/logout"
        },
        collection: {
            upload: "/collection/upload",
            upload_details: "/collection/upload-details",
            list: "/collection/list"
        },
        session: "/session/"
    }
}