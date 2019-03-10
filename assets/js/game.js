
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
        // We're using a form so that the user can hit enter instead of clicking the button if they want
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
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + heroName +  "&api_key=ZEaY6YasfbFqPff4Q6G2uaYK8q2WEcw8&limit=5";
  
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
          
        })

        .then(function(data){console.log(data);});
    });
        // After the data from the AJAX request comes back
     
  