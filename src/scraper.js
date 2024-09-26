import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

class WebScraper {
    constructor() { }

// use of try catch acceptable because its inherent to the function?
    async scrape(url) {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Network response error')
            }
            const text = await response.text()
            const dom = new JSDOM(text)
            const document = dom.window.document

            const elements = this.getDivs(document)
            return elements
        } catch (error) {
            console.log(`failed to scrape the URL: ${url}`, error)
            throw new Error('Failed to scrape')
        }
    }


    // organises the information for later use in the console.
    getDivs(document) {
        const divs = []
        const divElements = document.querySelectorAll('div')
        divElements.forEach(div => {
            const divContent = {
                tag: 'div',
                text: div.textContent.trim(),
                titles: this.getTitle(div),
                texts: this.getText(div),
                lists: this.getLists(div),
                images: this.getImages(div),
                links: this.getLinks(div)
            }
            divs.push(divContent)
        })
        return divs
    }


    // h elements
    getTitle(element) {
        const titles = []
        const hElements = element.querySelectorAll('h1, h2, h3, h4, h5, h6')
        hElements.forEach(h => {
            if(h.textContent.trim()) {
                titles.push({
                    tag: h.tagName.toLowerCase(),
                    text: h.textContent.trim()
                })
            }
        })
        return titles
    }

    // p elements
    getText() {
        // add p elements to output
        for (let i = 0; i < pElements.length; i++) {
            elements.push({
                tag: 'p',
                text: pElements[i].textContent.trim()
            })

        }
    }

    // check if there are lists li/ul on the page and add them 
    getLists() {

    }

    // check src alt title
    getImages() {

    }

    // check for hrefs
    getLinks() {

    }
}

export default WebScraper
