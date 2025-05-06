let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const quoteButton = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');


//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Function to fetch quotes from the API and store them in the apiQuotes array
async function fetchQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log('Quotes fetched:', apiQuotes); // Debugging line
        getQuote(); // Get a random quote after loading the quotes
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
    
    
}

// Get a random quote from the apiQuotes array
function getQuote() {
    
    if (apiQuotes.length === 0) {
        console.error('No quotes available');
        return;
    }
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    console.log('Quote:', quote); // Debugging line
    console.log('Quote Text:', quote.text); // Debugging line
    
    quoteAuthor.textContent = quote.author || 'Unknown';
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set Quote; hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Tweet the quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.textContent)} - ${encodeURIComponent(quoteAuthor.textContent)}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
quoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// Fetch quotes when the page loads
fetchQuotes();
