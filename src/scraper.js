import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

class WebScraper {
    constructor() { }

    async scrape(url, options = {}) {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0'
        ]
        const randomizeUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)]

        const headers = options.headers || {
            'User-Agent': randomizeUserAgent
        }
        const proxy = options.proxy || null
        const fetchOptions = { headers }
        if (proxy) {
            fetchOptions.agent = new HttpsProxyAgent(proxy)
        }

        try {
            const response = await fetch(url, fetchOptions)
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
            }
            return content
        } catch (error) {
            console.log(`failed to scrape the URL: ${url}`, error)
            throw new Error('Failed to scrape')
        }
    }

    getTitles(content) {
        const titles = []
        const uniqueTitles = new Set()
        const hElements = content.querySelectorAll('h1, h2, h3, h4, h5, h6')
        hElements.forEach(h => {
            const text = h.textContent.trim()
            if (text && !uniqueTitles.has(text)) {
                uniqueTitles.add(text)
                titles.push({
                    tag: h.tagName.toLowerCase(),
                    text: text
                })
            }
        })
        return titles
    }

    getParagraphs(content) {
        const paragraphs = []
        const uniqueParagraphs = new Set()
        const pElements = content.querySelectorAll('p')
        for (let i = 0; i < pElements.length; i++) {
            const p = pElements[i]
            const text = p.textContent.trim()
            if (text && !uniqueParagraphs.has(text)) {
                uniqueParagraphs.add(text)
                paragraphs.push({
                    tag: 'p',
                    text: text
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

            const overlap = src.split('/').slice(-1)[0].split('?')[0]
            const uniqueId = `${overlap}-${alt}-${title}`
            if (src && !uniqueImages.has(uniqueId)) {
                uniqueImages.add(uniqueId)
                const imageData = {
                    src: src,
                    alt: alt,
                    title: title
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
            if (href && !uniqueLinks.has(href)) {
                uniqueLinks.add(href)
                links.push({
                    href: href,
                    text: a.textContent ? a.textContent.trim() : ''
                })
            }
        })
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
        })
        return spans
    }

    async scrapeNextPage(url, maxPages = 5) {
        let startUrl = url
        let content = []

        for(//pages to scrape
            )
            // scrape
            // push
            // next button link
    }

    // handle scraping multiple pages

    // error handling

    // get Videos

    // scrape tables

    // meta data?

}

export default WebScraper
