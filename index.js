import WebScraper from './src/scraper.js'

const webScraper = new WebScraper()

// seperate into two functions one that runs and another that asks user for url?
async function run() {
    const url = 'https://www.svt.se/nyheter/utrikes/experten-darfor-ar-konflikten-mellan-israel-och-hizbollah-att-klassa-som-ett-krig'
    try {
        const elements = await webScraper.scrape(url)
        elements.forEach((div, index) => {
            console.log(`Div${index + 1}:`)
            console.log('Text:')
            console.log('Titles:')
            console.log('Paragraphs:')
            console.log('Lists:')
            console.log('Images:')
            console.log('Links:')
        })
        //console.log('Elements: ', elements)
    } catch (error) {
        console.error(error)
    }
}
run()