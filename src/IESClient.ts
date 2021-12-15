import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";
import {ApiResponse} from "@elastic/elasticsearch";

export interface IESClient {
    indexExists(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>>

    createIndex(name: string): void

    queryById(id: number)
}
