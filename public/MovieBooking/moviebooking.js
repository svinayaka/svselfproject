var movieBooking = {};

(function(movieBook) {
    'use strict';
    var movieList = [];
    movieBook.pushMovieList = function(list) {
        movieList = [];
        if(Array.isArray(list)) {
            list.forEach(eachList =>  {
                var totalSeats = eachList.totalSeats;
                eachList.booking = [];
                for (var countSeats = 0 ; countSeats <= totalSeats; countSeats++) {
                    eachList.booking.push({ SeatNumber: countSeats + 1, booked: false, bookedBy:'' });
                }
                movieList.push(eachList)
            });
        }
    }
    movieBook.getMovieList = function() {
        // Gets all the movie List
        return movieList.map(eachMovieList => { return { movie: eachMovieList.movie, screen: eachMovieList.screen}} );
    }
    movieBook.getSeatsList = function(screen, movie) {
        return movieList.filter(eachMovie => {
            if (eachMovie.screen == screen && eachMovie.movie.toLowerCase() == movie) {
                return true;
            }
        })
    }
    movieBook.bookingSeats = function() {

    }
})(movieBooking);
document.onreadystatechange = function() {
    if (document.readyState === 'interactive') {
        initApplication();
        renderMovieApplication();
    }
}
//---------------------------------
var movieSelected;
var movieScreenSelected;
//---------------------------------
function initApplication() {
    "use strict";
    var movies = [
        { movie:'Avengers', perseatprice: '250', currency:'rs', totalSeatsBooked: '', seatsLimit:8, totalSeats: 48, booking: [], screen: '1', timing: '2:30PM' },
        { movie:'Bell Bottom', perseatprice: '250', currency:'rs', totalSeatsBooked: '', seatsLimit:8, totalSeats: 35, booking: [], screen: '2', timing: '3:30PM' }
    ];
    movieBooking.pushMovieList(movies);
}
function renderMovieApplication() {
    "use strict";
    moviePickerRender();
    
}

//-------------------
function moviePickerRender() {
    "use strict";
    var moviePickerElm = document.getElementById('moviePicker');
    var moviePickerListElm = generateMovieList(movieBooking.getMovieList(), 'seats');
    moviePickerElm.appendChild(moviePickerListElm);
    moviePickerElm.addEventListener('change', movieUserPicked );
}
function movieUserPicked(event) {
    "use strict";
    movieSelected = event.target.selectedOptions[0].dataset.movieType;
    movieScreenSelected = event.target.selectedOptions[0].dataset.screenType;
    var movieBookingDetails = movieBooking.getSeatsList(movieScreenSelected, movieSelected)[0];
    showMovieSeats(movieBookingDetails);
}
function showMovieSeats(seatsInfo) {
    var seatsElm = document.getElementById('screenSeatsDisplayed');
    seatsElm.innerHTML = '';
    var rowSeatsLimit = seatsInfo.seatsLimit;
    var rowSeatsFragment = document.createDocumentFragment();
    var colSeatsFragment = document.createDocumentFragment();
    seatsInfo.booking.forEach((eachSeats, rowSeatsTrack) => {
        if (rowSeatsTrack > 0 &&  rowSeatsTrack % rowSeatsLimit == 0) {
            // row completes
            var rowSeats = document.createElement('div');
            rowSeats.classList.add('seatsPosition');
            rowSeats.appendChild(colSeatsFragment);
            rowSeatsFragment.appendChild(rowSeats);
            seatsElm.appendChild(rowSeatsFragment);
            // col creation
            var colSeats = document.createElement('div');
            var colSeatsLabels = document.createTextNode(eachSeats.SeatNumber);
            colSeats.classList.add('seats');
            colSeats.appendChild(colSeatsLabels);
            colSeatsFragment.appendChild(colSeats);
        } else {
             // col creation
            var colSeats = document.createElement('div');
            var colSeatsNumbering = document.createElement('span');
            var colSeatsLabels = document.createTextNode(eachSeats.SeatNumber);
            colSeats.classList.add('seats');
            colSeatsNumbering.appendChild(colSeatsLabels);
            colSeats.appendChild(colSeatsNumbering);
            colSeatsFragment.appendChild(colSeats);
        }
    });
}
function generateMovieList(movieList, className) {
    var listFragment = document.createDocumentFragment();
    movieList.forEach((eachMovieList) => {
        var list = document.createElement('OPTION');
        var textNode = document.createTextNode(eachMovieList.movie);
        list.classList.add(className);
        list.setAttribute('value', eachMovieList.movie);
        list.dataset.movieType = eachMovieList.movie.toLowerCase(); 
        list.dataset.screenType = eachMovieList.screen.toLowerCase(); 
        list.appendChild(textNode);
        listFragment.appendChild(list);
    });
    return listFragment
}