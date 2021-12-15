import {GraphQLClient, gql} from 'graphql-request'
import 'dotenv/config'

export class GQLProductsFetcher {
    fetchProducts(): Promise<any> {
        const config = {
            gqlUri: process.env.GQL_URL,
            headers: {
                Authorization: "Bearer " + process.env.TOKEN
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
