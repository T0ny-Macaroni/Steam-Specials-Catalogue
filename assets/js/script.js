// Declared userInput globally to make it accessible in the function
var userInput = $('#searchInput').val();
var gameDetails;
var data;
var gameId;

$('#searchBtn').on('click', function () {
	// Capture the user input when the search button is clicked
	userInput = $('#searchInput').val();

	if (userInput) {
	
		var lnk = $('#lnk');
		lnk.href = 'https://games-details.p.rapidapi.com/search/' + userInput;


		//Calling API function
		performSearch(userInput);
	} else {
		console.log('Invalid input');
	}
	// var html = $('a')
	// // html.attr('href', details.html);
	// console.log(details.html);
});

function performSearch(userInput) {
	const singleSearch = {
		async: true,
		crossDomain: true,
		url: 'https://games-details.p.rapidapi.com/search/' + userInput,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '430c836d45msh0050ea49f6b8455p1f8a07jsn725aabd514c9',
			'X-RapidAPI-Host': 'games-details.p.rapidapi.com'
		}
	};

	$.ajax(singleSearch).done(function (response) {
		console.log(response);
		// performIdSearch(gameId);
		var idVal = $('#game1').data('myval'); //getter
		console.log(idVal);
		// $('#game1').data('myval', response[0].id); //setter
		$('#game1').data('myval', response[0].id).attr('data-myval', response[0].id);
		$('#game2').data('myval', response[1].id).attr('data-myval', response[1].id);
		$('#game3').data('myval', response[2].id).attr('data-myval', response[2].id);

		// $('#game1').append(response[0].id);
		console.log(response[0].id);
		console.log(response[1].id);
		// $('#game2').append(response[1].id);
		// $('#game3').append(response[2].id);
		$('#game1').text(response[0].name);
		$('#game2').text(response[1].name);
		$('#game3').text(response[2].name);
		// var html = $('a')
		// html.attr('href', details.html);
	});
};

$('#game1').on ('click', function() {
	// performIdSearch();
	var gameID = $('#game1').data('myval'); //getter
	console.log(gameID);
	performIdSearch(gameID);
	// console.log('Game Details', performIdSearch(gameID));
});

$('#game2').on ('click', function() {
	// window.location.href = "details.html";
	// performIdSearch(response[1].id);
	// console.log('Game Details', performIdSearch);
	var gameID = $('#game2').data('myval'); //getter
	console.log(gameID);
	performIdSearch(gameID);
});

$('#game3').on ('click', function() {
	// window.location.href = "details.html";
	// performIdSearch(response[2].id);
	// console.log('Game Details', performIdSearch);
	var gameID = $('#game3').data('myval'); //getter
	console.log(gameID);
	performIdSearch(gameID);
});

//Performs a single game search based on a game's ID (we previously got data from a game search + user Input)
function performIdSearch(gameId) {
	// console.log(gameId);
	const idSearch = {
		async: true,
		crossDomain: true,
		url: 'https://games-details.p.rapidapi.com/single_game/' + gameId,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '430c836d45msh0050ea49f6b8455p1f8a07jsn725aabd514c9',
			'X-RapidAPI-Host': 'games-details.p.rapidapi.com'
		}
	};

	$.ajax(idSearch).done(function (response) {
		console.log(response);
	});
};

// Meme generator is DONE and working!
//I put variables here for now
var memeBtn = $('#memeBtn');
var memeImg = $('#memeImg');

const memeGenerator = {
	async: true,
	crossDomain: true,
	//url: 'https://meme-generator11.p.rapidapi.com/meme',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8eae8fe45emsh8cde312977721fcp1a1962jsn1c9b69406dde',
		'X-RapidAPI-Host': 'meme-generator11.p.rapidapi.com'
	}
};

function generateMeme() {
	$.ajax(memeGenerator).done(function (response) {
		console.log(response);
		displayMeme(response.url);
	});
}

function displayMeme(url) {
	const memeContainer = $('#memeContainer');
	memeContainer.empty();
	const memeImg = $('<img>').attr('src', url);
	memeImg.on('error', function () {
		memeImg.attr('src', 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjBmNGpiNGgyMnhlcmowa3BpaWFtaTk4ajN5YW1vdDlhcmx1dnRzYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14uQ3cOFteDaU/giphy.gif')
		var messageP = $('<p>Sorry, this image is not avaiable:(</p>');
		memeContainer.append(messageP);
	})
	memeContainer.append(memeImg);
}
$('#memeBtn').on('click', generateMeme);

///////////////////////////////////////////////////////////////////////
// Displays youtube videos on the search page
function videoSearch() {
  const youtubeSearch = {
    async: true,
    crossDomain: true,
    // url: 'https://youtube-search-results.p.rapidapi.com/youtube-search/?q=' + userInput + ' trailer',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '13c0ab065bmsh9eeb9e8413c0474p1a1ef8jsnb069211559f5',
      'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
    }
  };
  
  $.ajax(youtubeSearch).done(function (response) {
    console.log(response);
  });

  // showVideo = document.getElementById('showVideo');
  // tubeVideo = response.items[0].url;
  // $('tubeVideo').attr('src', 'https://youtube-search-results.p.rapidapi.com/youtube-search/?q=' + userInput + ' trailer');
  // showVideo.append(tubeVideo);
  // console.log(tubeVideo);
  //Example https://www.youtube.com/watch?v=p4Q3uh2RaZo - we need to change watch?v to embded to display on html -> https://www.youtube.com/embed=p4Q3uh2RaZo
  //To change the link name we will probably have to use replaceWith method
}


document.addEventListener('DOMContentLoaded', () => {
	// Functions to open and close a modal
	function openModal($el) {
		if (!userInput) {
			$('input:text').attr('placeholder', 'Input a Game');
		} else {
		$el.classList.add('is-active');
	};
	}

	function closeModal($el) {
		$el.classList.remove('is-active');
	}

	function closeAllModals() {
		(document.querySelectorAll('.modal') || []).forEach(($modal) => {
			closeModal($modal);
		});
	}

	// Add a click event on buttons to open a specific modal
	(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
		const modal = $trigger.dataset.target;
		const $target = document.getElementById(modal);


		$trigger.addEventListener('click', () => {
				openModal($target);
		});
	});

	// Add a click event on various child elements to close the parent modal
	(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
		const $target = $close.closest('.modal');

		$close.addEventListener('click', () => {
			closeModal($target);
		});
	});
});


// Dark/light theme toggle switch
// Access toggle switch HTML element
var themeSwitcher = document.querySelector("#theme-switcher");
var dark = document.getElementById("darkMode");

var mode = "dark";

themeSwitcher.addEventListener("click", function () {
	if (mode === "dark") {
		mode = "light";
		dark.setAttribute("id", "lightMode");
	}
	else {
		mode = "dark";
		dark.setAttribute("id", "darkMode");
	}
});