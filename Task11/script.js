async function getUniversities() {

    let country = document.getElementById("country").value.trim();
    let result = document.getElementById("result");
    let message = document.getElementById("message");

    if (country === "") {
        message.innerText = "Please enter a country name!";
        result.innerHTML = "";
        return;
    }

    message.innerText = "Loading Universities...";
    result.innerHTML = "";

    try {
        let response = await fetch(
             `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        let data = await response.json();

        if (data.length === 0) {
            message.innerText = "No Universities found!";
            return;
        }

        message.innerText = `Found ${data.length} Universities`;

        data.forEach(function(university) {

            let card = document.createElement("div");
            card.className = "card";

            let name = document.createElement("h3");
            name.textContent = university.name;

            let countryText = document.createElement("p");
            countryText.textContent = "Country: " + university.country;

            let websiteText = document.createElement("p");
            websiteText.textContent = "Website:";

            let link = document.createElement("a");

            let website = university.web_pages[0];

            link.href = website;
            link.textContent = website;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.appendChild(name);
            card.appendChild(countryText);
            card.appendChild(websiteText);
            card.appendChild(link);

            result.appendChild(card);
        });

    } catch (error) {
        message.innerText = "Something went wrong. Please try again.";
        console.log(error);
    }
}