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
            if (this.isValid(url)) {
                rl.close()
                this.run(url)
            } else {
                console.log('Invalid URL, try again.')
                rl.close()
                this.askForUrl()
            }
        })
    }

    isValid(url) {
        try {
            new URL(url)
            return true
        } catch (error) {
            return false
        }
    }

    async run(url) {
        try {
            const content = await this.webScraper.scrape(url)
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