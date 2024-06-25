document.addEventListener('DOMContentLoaded', function () {
    const amenityChecked = {};
    const stateChecked = {};
    const cityChecked = {};

    function updateLocations() {
        const locationNames = Object.values(stateChecked).concat(Object.values(cityChecked)).join(', ');
        document.querySelector('.locations h4').textContent = locationNames;
    }

    document.querySelectorAll('.filters ul li input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                if (this.dataset.name) {
                    if (this.closest('ul').previousElementSibling && this.closest('ul').previousElementSibling.textContent === 'States') {
                        stateChecked[this.dataset.id] = this.dataset.name;
                    } else {
                        cityChecked[this.dataset.id] = this.dataset.name;
                    }
                }
            } else {
                if (this.closest('ul').previousElementSibling && this.closest('ul').previousElementSibling.textContent === 'States') {
                    delete stateChecked[this.dataset.id];
                } else {
                    delete cityChecked[this.dataset.id];
                }
            }
            updateLocations();
        });
    });

    document.querySelector('.filters button').addEventListener('click', function () {
        const amenities = Object.keys(amenityChecked);
        const states = Object.keys(stateChecked);
        const cities = Object.keys(cityChecked);

        const searchParams = JSON.stringify({
            amenities: amenities,
            states: states,
            cities: cities
        });

        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: searchParams
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('section.places').innerHTML = '';
            data.forEach(place => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guests</div>
                        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>`;
                document.querySelector('section.places').appendChild(article);
            });
        });
    });
});
