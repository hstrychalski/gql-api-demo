import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";
import {ApiResponse} from "@elastic/elasticsearch";

export interface IESClient {
    indexExists(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>>

    createIndex(name: string): TransportRequestPromise<ApiResponse<boolean, unknown>>

    pushProductsToIndex(name: string, displays: IDisplay[]): Promise<any>

    dropIndex(indexName: string): TransportRequestPromise<ApiResponse<boolean, unknown>>

    queryAll(indexName: string): TransportRequestPromise<ApiResponse<any, any>>

    queryById(indexName: string, id: number): TransportRequestPromise<ApiResponse<any, any>>
}
