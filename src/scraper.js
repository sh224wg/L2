const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

class Scraper {
    constructor() { }


    async scrape(url) {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Network response error')
            }
            const text = await response.text()
            const dom = new JSDOM(text)
            const document = dom.window.document
           
        }
    }

    getTitle() {

    }

    getText() {

    }
}