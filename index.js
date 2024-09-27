import WebScraper from './src/scraper.js'

const webScraper = new WebScraper()

// seperate into two functions one that runs and another that asks user for url?
async function run() {
    const url = 'https://www.svt.se/nyheter/utrikes/experten-darfor-ar-konflikten-mellan-israel-och-hizbollah-att-klassa-som-ett-krig'
    try {
        const content = await webScraper.scrape(url)
        //elements.forEach((div, index) => {
          //  console.log(`Div${index + 1}:`)
            console.log('Titles:', content.titles)
            console.log('Paragraphs:', content.paragraphs)
            console.log('Images:', content.images)
            console.log('Links:', content.links)
            console.log('Spans:', content.spans)
            console.log('Lists:', content.lists)

    } catch (error) {
        console.error(error)
    }
}
run()