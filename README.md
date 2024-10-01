# WebScraper

## Description
A web scraper that scrapes a website for HTML elements and outputs it into the console. While also considering User-Agents to perform better on certain websites which may inhibit multiple scrapes.

## Requirements
 The module sohuld be able to scrape a URL and extract HTML elements, including p, h, li, ul, img, links, spans, tables, and metadata.

## Code example
```javascript
    // Import webscraper
    import WebScraper from 'webscraper'

    // Create new instance of the webscraper
    const scraper = new WebScraper()

    // Scrape a website while inserting User-Agent in the header
    async scrape(url, options = {}) {
    const headers = options.headers || {
        'User-Agent': this.getRandomUserAgent()
     }
    }
```

## Installation
To install the WebScraper module, run the following command:

```sh
npm install webscraper
```
## Dependencies
JSDOM
node-fetch

## Liscence 
MIT license

## Language
The project is written in Javascript(ES6+)

## Contributing
You are welcome to contribute to the WebScraper project. If you would like to contribute, please follow these steps:
1. Fork the Respository
2. Clone Your Fork
3. Create a Branch
4. Contribute 
5. Commit, Push and Pull

## Bug Reports / Issues
If you encounter any bugs or issues, please report them using the GitHub Issues feature. Provide as much detail as possible, including steps to reproduce the issue and any relevant screenshots or logs.

