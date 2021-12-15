import {GraphQLClient, gql} from 'graphql-request'

export class GQLProductsFetcher {
    fetchProducts(): Promise<any> {
        const config = {
            gqlUri: "https://sandbox.centraqa.com/graphql",
            headers: {
                Authorization: "Bearer 83d142fda542a937987c47fc4d673173"
            }
        }

        const client = new GraphQLClient(config.gqlUri, {headers: config.headers})
        return client.request(this.getGQLQuery(), []);
    }

    getGQLQuery(): string {
        return gql`
            query {
                displays (limit: 1) {
                    id
                    name
                    status
                    uri
                    minimumOrderQuantity
                    orderQuantityDenominator
                    description
                    shortDescription
                    metaTitle
                    metaDescription
                    metaKeywords
                    comment
                    tags
                    updatedAt
                    prices{
                        id
                        price {
                            value
                            currency {
                                id
                                name
                                code
                            }
                        }
                        recommendedRetailPrice {
                            value,
                            currency {
                                id
                                name
                                code
                            }
                        }
                        pricelist {
                            id
                            name
                            status
                            comment
                            isDefaultForCurrency
                            updatedAt
                        }
                    }
                    media {
                        id
                        source {
                            mediaSize {
                                name
                                maxWidth
                                maxHeight
                                mimeType
                                quality
                            }
                        }
                        product {
                            id
                        }

                    }
                    displayItems {
                        id
                    }
                }
            }`
    }
}
