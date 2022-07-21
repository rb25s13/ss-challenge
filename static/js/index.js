////// index js by dillon carter

const nextBtn = $('#next-btn')
const prevBtn = $('#prev-btn')

// hide next and prev buttons as default
$('button#prev-btn').css('display','none')
$('button#next-btn').css('display','none')

// build url using query value and page number
buildUrl = (q, page) => {

    if (q == "" || q == null) {
        $('#item-results').html('')
        $('#item-results').html(
            `
            <h3>No results for "${q}". Please try a different search term<h3>
            `
        )
        alert("Please enter valid search term")
        return 0
    } else {
        const urlWithParams = new URL('https://api.searchspring.net/api/search/search.json')
        urlWithParams.searchParams.append('siteId', 'scmq7n')
        urlWithParams.searchParams.append('q', q)
        urlWithParams.searchParams.append('resultsFormat', 'native')
        urlWithParams.searchParams.append('page', page)
        console.log('link built', urlWithParams.href)
        return urlWithParams.href
    }
}

// read JSON data and pass to getResults
processUrl = (url) => {
    // clear items-row
    $('#items-row').html("")
    fetch(url)
    .then((response) => response.json())
    .then((data) => getResults(data))
    .catch(error => {
        console.log(error)
    })
}

// read JSON pagination data
pageCheck = (data) => {
    // object to hold page data
    var pageObj = {
        curPage: data.pagination.currentPage,
        prevPage: data.pagination.previousPage,
        nextPage: data.pagination.nextPage,
        totalPages: data.pagination.totalPages,
        totalResults: data.pagination.totalResults,
        filterValue: data.breadcrumbs[0].filterValue
    }
    // check page number for prev/next buttons
    // hide prev & next on first & last pages respectively
    if (pageObj.curPage == pageObj.totalPages) {
        $('button#prev-btn').css('display','')
        $('button#next-btn').css('display','none')
    } else if (pageObj.curPage == 1 || pageObj.curPage == 0) {
        $('button#next-btn').css('display','')
        $('button#prev-btn').css('display','none')
    } else {
        $('button#prev-btn').css('display','')
        $('button#next-btn').css('display','')
    }
    return pageObj
}

// for updating the cart qty
let count = 0

getResults = (data) => {
    // add query header, results row and prev/next buttons
    $('#item-results').html('')
    $('#item-results').append(`
        <h3 id="results"></h3>
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
    scrollToTop()
    
    // display 'no results' if there are none
    if (pageCheck(data).totalResults == 0 || pageCheck(data).filterValue == null) {
        $('#items-container').html("")
        $('button#prev-btn').css('display','none')
        $('button#next-btn').css('display','none')
        $('#page-num').css('display', 'none')
        $('#results').html(
            `
            <h3>No results for "${pageCheck(data).filterValue}".<h3> Please try a different search term
            `
        )
        return
    } 
    else { 
        $('#page-num').css('display', '')
    }

    // fills search bar with query value
    $("#query-term").val(pageCheck(data).filterValue) 
    // display title and page number of qeury
    $('#results').text(pageCheck(data).filterValue)
    $('#page-num').text(`Page ${pageCheck(data).curPage}`)

    // set values of prev & next buttons
    nextBtn.value=pageCheck(data).nextPage
    prevBtn.value=pageCheck(data).prevPage

    // call buttons function
    // pass in data for buttons
    // to build url when clicked
    buttons(data)

    // var to hold cards
    let cards = ''

    // loop through results to build card
    data.results.forEach((i) => {
        
        let msrp = Number(i.msrp)
        let price = Number(i.price)

        // if has msrp and is higher than price, display msrp crossed out
        if (msrp != "" & msrp > price) {
            // format to .00 if there is a decimal
            if (price % 1 != 0) {
                price = price.toFixed(2)
            }
            if (msrp % 1 != 0) {
                msrp = msrp.toFixed(2)
            }
            // html for msrp and price
            var pricesRow = `
                <span class="prices-row">
                    <del>$${msrp}</del>
                    <span class="card-text">$${price}</span>
                </span>
            `
        } else {
            // html for price
            var pricesRow = `
            <span class="prices-row">
                <span class="card-text">$${price}</span>
            </span>
            `
        }
        // html for the item card
        // display using thumbnailImageUrl, name, price
        let card = `
            <div class="col-sm-4">
                <div class="card">
                    <img class="card-img-top" src="${i.thumbnailImageUrl}" alt="${i.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/220x330.png?text=no+image+available'">
                    <div class="card-body">
                        <h5 class="align-middle card-title">${i.name}</h5>
                        ${pricesRow}
                        <button class="btn btn-prime add-to-cart"><span class="glyphicon glyphicon-shopping-cart"></span></button>
                    </div>
                </div><br>
            </div>
        `
        // add card to cards
        cards+=card

    })
    // add cards to items-row
    $('#items-row').html(cards)

    // update cart qty when add to cart button clicked
    $('.add-to-cart').click(() => {
        $('#cart-qty').text(count+=1)
    })

}

// testing processUrl func
// processUrl(buildUrl('tops',1))


///////////////////////////////////////////////////////
// click/keypress functions ///////////////////////////
///////////////////////////////////////////////////////

// prev & next buttons
buttons = (data) => {
    let queryVal = pageCheck(data).filterValue
    $('button#next-btn').unbind('click').bind('click', (i) =>{
        processUrl(buildUrl(queryVal, nextBtn.value))
    })
    $('button#prev-btn').unbind('click').bind('click', (i) =>{
        processUrl(buildUrl(queryVal, prevBtn.value))
    })
}

// query/search submit
$('#query-submit').click(() => {
    // validateForm()
    processUrl(buildUrl($("#query-term").val(),1))
})

// keypress function for enter key
$('#query-term').keypress((e) => {
    if (e.which ==13) {
        processUrl(buildUrl(e.target.value,1))
    }
})

// scroll to results header when results are generated
scrollToTop = () => {
    $('html,body').animate({scrollTop: $($('#sugg-btns')).offset().top})
}

