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
                titles: this.getTitles(document),
                paragraphs: this.getParagraphs(document),
                lists: this.getLists(document),
                images: this.getImages(document),
                links: this.getLinks(document),
                spans: this.getSpans(document)
            };
            return content
        } catch (error) {
            console.log(`failed to scrape the URL: ${url}`, error)
            throw new Error('Failed to scrape')
        }
    }

    getTitles(content) {
        const titles = []
        const hElements = content.querySelectorAll('h1, h2, h3, h4, h5, h6')
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

    getParagraphs(content) {
        const paragraphs = []
        const pElements = content.querySelectorAll('p')
        for (let i = 0; i < pElements.length; i++) {
            const p = pElements[i]
            if (p.textContent && p.textContent.trim()) {
                paragraphs.push({
                    tag: 'p',
                    text: p.textContent.trim()
                })
            }
        }

        return paragraphs
    }

    getLists(content) {
        const lists = []
        const uniqueList = new Set()
        const ulElements = content.querySelectorAll('ul')
        ulElements.forEach(ul => {
            const items = []
            const liElements = ul.querySelectorAll('li')

            liElements.forEach(li => {
                if (li.textContent && li.textContent.trim()) {
                    items.push(li.textContent.trim())
                }
            })
            if (items.length > 0) {
                const itemString = JSON.stringify(items)
                if (!uniqueList.has(itemString)) {
                    uniqueList.add(itemString)
                }
                lists.push({
                    tag: 'ul',
                    items: items
                })
            }
            /*    for(let i = 0; i <liElements.length; i++) {
                   const li = liElements[i]
                   if(li.textContent && li.textContent.trim()) {
                       items.push(li.textContent.trim())
                   }
                  
               } */
        })
        return lists
    }

    getImages(content) {
        const images = []
        const uniqueImages = new Set()
        const imageElements = content.querySelectorAll('img')
        for (let i = 0; i < imageElements.length; i++) {
            const img = imageElements[i]
            const src = img.getAttribute('src')
            const alt = img.getAttribute('alt') || ''
            const title = img.getAttribute('title') || ''
            
            const uniqueId = `${src}-${alt}-${title}`
            if (src && !uniqueImages.has(uniqueId)) {
                uniqueImages.add(uniqueId)
                const imageData = {
                    src: src,
                    alt: alt /*img.getAttribute('alt') || ''*/,
                    title: title /*img.getAttribute('title') || ''*/
                }
                images.push(imageData)
            }
        }
        return images
    }

    getLinks(content) {
        const links = []
        const uniqueLinks = new Set()
        const aElements = content.querySelectorAll('a')

        aElements.forEach(a => {
            const href = a.getAttribute('href')
            if(href && !uniqueLinks.has(href)) {
                uniqueLinks.add(href)
                links.push({
                    href: href,
                    text: a.textContent ? a.textContent.trim() : ''
                })
            }
        })
    /*     for (let i = 0; i < aElements.length; i++) {
            const a = aElements[i]
            const href = a.getAttribute('href')
            if (href) {
                links.push({
                    href: href,
                    text: a.textContent ? a.textContent.trim() : ''
                })
            }
        } */
        return links
    }

    getSpans(document) {
        const spans = []
        const uniqueSpans = new Set()
        const spanElements = document.querySelectorAll('span')
        spanElements.forEach(span => {
            const text = span.textContent.trim()
            if (text && !uniqueSpans.has(text)) {
                uniqueSpans.add(text)
                spans.push(text)
            }
            //spans.push(span.textContent.trim())
        })
        return spans
    }
}

export default WebScraper
