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
                texts: this.getParagraph(div),
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
    getParagraph(element) {
        const paragraphs = []
        const pElements = element.querySelectorAll('p')
        for (let i = 0; i < pElements.length; i++) {
            const p = pElements[i]
            if(p.textContent.trim()) {
                paragraphs.push({
                    tag: 'p',
                    text: p.textContent.trim()
                })
            }
            return paragraphs
        }
    }

    // check if there are lists li/ul on the page and add them 
    getLists(element) {
        const lists = []
        const ulElements = element.querySelectorAll('ul')
        ulElements.forEach(ul => {
            const items = []
            const liElements = ul.querySelectorAll('li')
            for(let i = 0; i <liElements.length; i++) {
                const li = liElements[i]
                if(li.textConent.trim()){
                    items.push(li.textContent.trim())
                }
                // check lengths of items larger than 0 and push ul
            }
        })

    }

    // check src alt title
    getImages(element) {
        // images in array

    }

    // check for hrefs
    getLinks(element) {

    }
}

export default WebScraper
