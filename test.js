const coupleDiv = document.createElement('div');
coupleDiv.className = 'couple-item';

// Create an image element for the couple's image, if present or not the empty string
if (couple.image) {
    const img = document.createElement('img');
    coupleDiv.appendChild(img);
}

// Create a div for the text. We will append all text data to this one
const textDiv = document.createElement('div');
textDiv.className = 'couple-text';

// Create a div for the couples names
const namesDiv = document.createElement('div');
textDiv.appendChild(namesDiv);

// Add the text data to the couple div
coupleDiv.appendChild(textDiv);
coupleList.appendChild(coupleDiv);
