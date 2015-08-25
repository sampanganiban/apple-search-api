$(document).ready(function(){

	// Listen for clicks on the submit button
	$('#do-search').click(function(){

		// Get the search query value
		var query = $('#query').val();

		// Make sure there is a value
		if( $.trim(query) == '' ) {
			
			// Display error message
			console.log('Blank query, show error');
			return;

		}

		// AJAX
		$.ajax({
			url: 'app/apple-search.php',
			type: 'get',
			data: {
				searchQuery: query
			},
			beforeSend: function(){},
			success: function( dataFromServer ){
				console.log( dataFromServer );

				// Clear the search results div
				$('#search-results').html('');

				// Loop over each item in the result set
				$(dataFromServer.results).each(function(i){

					// Make life easier
					var product = dataFromServer.results[i];

					// Create a div
					var div = $('<div class="large-4 columns">');

					// Create the preview image
					var image = $('<img src="'+product.artworkUrl100+'">');
					
					// Add the preview image to the div
					$(div).append(image);

					// Create a preview element suitable for the preview file format
					switch( product.kind ) {

						case 'song':
						case 'audiobook':
						case 'music':
							var preview = $('<audio controls preload="none" src="'+product.previewUrl+'">');
						break;

						case 'musicVideo':
						case 'feature-movie':
							var preview = $('<video controls preload="none" src="'+product.previewUrl+'">');
						break;
					}

					// Add the preview to the div
					$(div).append(preview);

					// Add the new product div to the page
					$('#search-results').append(div);


					//$('#search-results').append('<img src="'+dataFromServer.results[i].artworkUrl100+'">');

				});
				
			},
			error: function(){
				console.log('Cannot connect to apple search PHP file');
			}
		});

	});

});