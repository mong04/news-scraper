$(document).ready(function(){
    articleScrape = (data) => {
        $.get("/scrape").then(function(data) {
            console.log(data.message);
        });
    }
    $("#scrape-button").on("click", articleScrape);

})