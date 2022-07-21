////// suggested tags js by dillon carter

///////////////////////////////////////////////////////
// random suggested tags //////////////////////////////
///////////////////////////////////////////////////////

// display random tags as suggestions
let tagsList = [
    "Gifts for Her",
    "Shop By Trend",
    "What's New",
    "Accessories",
    "Dresses",
    "Sale",
    "Jewelry",
    "Tops",
    "Brands We Love",
    "Home & Office Decor",
    "Shoes",
    "Swimwear",
    "Going Fast",
    "Bottoms",
    "Playsuits",
    "Special Occasion",
    "Athleisure",
    "Style Influencer",
    "Trending",
    "Memorial Day Sale",
    "Back in Stock",
    "Valentine's Day",
    "Shop Lookbook",
    "White & Blue Looks",
    "Shop By Outfit"
]

// generate array of 8 non repeating numbers
randArr = () => {
    const arr = []
    do {
        // random num genenerator
        const randomNumber = Math.floor(Math.random() * (tagsList.length-1)) + 1
        // push if not in array
        if (!arr.includes(randomNumber)) {
            arr.push(randomNumber)
        }
    } while (arr.length < 8) 
    return arr
}

// create tag buttons and cards
randArr().forEach((i, index) => {
    let tagTitle = tagsList[i]
    fetch(buildUrl(tagTitle,1))
    .then((response) => response.json())
    .then((a) => {
        if (index < 4) {
            let suggBtn = `
            <button class="btn btn-tag tag-btn" id="tag-btn" value="${tagTitle}">${tagTitle}</button>
            `
            $('#sugg-btns').append(suggBtn)
        } else {
            let suggCard = `
            <div class="col-sm-3">
            <div class="card">
                <img class="card-img-top" src="${a.results[0].thumbnailImageUrl}" alt="${tagTitle}" onerror="this.onerror=null;this.src='https://via.placeholder.com/270x400.png?text=no+image+available'">
                <div class="card-body">
                ${tagTitle}
                <button class="btn btn-tag glyphicon glyphicon-search tag-btn" id="tag-btn" value="${tagTitle}"></button>
                    </div>
                </div><br>
            </div>
            `
            $('#suggestions').append(suggCard)
        }
    })
    .catch(error => {
        console.log(error);
    })
})
$('#suggestions').append('<h4>Suggestions</h4>')

// tag buttons click function
$("body").on("click", "button#tag-btn", (e) => {
    processUrl(buildUrl(e.target.value, 1))
})