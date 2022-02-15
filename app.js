// What are we doing in our app?


// create an app object (to make use of namespacing)
const artApp = {};

// save information which will be reused (e.g. API key) within properties on the app object
artApp.apiKey = '6PwvCQHC';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';

// make a call to the API and get some data back
    // take that data and put it on the page
artApp.getArt = function(usersChosenAnimal) {


    // use the URL constructor to formal the API endpoint to which we will be making our request
    const url = new URL(artApp.apiUrl);

    // console.log(url);

    // format and add our parameters to our URL:
    url.search = new URLSearchParams({
        // include the API parameters here:
        key: artApp.apiKey,
        q: usersChosenAnimal,
        imgonly: true,
        ps: 20
    });

    //  now it is finally time to FETCH some data from the beautiful API endpoint we have just constructed
    fetch(url)
        .then( function(apiResponse) {
            // take the promise that is returned and parse it into json
            return apiResponse.json()
        })
        .then( function(artFromTheApi) {
            // this gives us back the whole object
            console.log(artFromTheApi);

            // let's navigate into the property of the whole object which provides us with JUST the art data
            console.log(artFromTheApi.artObjects);

            // take the data returned from the API and passing it to the display method
            artApp.displayArt(artFromTheApi.artObjects);

        })

}


// create a method which will take the API data and display on our page
artApp.displayArt = function(artArray) {
    artArray.forEach( function(individualArtObject) {
        console.log(individualArtObject);

        // extract the data from the API (artist name, piece title, image URL, alt text) and save it within variables
        const artworkTitle = individualArtObject.title;
        const artworkImage = individualArtObject.webImage.url;
        const artist = individualArtObject.principalOrFirstMaker;
        const altText = individualArtObject.longTitle;

        console.log(artworkImage, artworkTitle, artist, altText);

        // create an li element with a class of piece in which this information will be added
        const listElement = document.createElement('li');
        // console.log(listElememt)
        listElement.classList.add('piece');

        // create an h2 to hold the art title
        const heading = document.createElement('h2');
        heading.textContent = artworkTitle;

        // create an img to hold artwork picture
        const image = document.createElement('img');
        // this element node has src and alt properties which we can use!
        image.alt = altText;
        image.src = artworkImage;

        // create a p with a class of artist to hold the artist name
        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('artist');
        paragraphElement.textContent = artist;

        // take the elements we have created and add them to the li

        // you can do this way
        // listElement.appendChild(heading)
        // listElement.appendChild(image)
        // listElement.appendChild(paragraphElement)

        // or this way!
        listElement.append(heading, image, paragraphElement);

        // add the li to the ul (so that the data is finally in the DOM!!!!!)
        const ulElement = document.querySelector('#artwork');
        ulElement.appendChild(listElement);
    })
}


// creat an initialization method which will kickstart our app
artApp.init = function() {
    console.log('App is initialized!');

    // call the method which will get us our art data
    artApp.getArt('Whale');
    
}

// Call the initialization method (at the end of our code)
artApp.init();