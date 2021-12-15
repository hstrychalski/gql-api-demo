"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_fastify_1 = require("apollo-server-fastify");
const apollo_server_core_1 = require("apollo-server-core");
const fastify_1 = require("fastify");
function fastifyAppClosePlugin(app) {
    return {
        serverWillStart() {
            return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                return {
                    drainServer() {
                        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                            yield app.close();
                        });
                    },
                };
            });
        },
    };
}
function startApolloServer(typeDefs, resolvers) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const app = (0, fastify_1.default)();
        const server = new apollo_server_fastify_1.ApolloServer({
            typeDefs,
            resolvers,
            plugins: [
                fastifyAppClosePlugin(app),
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer: app.server }),
            ],
        });
        yield server.start();
        app.register(server.createHandler());
        yield app.listen(4000);
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
//# sourceMappingURL=main.js.map