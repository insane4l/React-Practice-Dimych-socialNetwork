type GetSearchTitleType = (term: string, friendFilter: boolean | null) => string
//can add another filters (Function argument + filter value convert logic + title string new parametr)
export const getSearchTitleFromFilters: GetSearchTitleType = (term, friendFilter) => {
    const filter1 = term ? `${term} ` : ''

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

    return `Search ${filter1}In ${filter2}`
}