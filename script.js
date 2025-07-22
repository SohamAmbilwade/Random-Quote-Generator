const BASE_URL = 'https://api.quotable.io/quotes/random';

const toggle = document.querySelector('.toggle');
const container = document.querySelector('.container');
const btn = document.querySelector('button');
const quotee = document.querySelector('.quote');
const authorr = document.querySelector('.author');
const quoteBox = document.querySelector('.quote-box');

let darkmode = false;

toggle.addEventListener('click', () => {
  if (darkmode === false) {
    container.style.backgroundColor = '#121212';
    container.style.color = 'white';
    toggle.innerText = '🔆';
    quotee.style.backgroundColor = '#2a2a2a';
  } else {
    container.style.backgroundColor = 'white';
    container.style.color = '#121212';
    toggle.innerText = '🌙';
    quotee.style.backgroundColor = '#eaeaea';
  }
  darkmode = !darkmode;
});

btn.addEventListener('click', async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    const quote = data[0].content;
    const author = data[0].author;

    quotee.innerText = `"${quote}"`;
    authorr.innerText = `— ${author}`;

    const tweetText = encodeURIComponent(`"${quote}" – ${author}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    document.querySelector('.tweet').setAttribute('href', tweetUrl);
  } catch (error) {
    quotee.innerText = "⚠️ Couldn't fetch quote. Try again.";
    authorr.innerText = '';
    console.error('Error fetching quote:', error);
  }
});
