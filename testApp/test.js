import WebScraper from "../src/scraper"
import StartWebScraper from "../src/start"

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scraper')
    const input = document.getElementById('enterUrl')
    const resultsDiv = document.getElementById('results')
    const startWebScraper = new startWebScraper()

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const url = input.value
        if (isValidUrl(url)) {
            const data = await StartWebScraper.run(url)
            displayResult(data)
        } else {
            alert('Invalid URL. Please enter a valid URL.')
        }
    })
})
