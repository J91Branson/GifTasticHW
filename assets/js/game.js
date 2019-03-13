 // Initial array of Heros
      var heros = ["Deadpool", "Peter Parker", "Gambit", "Kurt Wagner", "Han Solo","Captian Kirk","Robo Cop","Megas XLR","Samurai Jack","One Punch Man"];

      // Function for displaying hero data
      function renderButtons() {
        // Initial array of Heros
      

          // Deleting the hero buttons prior to adding new hero buttons
          // (this is necessary otherwise we will have repeat buttons)
          $("#heros-view").empty();
  
          // Looping through the array of movies
          for (var i = 0; i < heros.length; i++) {
  
            // Then dynamically generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("hero");
            a.addClass("nes-btn is-success");
            // Adding a data-attribute with a value of the hero at index i
            a.attr("data-name", heros[i]);
            // Providing the button's text with a value of the hero at index i
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
          // The hero from the textbox is then added to our array
          heros.push(hero);
  
          // calling renderButtons which handles the processing of our hero array
          renderButtons();
          $("#hero-input").val("");
        });

         // Adding click event listen listener to all buttons
         $(document).on("click", "button", function() {
     // Grabbing and storing the data-name property value from the button
     var heroName = $(this).attr("data-name");
     $("#gifs-appear-here").empty();

     // Constructing a queryURL using the animal name
     var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZEaY6YasfbFqPff4Q6G2uaYK8q2WEcw8&q=" +
       heroName + "&limit=10&offset=0&rating=PG&lang=en";

     // Performing an AJAX request with the queryURL
     $.ajax({
       url: queryURL,
       method: "GET"
     })
       // After data comes back from the request
       .then(function(response) {
         console.log(queryURL);

         console.log(response);
         // storing the data from the AJAX request in the results variable
         var results = response.data;

         // Looping through each result item
         for (var i = 0; i < results.length; i++) {
           

           // Creating and storing a div tag
           var heroDiv = $("<div>");

           

           // Creating a paragraph tag with the result item's rating
           var p = $("<p>").text("Rating: " + results[i].rating);

           // Creating and storing an image tag
           var heroImage = $("<img>");
           heroImage.addClass("heroGif");
           // Setting the src attribute of the image to a property pulled off the result item
           heroImage.attr("src", results[i].images.fixed_height_still.url);
           heroImage.attr("data-state", "still");
           heroImage.attr("data-still",  results[i].images.fixed_height_still.url);
           heroImage.attr("data-animate", results[i].images.fixed_height.url );
           // Appending the paragraph and image tag to the heroDiv
           heroDiv.append(p);
           heroDiv.append(heroImage);

           // Prependng the heroDiv to the HTML page in the "#gifs-appear-here" div
           $("#gifs-appear-here").prepend(heroDiv);
           
           
         }
       });
     });
     $(document).on("click", ".heroGif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
      