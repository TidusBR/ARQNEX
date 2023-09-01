export const config = {
    firebase: {},

    api: "http://localhost:3000",
    endpoints: {
        account: {
            signin_firebase: "/account/signin/firebase",
            validate: "/account/validate/",
            signup: "/account/signup",
            signin: "/account/signin",
            logout: "/account/logout"
        },
        session: "/session/"
    }
}