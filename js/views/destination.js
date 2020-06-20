const getDepartureSchedule = (location) => {
    var modalBodyOrigin = document.getElementById('modal-body-origin');

    var header = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    fetch(`https://rapidapi-back-end.herokuapp.com/airports/${location}`, header)
    .then(response => response.json())
    .then(res => {
        var elements = '';
        
        res.forEach(e => {
            elements = elements +
                `<div class="d-flex flex-column justify-content-center align-items-start">` +
                    `<div style="cursor: pointer;" class="d-flex flex-row justify-content-start align-items-center">` +
                        `<button class="btn btn-primary btn-origin-choice" data-toggle="modal" data-target="#origin-modal">` + 
                            `<i class="fas fa-plane-departure"></i>` +
                        `</button> &nbsp;&nbsp;` +
                        `<i class="fas fa-plane-departure"></i> &nbsp;&nbsp;<p>${e.display_name}</p>` +
                    `</div>` +
                `</div>`;
        });

        modalBodyOrigin.innerHTML = elements;
    });
};

const getArrivalSchedule = (location) => {
    var modalBodyDestination = document.getElementById('modal-body-destination');

    var header = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    fetch(`https://rapidapi-back-end.herokuapp.com/airports/${location}`, header)
    .then(response => response.json())
    .then(res => {
        var elements = '';
        
        res.forEach(e => {
            elements = elements +
                `<div class="d-flex flex-column justify-content-center align-items-start">` +
                    `<div style="cursor: pointer;" class="d-flex flex-row justify-content-start align-items-center">` +
                        `<button class="btn btn-primary btn-destination-choice" data-toggle="modal" data-target="#destination-modal">` +
                            `<i class="fas fa-plus"></i>` +
                        `</button> &nbsp;&nbsp;` +
                        `<i class="fas fa-plane-arrival"></i> &nbsp;&nbsp;<p>${e.display_name}</p>` +
                    `</div>` +
                `</div>`;
        });

        modalBodyDestination.innerHTML = elements;
    });
};

const getBookings = (d1, o1, dd1, ta, date, price) => {
    var body = document.getElementById('body');
    var backgroundLoader = document.getElementById('background-loader');
    var bookingList = document.getElementById('booking-list');

    backgroundLoader.style.display = "flex";
    body.style.overflowY = "hidden";

    var header = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    fetch(`https://rapidapi-back-end.herokuapp.com/bookings/${d1}/${o1}/${dd1}/${ta}`, header)
    .then(response => response.json())
    .then(res => {
        var elements = '';
        
        res.itineraries.forEach(e => {
            elements = elements +
            `<div class="row">
            <div class="col-md-9 col-sm-12" style="padding: 6px; border-radius: 4px; border: dashed 1px #999;">
                <div>${date}</div>
                <span style="border-top: dashed 1px #999" class="d-flex flex-row justify-content-start align-items-center">`;
                    
                e.f[0].l.forEach((e2, index, array) => {
                    if (array.length - 1 === index) {
                        elements = elements +
                        `<p style="margin:0; font-size:26px;">${e2.da}</p>
                        <i class="fas fa-arrow-circle-right" style="margin: auto 8px; color: #DD1676"></i>
                        <p style="margin:0; font-size:26px;">${e2.aa}</p>`;
                    } else {
                        elements = elements +
                        `<p style="margin:0; font-size:26px;">${e2.da}</p>
                        <i class="fas fa-arrow-circle-right" style="margin: auto 8px; color: #DD1676"></i>`;
                    };
                });
                const departureTime = e.f[0].l[0].dd.split('T')[1].split('-')[0].split(':');
                const arrivalTime = e.f[0].l[e.f[0].l.length - 1].ad.split('T')[1].split('-')[0].split(':');

                elements = elements +
                `<div style="margin: 0 0 0 auto;" class="d-flex flex-column justify-content-end align-items-end">
                        <p style="margin-bottom: 4px;"><strong>${e.f[0].l.length - 1}</strong> paradas</p>
                        <p style="font-size: 10px; margin-bottom: 4px;">CLASSE: <i>econômica</i></p>
                    </div>
                </span>
                <div>
                    <p style="margin-top: 12px; font-size: 26px; font-family: 'Roboto', sans-serif;"><strong>Horário</strong></p>
                    <div class="d-flex flex-row justify-content-start align-items-center">
                        <p style="font-size: 18px; font-family: 'Roboto', sans-serif; margin: 0;">${departureTime[0]}:${departureTime[1]}</p>
                        <i class="fas fa-long-arrow-alt-right" style="margin:0 18px;"></i>
                        <p style="font-size: 18px; font-family: 'Roboto', sans-serif; margin: 0;">${arrivalTime[0]}:${arrivalTime[1]}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12" style="padding: 6px; border-radius: 4px; border: dashed 1px #999;">
                <div class="d-flex flex-column justify-content-start align-items-center">
                    <div class="d-flex flex-row justify-content-center align-items-center">
                        <p style="color=#ccc; font-size: 18px; margin: auto 6px 6px 0;">$</p><p style="font-size: 26px; margin-top: auto; margin-bottom: 4px;">${parseFloat(e.l[0].pr.p).toFixed(2)}</p>
                    </div>
                    <p style="font-size: 10px;">Preço por Adulto só ida</p>
                </div>
                <div class="info-wrapper d-flex flex-row justify-content-between align-items-center">
                    <span>Hotel</span>
                    <span class="info-values">$${parseFloat(price).toFixed(2)}</span>
                </div>
                <div class="info-wrapper d-flex flex-row justify-content-between align-items-center">
                    <span>Passageiros(${ta})</span>
                    <span class="info-values">${e.l[0].pr.dp}.00</span>
                </div>
                <div class="info-wrapper d-flex flex-row justify-content-between align-items-center">
                    <span>Tarifas</span>
                    <span class="info-values">${e.l[0].pr.df}</span>
                </div>
                <hr />
                <div class="info-wrapper d-flex flex-row justify-content-between align-items-center">
                    <span>Total</span>
                    <span class="info-values">$${((e.l[0].pr.p * parseInt(ta)) + e.l[0].pr.f + parseInt(price)).toFixed(2)}</span>
                </div>
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <button style="margin-top: 16px;" class="email-sender btn btn-info btn-block payment-btn" data-toggle="modal" data-target="#email-modal"><i class="fas fa-envelope"></i> E-MAIL</button>
                </div>
            </div>
        </div>
        <hr/>`
        });

        bookingList.innerHTML = elements;

        backgroundLoader.style.display = "none";
        body.style.overflowY = "auto";
    });
}

const postEmail = (email, hotelPrice, fee, ticketPrice, adults, total) => {
    var header = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            hotelPrice,
            fee,
            ticketPrice,
            adults,
            total,
        }),
    };

    fetch(`https://rapidapi-back-end.herokuapp.com/mails`, header)
    .then(response => response.json())
    .then(res => {
        console.log(res);
    });
}