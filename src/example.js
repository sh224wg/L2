import WebScraper from './scraper.js'
import readline from 'readline'
import fs from 'fs'

class StartWebScraper {

    constructor() {
        this.webScraper = new WebScraper()
    }

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