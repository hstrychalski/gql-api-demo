interface IESClient {
    indexExists(): boolean;

    createIndex(name: string): void

    queryById(id: number)
}
