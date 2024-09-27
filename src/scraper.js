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

            const content = {
                text: document.body.textContent ? document.body.textContent.trim() : '',
                titles: this.getTitles(document.body),
                paragraphs: this.getParagraphs(document.body),
                lists: this.getLists(document.body),
                images: this.getImages(document.body),
                links: this.getLinks(document.body)
            }

          //  const elements = this.getDivs(document)
            return content
        } catch (error) {
            console.log(`failed to scrape the URL: ${url}`, error)
            throw new Error('Failed to scrape')
        }
    }


    // organises the information for later use in the console.
  /*   getDivs(document) {
        const divs = []
        const divElements = document.querySelectorAll('div')
        divElements.forEach(div => {
            const divContent = {
                tag: 'div',
                text: div.textContent ? div.textContent.trim() : '',
                titles: this.getTitles(div),
                paragraphs: this.getParagraphs(div),
                lists: this.getLists(div),
                images: this.getImages(div),
                links: this.getLinks(div)
            }

            /*  // remove empty arrays
             for (const field in divContent) {
                if ((Array.isArray(divContent[field]) && divContent[field].length === 0) || divContent[field] === '' || divContent[field] === undefined) {
                    delete divContent[field]
                }/*  else if (divContent[field] === undefined) {
                    delete divContent[field]
                } 
            } 
                divs.push(divContent)
            
        })
        return divs
    } */


    // h elements
    getTitles(document) {
        const titles = []
        const hElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        hElements.forEach(h => {
            if (h.textContent && h.textContent.trim()) {
                titles.push({
                    tag: h.tagName.toLowerCase(),
                    text: h.textContent.trim()
                })
            }
        })

        return titles
    }

    // p elements
    getParagraphs(document) {
        const paragraphs = []
        const pElements = document.querySelectorAll('p')
        for (let i = 0; i < pElements.length; i++) {
            const p = pElements[i]
            if(p.textContent && p.textContent.trim()) {
                paragraphs.push({
                    tag: 'p',
                    text: p.textContent.trim()
                })
            }
        }

        return paragraphs
    }

    // check if there are lists li/ul on the page and add them 
    getLists(document) {
        const lists = []
        const ulElements = document.querySelectorAll('ul')
        ulElements.forEach(ul => {
            const items = []
            const liElements = ul.querySelectorAll('li')
            for(let i = 0; i <liElements.length; i++) {
                const li = liElements[i]
                if(li.textContent && li.textContent.trim()) {
                    items.push(li.textContent.trim())
                }
                if(items.length > 0) {
                    lists.push({
                        tag: 'ul',
                        items: items
                    })
                }
            }
        })
        return lists
    }

    // check src alt title
    getImages(document) {
        const images = []
        const imageElements = document.querySelectorAll('img')
        for(let i = 0; i < imageElements.length; i++) {
            const img = imageElements[i]
            const src = img.getAttribute('src')
            if(src) {
                const imageData = {
                    src: src,
                    alt: img.getAttribute('alt') || '',
                    title: img.getAttribute('title') || ''
                }
                images.push(imageData)
            }
        }
        return images
    }

    // check for hrefs
    getLinks(document) {
        const links = []
        const aElements = document.querySelectorAll('a')
        for(let i = 0; i < aElements.length; i++) {
            const a = aElements[i]
            const href = a.getAttribute('href')
            if(href){
                links.push({
                    href: href,
                    text: a.textContent ? a.textContent.trim() : ''
                })
            }
        }
        return links
    }
}

export default WebScraper
