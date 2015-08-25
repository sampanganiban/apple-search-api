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

					$('#search-results').append('<img src="'+dataFromServer.results[i].artworkUrl100+'">');

				});
				
			},
			error: function(){
				console.log('Cannot connect to apple search PHP file');
			}
		});

	});

});