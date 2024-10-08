import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

/**
 * Class representing a web scraper.
 */
class WebScraper {
    constructor() {
        this.scrapedData = null
    }

    /**
     * Validate if a given URL is valid.
     * @param {string} url - The URL to validate.
     * @returns {boolean} True if the URL is valid, false otherwise.
     */
    isValid(url) {
        try {
            new URL(url)
            return true
        } catch (error) {
            return false
        }
    }

    /**
    * Get the scraped data.
    * @returns {Object} The scraped data.
    */
    getScrapedData() {
        return this.scrapedData;
    }

    /**
     * Scrape a URL for content.
     * @param {string} url - The URL to scrape.
     * @param {Object} [options={}] - Optional settings.
     * @param {Object} [options.headers] - Optional headers for the request.
     * @returns {Promise<Object>} The scraped content.
     * @throws {Error} If the network response is not ok or scraping fails.
     */
    async scrape(url, options = {}) {
        if(!this.isValid(url)) {
            throw new Error('Invalid Url')
        }
        const headers = options.headers || {
            'User-Agent': this.getRandomUserAgent()
        }
        const fetchOptions = { headers }

        try {
            const response = await fetch(url, fetchOptions)
            if (!response.ok) {
                throw new Error('Network response error')
            }
            const text = await response.text()
            const dom = new JSDOM(text)
            const document = dom.window.document

            this.scrapedData = {
                text: document.body.textContent ? document.body.textContent.trim() : '',
                metaData: this.getMetaData(document),
                titles: this.getTitles(document),
                paragraphs: this.getParagraphs(document),
                lists: this.getLists(document),
                images: this.getImages(document),
                links: this.getLinks(document),
                spans: this.getSpans(document),
                tables: this.getTables(document)
            }
            return this.scrapedData
        } catch (error) {
            console.log(`failed to scrape URL: ${url}`, error)
            throw new Error('Failed to scrape')
        }
    }

    /**
   * Get a random User-Agent string.
   * @returns {string} A random User-Agent string.
   */
    getRandomUserAgent() {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0'
        ]
        return userAgents[Math.floor(Math.random() * userAgents.length)]
    }

    /**
     * Extract metadata from the document.
     * @param {Document} document - The DOM document.
     * @returns {Object} The extracted metadata.
     */
    getMetaData(document) {
        const metadata = {
            title: document.querySelector('title') ? document.querySelector('title').textContent : '',
            description: '',
            keywords: ''
        }
        const descriptionMeta = document.querySelector('meta[name="description"]')
        if (descriptionMeta) {
            metadata.description = descriptionMeta.getAttribute('content')
        }
        const keywordsMeta = document.querySelector('meta[name="keyword"]')
        if (keywordsMeta) {
            metadata.keywords = keywordsMeta.getAttribute('content')
        }
        return metadata
    }

    /**
     * Extract titles from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Object>} The extracted titles.
     */
    getTitles(document) {
        const titles = []
        const uniqueTitles = new Set()
        const hElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
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

    /**
    * Extract paragraphs from the document.
    * @param {Document} document - The DOM document.
    * @returns {Array<Object>} The extracted paragraphs.
    */
    getParagraphs(document) {
        const paragraphs = []
        const uniqueParagraphs = new Set()
        const pElements = document.querySelectorAll('p')
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

    /**
     * Extract lists from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Object>} The extracted lists.
     */
    getLists(document) {
        const lists = []
        const uniqueList = new Set()
        const ulElements = document.querySelectorAll('ul')
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

    /**
     * Extract images from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Object>} The extracted images.
     */
    getImages(document) {
        const images = []
        const uniqueImages = new Set()
        const imageElements = document.querySelectorAll('img')
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

    /**
     * Extract links from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Object>} The extracted links.
     */
    getLinks(document) {
        const links = []
        const uniqueLinks = new Set()
        const aElements = document.querySelectorAll('a')

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

    /**
     * Extract spans from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<string>} The extracted spans.
     */
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

    /**
     * Extract tables from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Array<string>>} The extracted tables.
     */
    getTables(document) {
        const tables = []
        const uniqueTables = new Set()
        const tableElement = document.querySelectorAll('table')

        tableElement.forEach(table => {
            const rows = []
            const rowElements = table.querySelectorAll('tr')

            rowElements.forEach(row => {
                const cells = []
                const cellElements = row.querySelectorAll('td, th')
                cellElements.forEach(cell => {
                    cells.push(cell.textContent.trim())
                })
                rows.push(cells)
            })
            const tableHTML = table.outerHTML.trim()
            if (rows.length > 0 && !uniqueTables.has(tableHTML)) {
                uniqueTables.add(tableHTML)
                tables.push(rows)
            }
        })
        return tables
    }

    /**
     * Retry scraping a URL a specified number of times.
     * @param {string} url - The URL to scrape.
     * @param {number} [tries=3] - The number of retry attempts.
     * @returns {Promise<Object>} The scraped content.
     * @throws {Error} If all retry attempts fail.
     */
    async retryScrape(url, tries = 3) {
        for (let attempt = 1; attempt <= tries; attempt++) {
            try {
                console.log(`Attempt ${attempt} to scrape ${url}`)
                return await this.scrape(url)
            } catch (error) {
                if (attempt < tries) {
                    console.log(`Attempt ${attempt} failed. Trying again...`)
                } else {
                    console.log(`All ${tries} failed.`)
                    throw error
                }
            }
        }
    }

    /**
     * Scrape multiple pages starting from a URL.
     * @param {string} url - The starting URL.
     * @param {number} [maxPages=5] - The maximum number of pages to scrape.
     * @returns {Promise<Array<Object>>} The scraped content from all pages.
     */
    async scrapeNextPage(url, maxPages = 5) {
        let startUrl = url
        let content = []

        for (let i = 1; i <= maxPages; i++) {
            console.log(`Scraping page ${i}: ${startUrl}`)
            const pageContent = await this.scrape(startUrl)
            if (pageContent) {
                content.push(pageContent)

                const nextLink = this.#findNextPage(pageContent)
                if (nextLink) {
                    startUrl = nextLink
                } else {
                    break
                }
            } else {
                break
            }
        }
        return content
    }

    /**
     * Find the next page link or button in the content.
     * @param {Document} document - The Dom document.
     * @returns {string|null} The URL of the next page or null if not found.
     */
    #findNextPage(document) {
        let nextLink = document.links.find(link =>
            (link.text && (link.text.toLowerCase().includes('next') || link.text.includes('>'))) ||
            (link.title && link.title.toLowerCase() === 'nästa sida') ||
            (link.dataset && link.dataset.elid === 'pagination-next-page-button')
        )
        if (nextLink && nextLink.href) {
            return nextLink.href
        }
        const nextButton = content.buttons.find(button => button.dataset && button.dataset.elid === 'pagination-next-page-button')
        if (nextButton && nextButton.href) {
            return nextButton.href
        }
        return null
    }
}

export default WebScraper
