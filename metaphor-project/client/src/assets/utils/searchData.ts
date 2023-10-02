export interface QueryResult {
    title: string,
    url: string,
    publishedDate: string,
    author: string,
    id: string,
    score: number,
    content: string,
    relevance: string,
}

interface Data {
    autopromptString: string,
    results: QueryResult[],
}

interface ResponseData {
    status: string,
    data: Data;
}

export default ResponseData;