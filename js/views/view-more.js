const get = (location_id) => {
    var reviews = document.getElementById('reviews');

    var header = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    fetch(`https://rapidapi-back-end.herokuapp.com/reviews/${location_id}`, header)
    .then(response => response.json())
    .then(res => {
        var elements = '';
        
        res.data.forEach(e => {
            elements = elements +
                `<span class="d-flex flex-row justify-content-start align-items-center">` +
                    `<img src="${e.user.avatar.small.url}" style="border-radius: 18px; height: 36px; width: 36px; margin-right: 8px;" alt="Avatar picture">` +
                    `<p>${!e.user.name ? 'Guest' : e.user.name}</p>` +
                `</span>` +
                `<hr style="margin: 4px 0;"/>` +
                `<p>${e.title}</p>` +
                `<p style="font-size: 12px;">${e.text}</p>`;
        });

        reviews.innerHTML = elements;
    });
};
