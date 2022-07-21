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

let testUrl = buildUrl('jeans',1)

fetch(testUrl)
    .then((response) => response.json())
    .then((data) => console.log(data))