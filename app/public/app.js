$(document).ready(function(){
    articleScrape = (data) => {
        $.get("/scrape").then(function(data) {
            console.log(data.message);
        });
    }
    // Perform function when an element with id "save-button" is clicked
    $(document).on("click", "#save-button", saveArticle)

    // Perform PUT request with _id of the article to update articles saved status in the DB
    function saveArticle() {
        $(this).removeClass("grey darken-1");
        $(this).addClass("cyan darken-1");
        $(this).text("Saved");
        $.ajax({
            method: "PUT",
            url: `/save/${this.value}`
        }).done(function() {
            $("#modal1").modal("open");
        })
    }
        
});