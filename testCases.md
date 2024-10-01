# Test Rapport

because its a node applikation i cannot use a console or ui to test this and therefore i am creating a test application to run tests

## Bug Reports / Issues

| Issue ID | Description                                      | Status   | Comments                        |
|----------|--------------------------------------------------|----------|---------------------------------|
| 1        | Invalid URL handling throws incorrect error      | Resolved | Fixed                           |
| 2        | Duplicate images not correctly identified        | Resolved | Fixed                           |
| 3        | User-Agent header not set randomly               | Resolved | Fixed                           |
| 4        | Prompt function does not handle empty input      | Resolved | Fixed                           |
| 5        | Next page function should scrape multiple pages  | Open     | Variation in next page id       |


|------------------|-----------------|-----------------|
| Metodnamn        | Testmetod       | Testresultat    |
|------------------|-----------------|-----------------|
| isValid          | Unit Test       | Pass            |
| scrapeUrl        | Unit Test       | Pass            |
| getParagraphs    | Unit Test       | Pass            |
| getImages        | Unit Test       | Pass            |
| getTitles        | Unit Test       | Pass            |
| askForUrl        | Unit Test       | Pass            |
|------------------|-----------------|-----------------|

## Testresultat
|-----------------|-----------------|-----------------|
|Metodnamn        | Testmetod       | Testresultat    |
|-----------------|-----------------|-----------------|
| URL Validation  |Test with valid  | Pass            |
| (isValid)       |and invalid URLs.|                 |
|-----------------|-----------------|-----------------|
|Scraping         |Test with URL    | Pass            |
|Functionality    | & checked the   |                 | 
|(scrape)         |scraping result. |                 |
|-----------------|-----------------|-----------------|
|Handle Duplicate |Test with URL    |Pass             |
|Information      | and checked the |                 |
|Using Sets in    | scraping result.|                 | 
|each function    |                 |                 |
|-----------------|-----------------|-----------------|
|HandleDuplicate  |Test with mock   | Pass            |
|Images(getImages)|HTML containing  |                 |
|                 |images with      |                 |
|                 | similar src     |                 |
|-----------------|-----------------|-----------------|
|User-Agent Header|Test if random   | Pass            |
|(part of scrape) |User-Agent header|                 |
|                 |works in scrape  |                 |
|-----------------|-----------------|-----------------|
|Custom Headers   |Test if headers  | Pass            |
|(part of scrape) | are used during |                 |
|                 | scraping        |                 |
|-----------------|-----------------|-----------------|
|Retry Mechanism  |Test retry logic | Pass            |
|(retryScrape)    |with failes and  |                 |
|                 |retries          |                 |
|-----------------|-----------------|-----------------|
|Prompt Function  |Test with 
|(askForUrl)
|-----------------|-----------------|-----------------|

test 1 
Setup URL and Mock Response

test 2 
should use provided headers

test 2
- some information is repeated as simliar p or h elemnts, use sets to solve this 

test 3
- images are repeated because src differ slightly while titels and alt do not, slice to use inital base of src to reduce duplicates

test 4
- ensure url is valid 

test 5
- allow user to enter url, if not a url it crashes, use if else in askforurl function to ensure it doesnt crash

