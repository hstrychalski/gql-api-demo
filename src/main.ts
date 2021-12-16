import {ApolloServer} from 'apollo-server-fastify';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import fastify, {FastifyInstance} from 'fastify';
import {readFileSync} from "fs";
import {ESClient} from "./ESClient";
import 'dotenv/config'

function fastifyAppClosePlugin(app: FastifyInstance) {
    return {
        async serverWillStart() {
            return {
                async drainServer() {
                    await app.close();
                },
            };
        },
    };
}

async function startApolloServer(typeDefs, resolvers) {
    const app = fastify();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            fastifyAppClosePlugin(app),
            ApolloServerPluginDrainHttpServer({httpServer: app.server}),
        ],
    });

    await server.start();
    app.register(server.createHandler());
    await app.listen(4000);
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const typeDefs = readFileSync('schema.graphql').toString('utf-8')
const resolvers = {
    Query: {
        products() {
            const client = new ESClient();
            return client.queryAll(process.env.INDEX_NAME).then(response => {
                return response.body.hits.hits.map(document => {
                    const product = document._source;
                    return {id: product.id, name: product.name}
                })
            });
        },
        product(_parent, args) {
            const client = new ESClient();

            return client.queryById(process.env.INDEX_NAME, args.id).then(response => {
                return response.body.hits.hits.map(document => {
                    const product = document._source;
                    return {id: product.id, name: product.name}
                })[0]
            });
        }
    }
}
startApolloServer(typeDefs, resolvers)
