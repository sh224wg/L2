import WebScraper from './src/scraper.js'
import readline from 'readline'
import fs from 'fs'

const webScraper = new WebScraper()

function askForUrl() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question('Please Enter URL to scrape: ', (url) => {
        if (isValid(url)) {
            rl.close()
            run(url)
        } else {
            console.log('Invalid URL, try again.')
            rl.close()
            askForUrl()
        }
    })
}

function isValid(url) {
    try {
        new URL(url)
        return true
    } catch(error) {
        return false
    }
}

// seperate into two functions one that runs and another that asks user for url?
async function run(url) {
    //const url = 'https://www.svt.se/nyheter/utrikes/experten-darfor-ar-konflikten-mellan-israel-och-hizbollah-att-klassa-som-ett-krig'
    try {
        const content = await webScraper.scrape(url)
        const format = {
            titles: content.titles || [],
            paragraphs: content.paragraphs || [],
            images: content.images || [],
            links: content.links || [],
            spans: content.spans || [],
            lists: content.lists || []
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

askForUrl()