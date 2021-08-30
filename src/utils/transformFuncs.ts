type GetSearchTitleType = (term: string, friendFilter: boolean | null, currentPage: number, pagesCount: number) => string
//can add another filters (Function argument + filter value convert logic + title string new parametr)
export const getSearchTitleFromSetParameters: GetSearchTitleType = (term, friendFilter, currentPage, pagesCount) => {
    const filter1 = term ? `"${term}" ` : ''

    let filter2
    switch(friendFilter) {
        case true:
            filter2 = "Friends Only"
            break
        case false:
            filter2 = "Not Friends"
            break
        default:
            filter2 = "All Users"
    }

    return `Search ${filter1}In ${filter2} (Page ${currentPage} of ${pagesCount})`
}