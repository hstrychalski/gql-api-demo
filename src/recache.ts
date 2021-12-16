import { ESClient } from "./ESClient";
import { GQLProductsFetcher } from './GQLProductsFetcher';
import 'dotenv/config'

const index = process.env.INDEX_NAME
const client = new ESClient()

const fetcher = new GQLProductsFetcher();

client.indexExists(index)
.then(exists => {
   return exists.body === true;
}).then(exists => {
    if (exists) {
        return client.dropIndex(index)
    } else {
        return new Promise((resolve) => {
            resolve(true)
        });
    }
}).then(() => {
    return client.createIndex(index)
}).then(() => {
    return fetcher.fetchProducts();
}).then(products => {
    return client.pushProductsToIndex(index, products.displays)
}).then((results: DisplayPushResult[]) => {
    results.forEach(result => {
        console.log(result.body)
    })
}).catch(error => {
    console.log("Error: " + error);
})
