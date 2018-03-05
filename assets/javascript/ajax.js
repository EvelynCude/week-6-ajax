//	feelings array used to create buttons on DOM and to get gif from giphy api
var feelings = ["angry", "annoyed", "anxious", "confused", "crazy", "disappointed", "disgusted", "emotional", "excited",
		"frustrated", "george bush", "good", "happy", "hot", "hungry", "hurt", "in love", "mad", "motivated",
		"pissed off", "pumped", "sad", "surprised"];

//	run funtion to display buttons on DOM
renderButtons();

//	Function to get gifs from giphy api and display results in DOM
function displayfeelings(){
	$("#feels").empty();
	var name = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=Will%20Ferrell%20" + name + "&limit=10&api_key=UN4roI6ShSnhVDA8kN5thgX0vxPfhUUN";
	$("#title").text("Will Ferrell feels " + name);
	// AJAX call for button being clicked 
	$.ajax({
		url: queryURL,
		method: "GET"
	}) .then(function(response){
		var results = response.data;
			for (j=0; j < results.length; j++){
				var feelingDiv = $('<a class="feelings">');
				var p = $("<p>").text("Rating: " + results[j].rating);
				var gif = $("<img>").attr("src", results[j].images.fixed_height_still.url);
				gif.addClass("still");
				feelingDiv.append(p);
				feelingDiv.append(gif);
				$("#feels").append(feelingDiv);
			}
	});
}

//	Funcion to create buttons for all items in "feelings" array and display on DOM
function renderButtons(){
	$("#feelingButtons").empty();
	for (var i = 0; i < feelings.length; i++) {
		var a = $("<button>");
		a.addClass("feel-btn");
		a.attr("data-name", feelings[i]);
		a.text(feelings[i]);
		$("#feelingButtons").append(a);
	}
}

//	Function to add user defined button when user uses user-form
$("#addFeeling").click(function(event){
	event.preventDefault();
	var feeling = $("#feeling-input").val().trim();
	feelings.push(feeling);
	renderButtons();
});

//	Function to run the "displayfeelings" function on click of a feeling button
$(document).on("click", ".feel-btn", displayfeelings);

//	Function to start gif on click and stop gif on click
$(document).on("click", "img", function(){
	var source = $(this).attr("src");
	//	This piece splits the src url of the clicked img into two  
	//	and saves the item in index 1 of the split url (s.gif or .gif) in the variable srcSplit
	var srcSplit = source.split("_")[1];
	//	replaces the ending for the still url with the ending of the animated url and saves it in the animatedSrc variable
	var animateSrc = source.replace("_s.gif", ".gif");
	//	replaces the ending for the animated url with the ending of the still url and saves it in the stillSrc variable
	var stillSrc = source.replace(".gif", "_s.gif");
		//	if the url ending of the clicked img end in s.gif, replace the url with the animated url stored in the animatedSrc variable
		if (srcSplit == "s.gif"){
			$(this).attr("src", animateSrc);
		//	otherwise replace the current url with the still url stored in the stillSrc variable
		}else{
			$(this).attr("src", stillSrc);
		}
});

//	This function works to to start/stop gif on click as well (used original instead)
/*$(document).on("click", "img", function(){
	console.log("clicked");
	var src = $(this).attr("src");
		if($(this).hasClass('still')){
	    	//stop
	    	$(this).attr('src', src.replace("_s.gif", ".gif"));
	    	$(this).removeClass("still");
	  	} else {
	    	//play
	    	$(this).attr('src', src.replace(".gif", "_s.gif"));
	   		$(this).addClass("still");
		}
});*/
