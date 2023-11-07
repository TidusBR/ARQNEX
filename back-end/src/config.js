export const config = {
    isProduction: false,
    devPort: 3000,
    paypal: {
        baseURL: "https://api-m.sandbox.paypal.com",
        clientId: "AQpA-hhfzocEfg3jkMyuziheekP0vE8aV0qUYvImjibDqvfrmZcH0-sEq0QGaITen2_ZlxoXvzO6-_Tg",
        clientSecret: "EMalGsN8rL-VCIYJgicoZMCVjEup5KxqtRHcdJeXFEk88FtiLZ9sF7Kx_OqV302Scw_kz0C76vsAnaFl"
    },
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    },
    bodyParser: {
        limit: "100mb"
    },
    database: {
        host: "localhost",
        user: "root",
        password: "",
        database: "backend"
    },
    session: {
        secret: "hello world",
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: "strict",
            secure: false
        }
    },
    sessionStore: {
        clearExpired: true,
        createDatabaseTable: true,
        expiration: 86400000,
        checkExpirationInterval: 900000
    },
    sessionProduction: {
        cookie: {
            sameSite: "none",
            secure: true
        }
    }
}