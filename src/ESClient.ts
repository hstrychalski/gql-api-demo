import {ApiResponse, Client} from '@elastic/elasticsearch'
import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";
import { IESClient } from "./IESClient";

export class ESClient implements IESClient {

    client: Client

    constructor() {
        this.client = new Client({ node: 'http://localhost:9200' })
    }

    createIndex(name: string): TransportRequestPromise<ApiResponse<boolean, unknown>> {
         return this.client.indices.create({
            index: name,
        });
    }

    pushProductsToIndex(indexName: string, displays: IDisplay[]): void {
        displays.forEach((display: IDisplay) => {
            this.client.index({
                index: indexName,
                type: "product",
                id: display.id,
                body: display
            });

            //idk how to return promise here :P
        })
    }

    dropIndex(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>>
    {
        return this.client.indices.delete({ index: indexName});
    }

    indexExists(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>> {
        return this.client.indices.exists({index: indexName});
    }

    queryById(indexName: string, id: number) {
        // I believe that's the place where we need to receive body object created by resolvers
        this.client.search({
            index: indexName,
            body: {
                query: {
                    terms: {
                        id: id
                    }
                }
            }
        }).then(result => {
            console.log(result);
        })
    }

}
