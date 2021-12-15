import {ApiResponse, Client} from '@elastic/elasticsearch'
import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";
import { IESClient } from "./IESClient";

export class ESClient implements IESClient {

    client: Client

    constructor() {
        this.client = new Client({ node: 'http://localhost:9200' })
    }

    createIndex(name: string): void {
         this.client.indices.create({
            index: name,
            body: {
                "mappings": {
                    "display": {
                        "properties": {
                            "id": {"type": "integer"},
                            "name": {"type": "text"}
                        }
                    }
                }
            }
        }).then(result => {
            if (result.statusCode !== 200) {
                throw Error('Failed to create an index: ' + JSON.stringify(result))
            }
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
