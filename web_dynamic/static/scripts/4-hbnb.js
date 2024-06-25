// web_dynamic/static/scripts/4-hbnb.js

$(document).ready(function () {
    const amenities = {};

    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        const names = Object.values(amenities);
        if (names.length > 0) {
            $('div.amenities h4').text(names.join(', '));
        } else {
            $('div.amenities h4').html('&nbsp;');
        }
    });

    function fetchPlaces(data) {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                $('section.places').empty();
                response.forEach(place => {
                    const article = $('<article></article>');
                    article.append(`<div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></div>`);
                    article.append(`<div class="information"><div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div><div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div></div>`);
                    article.append(`<div class="description">${place.description}</div>`);
                    $('section.places').append(article);
                });
            }
        });
    }

    fetchPlaces({});

    $('button').click(function () {
        fetchPlaces({ amenities: Object.keys(amenities) });
    });
});
