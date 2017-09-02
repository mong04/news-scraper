$(document).ready(function(){

    // Perform function when element with id "save-button" is clicked
    $(document).on("click", "#save-button", saveArticle);

    // Perform function when element with id "scrape-button" is clicked
    $(document).on("click", "#scrape-button", scrapeArticles);

    // Perform function when element with id "note-modal" is clicked
    $(document).on("click", "#note-button", openModal);

    // // 
    // $(document).on("click", "#note-button", getNotes);

    // Perform function when element with id "note-save" is clicked
    $(document).on("click", "#note-save", saveNote);


    // Perform PUT request with _id of the article to update articles saved status in the DB
    function saveArticle() {
        $(this).removeClass("grey darken-1");
        $(this).addClass("cyan darken-1");
        $(this).text("Saved");
        $.ajax({
            method: "PUT",
            url: `/save/${this.value}`
        }).done(function() {
            $("#saved-modal").modal("open");
        })
    }
    
    // Perform initiate GET request to scrape for new articles
    function scrapeArticles() {
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).done(function() {
            $("#scrape-modal").modal("open");
        })
    }
    // Open Notes Modal when note button clicked
    function openModal() {
        $("#note-modal").modal("open");
    }

    // Capture user input for note and send to route to save to DB
    function saveNote(event) {
        event.preventDefault();
        $.ajax({
            method: "POST",
            url: `/articles/59a9bb444cde2f14508c30b0`
        })
    }
});