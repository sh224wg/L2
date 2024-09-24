import fetch from 'node-fetch'
import { JSDOM } from'jsdom'

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
            const elements = []
            // p and h elements
            const pElements = document.querySelectorAll('p')
            const hElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
            // add p elements to output
            for (let i = 0; i < pElements.length; i++) {
                elements.push({
                    tag:'p',
                    text: pElements[i].textContent.trim()
                })
            }
            for (let i = 0; i < hElements.length; i++) {
                elements.push({
                    tag: hElements[i].tagName.toLowerCase(),
                    text: hElements[i].textContent.trim()
                })
            }
            return elements
        } catch (error) {
            console.log(`failed to scrape the URL: ${url}`, error)
            throw new Error('Failed to scrape')
        }
    }

    getTitle() {

    }

    getText() {

    }

    // check if there are lists on the page and add them 
    getLists() {

    }
    
}
export default Scraper
