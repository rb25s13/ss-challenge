let testUrl = 'http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=jeans&resultsFormat=native&page=2'

fetch(testUrl)
    .then((response) => response.json())
    .then((data) => console.log(data))