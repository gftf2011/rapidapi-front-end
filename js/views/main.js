const get = (checkin, adults, nights, location) => {
    var backgroundLoader = document.getElementById('background-loader');
    var bookingList = document.getElementById('booking-list');

    backgroundLoader.style.display = "flex";

    if (!location) {
        location = 'Los Angeles';
    }

    var header = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    fetch(`https://rapidapi-back-end.herokuapp.com/hotels/${checkin}/${adults}/${nights}/${location}`, header)
    .then(response => response.json())
    .then(res => {
        var elements = '';

        res.data.forEach(e => {
            var [simplePackage ,deluxePackage] = JSON.stringify(e.price).split(' - ');

            simplePackage = parseInt(simplePackage.substr(2)) * adults * nights;
            deluxePackage = parseInt(deluxePackage.substr(1, deluxePackage.length - 1)) * adults * nights;

            elements = elements +
            `<div style="padding: 0;" class="col-lg-4 col-md-6 col-sm-12">`+
                `<div style="position: relative; height: 300px; background-image: url('${e.photo.images.original.url}')" class="image-container">` +
                    `<div style="position: absolute; height: 300px; z-index: 2; background-color: rgba(0,0,0,.35); left: 0; right: 0;" class="d-flex flex-row justify-content-center align-items-center">` +
                        `<a href="./view-more.html?lat=${e.latitude}&lng=${e.longitude}&location_id=${e.location_id}" style="opacity: .75;" class="btn btn-outline-primary"><i class="fas fa-map-marker-alt"></i> VIEW MORE</a>` +
                    `</div>` +
                `</div>` +
                `<div style="padding: 16px;">` +
                    `<p><strong>${e.name}</strong></p>` +
                    `<p><i>Price:</i> ${e.price} &nbsp;&nbsp;&nbsp;&nbsp;<i class="far fa-user"></i> &nbsp;<i>/day</i></p>` +
                    `<p><i>Reviews Number:</i> ${e.num_reviews}</p>` +
                    `<hr/>` +
                    `<p><i>Hotel Class:</i> <strong>${e.hotel_class}</strong> <i class="fas fa-star"></i></p>` +
                    `<hr/>` +
                `</div>` +
                `<div style="padding: 16px;">` +
                    `<p style="text-align: center;"><strong>Our Packages</strong></p>` +
                    `<span class="d-flex flex-column justify-content-center align-items-center">` + 
                        `<p><i class="far fa-user"></i> &nbsp;&nbsp;<i>Guests:</i> ${adults}</p>` +
                        `<p><i class="fas fa-sun"></i> &nbsp;&nbsp;<i>Days:</i> ${nights}</p>` +
                    `</span>` +
                    `<span class="d-flex flex-row justify-content-around align-items-center">` + 
                        `<a href="./destination.html?dest=${location}&checkin=${checkin}&nights=${nights}&adults=${adults}&price=${simplePackage}" style="opacity: .75;" class="btn btn-outline-primary"><i class="fas fa-book"></i> SIMPLE $ ${simplePackage}</a>` +
                        `<a href="./destination.html?dest=${location}&checkin=${checkin}&nights=${nights}&adults=${adults}&price=${deluxePackage}" style="opacity: .75;" class="btn btn-outline-primary"><i class="fas fa-gem"></i> DELUXE $ ${deluxePackage}</a>` +
                    `</span>` +
                `</div>` +
            `</div>`;
        });

        bookingList.innerHTML = elements;

        backgroundLoader.style.display = "none";
    });
};
