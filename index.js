import Scraper from './src/scraper.js'

const scraper = new Scraper()

async function run() {
    const url = 'https://www.bettycrocker.com/recipes/homemade-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57'
    try {
        const elements = await scraper.scrape(url)
        console.log('Elements: ', elements)
    } catch (error) {
        console.error(error)
    }
}
run()