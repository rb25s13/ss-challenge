////// js by dillon carter

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

// testing url fetch
let testUrl = buildUrl('jeans',1)

fetch(testUrl)
    .then((response) => response.json())
    .then((data) => console.log(data))


// testing prev, next buttons
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
// hide next and prev buttons as default
$('button#prev-btn').css('display','none')
$('button#next-btn').css('display','none')