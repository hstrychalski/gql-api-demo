import { ESClient } from "./ESClient";
import { GQLProductsFetcher } from './GQLProductsFetcher';

const index = 'test-index';
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
    client.pushProductsToIndex(index, products.displays)
});
