
      // Initial array of Heros
      var heros = ["Deadpool", "Spider-Man", "Gambit", "Night Crawler"];

      // Function for displaying hero data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#heros-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < heros.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("hero");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", heros[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(heros[i]);
          // Adding the button to the HTML
          $("#heros-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-hero").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();

        // This line will grab the text from the input box
        var hero = $("#hero-input").val().trim();
        // The movie from the textbox is then added to our array
        heros.push(hero);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();

      $(".hero").on("click", function() {
        var heroName = $(this).attr("data-name");
        // Storing our giphy API URL for a random cat image
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + heroName +  "&api_key=ZEaY6YasfbFqPff4Q6G2uaYK8q2WEcw8&limit=10";

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"

        })// After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" ) {
              // Creating a div for the gif
              var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var heroName = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
             heroName.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append( heroName);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gif-space").prepend(gifDiv);
            }
          }
        });
    });