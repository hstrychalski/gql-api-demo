import {ApiResponse, Client} from '@elastic/elasticsearch'
import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";
import { IESClient } from "./IESClient";

export class ESClient implements IESClient {

    client: Client

    constructor() {
        this.client = new Client({ node: 'http://127.0.0.1:9200' })
    }

    createIndex(name: string): TransportRequestPromise<ApiResponse<boolean, unknown>> {
         return this.client.indices.create({
            index: name,
        });
    }

    pushProductsToIndex(indexName: string, displays: IDisplay[]): Promise<any> {
        const promises = []
        displays.forEach((display: IDisplay) => {
            promises.push(this.client.index({
                index: indexName,
                type: "product",
                id: display.id,
                body: display
            }));
        })
        return Promise.all(promises)
    }

    dropIndex(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>>
    {
        return this.client.indices.delete({ index: indexName});
    }

    indexExists(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>> {
        return this.client.indices.exists({index: indexName});
    }

    queryAll(indexName: string): TransportRequestPromise<ApiResponse<any, any>>
    {
        return this.client.search({
            index: indexName,
            body: {
                query: {
                    match_all: {}
                }
            }
        })
    }

    queryById(indexName: string, id: number): TransportRequestPromise<ApiResponse<any, any>> {
        return this.client.search({
            index: indexName,
            body: {
                query: {
                    term: {
                        id: {
                            value: id
                        }
                    }
                }
            }
        })
    }
}
