import WebScraper from './scraper.js'
import readline from 'readline'
import fs from 'fs'

/**
 * Class representing the start of the web scraper application.
 */
class StartWebScraper {

    constructor() {
        this.webScraper = new WebScraper()
    }

    /**
     * Prompt the user to enter a URL to scrape.
     */
    askForUrl() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question('Please Enter URL to scrape: ', (url) => {
            if (url) {
                rl.close()
                this.run(url)
            } else {
                console.log('Invalid URL, try again.')
                rl.close()
                this.askForUrl()
            }
        })
    }

    /**
     * Run the web scraper with the provided URL.
     * @param {string} url - The URL to scrape.
     */
    async run(url) {
        try {
            await this.webScraper.scrapeWebPage(url)
            const content = this.webScraper.getScrapedData()
            const format = {
                metaData: content.metaData || [],
                titles: content.titles || [],
                paragraphs: content.paragraphs || [],
                images: content.images || [],
                links: content.links || [],
                spans: content.spans || [],
                lists: content.lists || [],
                tables: content.tables || []
            }

            const scrapedData = JSON.stringify(format, null, 2)
            fs.writeFileSync('scrapedContent.json', scrapedData)
            console.log('Scraped data can be found in scrapedContent.json')

        } catch (error) {
            console.error(error)
        }
    }
}
export default StartWebScraper