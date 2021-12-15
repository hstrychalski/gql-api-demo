import { GQLProductsFetcher } from './GQLProductsFetcher';
import { ESClient } from "./ESClient";

const fetcher = new GQLProductsFetcher();
fetcher.fetchProducts();

