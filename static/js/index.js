////// js by dillon carter

// hide next and prev buttons as default
$('button#prev-btn').css('display','none')
$('button#next-btn').css('display','none')

// build url using query value and page number
buildUrl = (q, page) => {
    const urlWithParams = new URL('http://api.searchspring.net/api/search/search.json')
    urlWithParams.searchParams.append('siteId', 'scmq7n')
    urlWithParams.searchParams.append('q', q)
    urlWithParams.searchParams.append('resultsFormat', 'native')
    urlWithParams.searchParams.append('page', page)
    console.log('link built', urlWithParams.href)
    return urlWithParams.href
}

// read JSON pagination data
pageCheck = (data) => {
    // get current page number
    let curPage = data.pagination.currentPage
    // check page number for prev/next buttons
    // hide prev & next on first & last pages respectively
    if (curPage === data.pagination.totalPages) {
        $('button#prev-btn').css('display','')
        $('button#next-btn').css('display','none')
    } else if (curPage == 1 || curPage == 0) {
        $('button#next-btn').css('display','')
        $('button#prev-btn').css('display','none')
    } else {
        $('button#prev-btn').css('display','')
        $('button#next-btn').css('display','')
    }
    // object to hold prev & next page numbers
    var pageObj = {
        prevPage: curPage-1,
        nextPage: curPage+1
    }
    return pageObj
}

getResults = (data) => {
    console.log('get results func', data)
    console.log('page check func', pageCheck(data))
    $('#item-results').html('')
    $('#item-results').append(`
        <h3 id="results" href="#results"></h3><br>
        <div class="col-lg-12 col-md-12" id="items-container">
        <div class="text-center" id="page-num"></div>
        <div class="text-right" id="prevNextBtns">
            <button class="btn btn-prime prev-btn" id="prev-btn">Previous</button>
            <button class="btn btn-prime next-btn" id="next-btn">Next</button>
        </div>
        <br>
        <div class="row" id="items-row"></div>
        <br>
        <div class="text-right" id="prevNextBtns">
            <button class="btn btn-prime prev-btn" id="prev-btn">Previous</button>
            <button class="btn btn-prime next-btn" id="next-btn">Next</button>
        </div>
        </div>
    `)
    pageCheck(data)

    // display 'no results' if there are none
    if (data.pagination.totalResults == 0) {
        // $('#results').html("")
        // $('#items-container').html("")
        $('button#prev-btn').css('display','none')
        $('button#next-btn').css('display','none')
        $('#page-num').css('display', 'none')
        $('#results').html(
            `
            <h3 id="results">No results for ${data.breadcrumbs[0].filterValue}<h3>
            `
        )
        return
    } 
    else { 
        $('#page-num').css('display', '')
    }

}

// testing url fetch
let testUrl = buildUrl('jeans',1)

fetch(testUrl)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)
        getResults(data)
    })



    
    

