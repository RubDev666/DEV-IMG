export let fetchStatus: { search: string, loadingData: boolean, totalResults: number, results: any } = {
    search: '',
    loadingData: false,
    totalResults: 0,
    results: []
}

export let pageData = {
    resultsPerPage: 40,
    totalPages: 1,
    currentPage: 1
}

export let masonryCustom = {
    columns: 0,
    countColumns: 0,
    firstLoadRows: 2,
    imagesPerScroll: 1,
    initialIteration: 0
}
