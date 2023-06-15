//import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../model/db.js";


export const accountsController = {
    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("main", { title: "Welcome to Placemarks" });
        },
    },
    showSignup: {
        auth: false,
        handler: function (request, h) {
            return h.view("signup-page", { title: "Sign up for Placemarks" });
        },
    },
    signup: {
        auth: false,
        handler: async function (request, h) {
            const user = request.payload;
            await db.userStore.addUser(user);
            return h.redirect("/");
        },
    },
    showLogin: {
        auth: false,
        handler: function (request, h) {
            return h.view("login-page", { title: "Login to Placemark" });
        },
    },
    login: {
        auth: false,
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.userStore.getUserByEmail(email);
            if (!user || user.password !== password) {
                return h.redirect("/");
            }
            request.cookieAuth.set({ id: user._id });
            return h.redirect("/dashboard");
        },
    },
    logout: {
        handler: function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },

    async validate(request, session) {
        const user = await db.userStore.getUserById(session.id);
        if (!user) {
            return {isValid: false};
        }
        return { isValid: true, credentials: user };
    },
};
