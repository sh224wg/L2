const Scraper = require('./scraper')

const scraper = new Scraper()

async function run() {
    const url = 'https://www.svt.se/nyheter/utrikes/experten-darfor-ar-konflikten-mellan-israel-och-hizbollah-att-klassa-som-ett-krig'
    try {
        const elements = await scraper.scrape(url)
        console.log('Elements: ', elements)
    } catch (error) {
        console.log(error)
    }
}
run()