import WebScraper from './scraper.js'
import readline from 'readline'
import fs from 'fs'

//const webScraper = new WebScraper()

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
        //const url = 'https://www.svt.se/nyheter/utrikes/experten-darfor-ar-konflikten-mellan-israel-och-hizbollah-att-klassa-som-ett-krig'
        try {
            const content = await this.webScraper.scrape(url)
            const format = {
                titles: content.titles || [],
                paragraphs: content.paragraphs || [],
                images: content.images || [],
                links: content.links || [],
                spans: content.spans || [],
                lists: content.lists || []
                /*      titles: this.webScraper.getTitles(content) || [],
                     paragraphs: this.webScraper.getParagraphs(content) || [],
                     images: this.webScraper.getImages(content) || [],
                     links: this.webScraper.getLinks(content) || [],
                     spans: this.webScraper.getSpans(content) || [],
                     lists: this.webScraper.getLists(content) || [] */
            }

            const scrapedData = JSON.stringify(format, null, 2)
            fs.writeFileSync('scrapedContent.json', scrapedData)
            console.log('Scraped data can be found in scrapedContent.json')
            //elements.forEach((div, index) => {
            //  console.log(`Div${index + 1}:`)
            /*    console.log('Titles:', content.titles)
               console.log('Paragraphs:', content.paragraphs)
               console.log('Images:', content.images)
               console.log('Links:', content.links)
               console.log('Spans:', content.spans)
               console.log('Lists:', content.lists) */

        } catch (error) {
            console.error(error)
        }
    }
}
export default StartWebScraper