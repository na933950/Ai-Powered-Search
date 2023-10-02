interface SynthesisData {
    status: string,
    data: Synthesis,
}

export interface Synthesis {
    synthesis: string,
    searchResults: SearchResults[],
}

interface SearchResults {
    title: string,
    url: string,
    publishedDate: string,
    author: string,
    id: string,
    score: number,
    content: string,
}

export default SynthesisData

