import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";
import {ApiResponse} from "@elastic/elasticsearch";

export interface IESClient {
    indexExists(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>>

    createIndex(indexName: string, products: object[]): void

    dropIndex(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>>

    queryById(indexName: string, id: number)
}
