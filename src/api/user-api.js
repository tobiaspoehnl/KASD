import Boom from "@hapi/boom";
import { db } from "../model/db.js"



export const userApi = {
    find: {
        handler: async function (request, h) {
            try {
                const users = await db.userStore.getAllUsers();
                return users;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    findOne: {
        handler: async function (request, h) {
            try {
                const user = await db.userStore.getUserById(request.params.id);
                if (!user) {
                    return Boom.notFound("No User with this id");
                }
                return user;
            } catch (err) {
                return Boom.serverUnavailable("No User with this id");
            }
        },
    },

    create: {

        handler: async function (request, h) {
            try {
                const user = await db.userStore.addUser(request.payload);
                if (user) {
                    return h.response(user).code(201);
                }
                return Boom.badImplementation("error creating user");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    deleteAll: {
        handler: async function (request, h) {
            try {
                await db.userStore.deleteAllUsers();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

};
