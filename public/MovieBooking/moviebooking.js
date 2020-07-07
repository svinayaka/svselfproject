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
                    eachList.booking.push({ SeatNumber: countSeats + 1, bookSeat: false, bookedBy:'', bookConfirmed: false });
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
    movieBook.bookSeats = function(screen, movie, seat) {
        var bookingInfo;
        movieList.forEach((eachMovie) => {
            if (eachMovie.movie == movie && eachMovie.screen == screen) {
                eachMovie.booking.forEach((eachBooking) => {
                    if (eachBooking.SeatNumber == seat) {
                        eachBooking.bookSeat = !eachBooking.bookSeat;
                        bookingInfo = { movie: movie, screen: screen, seatNumber: seat, status: eachBooking.bookSeat }
                    }
                })
            }
        });
        return bookingInfo;
    }
})(movieBooking);
document.onreadystatechange = function() {
    if (document.readyState === 'interactive') {
        initApplication();  // initializing the movies...
        renderMovieApplication(); // rendering the movie seats...
    }
}
//---------------------------------
var movieSelected;
var movieScreenSelected;
var moviePickerElm = document.getElementById('moviePicker');
var screenUI = document.getElementById('screenView');
//---------------------------------
function initApplication() {
    "use strict";
    var movies = [
        { movie:'Avengers', perseatprice: '250', currency:'rs', totalSeatsBooked: '', seatsLimit:8, totalSeats: 48, booking: [], screen: '1', timing: '2:30PM' },
        { movie:'Bell Bottom', perseatprice: '250', currency:'rs', totalSeatsBooked: '', seatsLimit:8, totalSeats: 35, booking: [], screen: '2', timing: '3:30PM' },
        { movie:'Rangitharanga', perseatprice: '150', currency:'rs', totalSeatsBooked: '', seatsLimit:8, totalSeats: 25, booking: [], screen: '1', timing: '5:30PM' }
    ];
    movieBooking.pushMovieList(movies);
}
function renderMovieApplication() {
    "use strict";
    moviePickerRender();
}
function moviePickerRender() { // this is used for drop down rendering and binding event...
    "use strict";
    var moviePickerListElm = generateMovieList(movieBooking.getMovieList(), 'movieseats');
    moviePickerElm.appendChild(moviePickerListElm);
    moviePickerElm.addEventListener('change', movieUserPicked );
    movieLoadSeats();
}


//-----------------------
function movieLoadSeats() {
    updateMovieScreen(moviePickerElm);
    var movieBookingDetails = fetchSeatsInformation();
    generateMovieSeats(movieBookingDetails);
}

// This is where seats get rendered and shown...
function movieUserPicked(event) {
    "use strict";
    updateMovieScreen(event.target); // this used for updating the screen...
    var movieBookingDetails = fetchSeatsInformation();
    generateMovieSeats(movieBookingDetails); // this used to render seats with data...
}
function updateMovieScreen(elm) {
    movieSelected = elm.selectedOptions[0].dataset.movieType;
    movieScreenSelected = elm.selectedOptions[0].dataset.screenType;
    screenUI.innerHTML = 'Screen ' + movieScreenSelected;
}
function fetchSeatsInformation() {
    return movieBooking.getSeatsList(movieScreenSelected, movieSelected)[0];
}
function generateMovieSeats(movieBookingDetails) {
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
            seatsElm.addEventListener('click', seatSelectionToggler);
            // col creation
            colSeatsFragment.appendChild(makeSeats(eachSeats, seatsInfo));
        } else {
            // col creation
            colSeatsFragment.appendChild(makeSeats(eachSeats, seatsInfo));
        }
    });
}
function seatSelectionToggler(event) {
    var seatInfo = event.target.dataset;
    var selectedSeat = seatInfo.seatNumber;
    var selectedScreen = seatInfo.seatScreen;
    var selectedMovie = seatInfo.seatMovie;
    var bookingInfo = movieBooking.bookSeats(selectedScreen, selectedMovie, selectedSeat);
    bookstatuCheck(event.target, bookingInfo.status);
}
function bookstatuCheck(elm, status) {
    if (status) {
        elm.classList.add('seatsSelected');
    } else {
        elm.classList.remove('seatsSelected');
    }
}
function makeSeats(eachSeats, seatsInfo) {
    var colSeats = document.createElement('div');
    var colSeatsNumbering = document.createElement('span');
    colSeatsNumbering.dataset.seatNumber = eachSeats.SeatNumber;
    colSeatsNumbering.dataset.seatScreen = seatsInfo.screen;
    colSeatsNumbering.dataset.seatMovie = seatsInfo.movie;
    colSeatsNumbering.classList.add('seats');
    bookstatuCheck(colSeatsNumbering, eachSeats.bookSeat);
    var colSeatsLabels = document.createTextNode(eachSeats.SeatNumber);
    colSeats.classList.add('movieSeats');
    colSeatsNumbering.appendChild(colSeatsLabels);
    colSeats.appendChild(colSeatsNumbering);
    return colSeats;
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