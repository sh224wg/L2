# Reflektion TÄNK PÅ K2 NAMN K3 FUNKTIONER
### Skriv en kortare reflektion (halv sida 12pt) där du beskriver dina erfarenheter från din egen kodkvalitet. Använd begrepp från boken. 

Jag började med att skapa en grunläggande struktur på mappen. Jag skapade gitignore, README, package.json, en mapp för test, och en src map för min kod. Jag gjorde detta först för att förstå mig på storleken på uppgiften men främst för att etablera vad jag behövde så att allt skulle vara tillgängligt när jag skulle behöva det. Sedan satt jag ner och skrev pseudokod för att ge mig själv en ide kring hur scrapan skulle fungera. En separat fil för scrapan och sedan en index fil för att köra programmet.

Jag började sedan med att etablera en Scraper class som kunde exporteras och började med att fokusera på p och h element för att testa om den grundläggande scrapan fungerade men också hur formatet skulle se ut när den skrevs ut i konsolen. Efter att ha arbetat med detta och scrapat en variation av sidor som recept sidor, svt, wikipedia, och bloggsidor har jag inset att detta inte är nog. Jag tänker lägga till mer element som scrapas som HTML element: p, h, div, and li/ul.
och CSS Element som kan ge mer information om det tex finns en bild på sidan : href, src, alt, och title. Senare ska dessa delas up i respektive div för bättre formatering. 

ref 4

Bättre att inte orgnaisera i div då det blir fler tomma divar i formatering och inte användarvänligt. bättre om använderen har en lista med olika element 

introduktion av sets i varje för att se till att information inte repeteras
difficult in image as titles alt alt may overlap while src differ slightly even though images are the same, split src to find commonality in url with identical alt and title. 

repeated use of set uncertain for each function but inlikley to great function for it due to unique use of seat with each element

reflection 5

seperated user agents into own function to contribute to modularity


# KodKvalite 

## Reflection Names

## Läs kapitel 2 i Clean Code. Skapa en tabell över fem namn på identifierare (ex. namn på klasser, metoder/funktioner och variabler)Utgå ifrån kapitel 2s titlar och ange de viktigaste “reglerna” som applicerats eller skulle kunna appliceras på just ditt namn. Försök variera vilka regler du analyserar mellan namnen så att inte alla har samma regel-titlar applicerade. Visa upp att ni förstår flera regler och inte bara ett par. 

# Ange även en kort reflektion kring innehållet i kapitel 2. Ni kanske upptäcker en brist hos er tidigare namngivning, ni kanske inte håller med någon av “reglerna” från kursboken. Jag ser hellre att ni hittar och reflekterar över era brister än att ni döljer dem.

I have created a table below with the most relevant name rules from clean code. Before i began reflecting and considering the rules I felt that i had adhered to the name rules relatively well. However, upon reflection it is clear that I too fall into some of the pitfalls of naming. 

While i was working and writing code there were some rules from the book that i remebered and implemented such as 'Use intention revealing names', which made me change text to paragraph to indicate functionality while making it as clear as possible that the function concerned the <p> tag and not just a String or block of text. 

Problem Domain
The getList method focuses on scraping and processing HTML list elements, specifically <ul> and <li>. Using these domain-specific terms ensures clarity and aligns with the function's purpose of handling HTML lists in a web scraping context.


| Name Rules       | Method Names         | Reasoning                                                                       |
|------------------|-----------------     |---------------------------------------------------------------------------------|
|getMetaData       |Avoid Disinformation  |Name could confuser other developers because of the use of the term get, implying| 
 (method that      |                      |its a getter. I did not consider this at first and the use of get for most 
|scrapes a site for|                      |of the methods might lead to confusion about functionality.
 the metadata)     |                      |
                   |Avoid Mental Mapping  |The names of most of the methods are getMETHOD which i thought was clear and 
                   |                      |concise indicating purpose(get the data/content). The name describes the purpose| 
                   |                      |and writes out the tag and information without excpeting the programming to 
                   |                      |understand abbreviations or in depth knowledge. 
|------------------|----------------------|---------------------------------------------------------------------------------|
|findNextPage        Use Intention-         The name is clear and indicates the purpose of the function, to get metadata. 
                    Revealing Names         Could be mistaken as a getter, could be better to use term that isnt  
|ScrapeNextPage                            
                     Dont be Cute           Avoid using clever or humorous names in your code, Instead, choose clear, 
                                            straightforward names that accurately describe the function or variable. 
|------------------|-----------------     |-----------------        |
|getTitle          |Use Searchable Name   |Methods with getTitle, getLink etc, are simple easy to search.
|                  |                      | descriptive names that are easy to locate across a codebase. 
 getList            Use Problem Domain 
                    Names                   getList method focuses on speicifc HTML and DOm elements, emphasising the 
                                            importance of relevant terms such as li and ul in accordance with the funciton of the method                     
|------------------|----------------------|-----------------|
| getUserAgents    |Method Names             Method names should be verbs or verb phrases. Use standard prefixes for accessors 
                                            and mutators (e.g., get, set, is).

                    Pick One Word per       Use a consistent term for a particular concept across your codebase. Avoid using 
                    |Concept                 different words like "fetch," "retrieve," and "get" for similar actions, as this 
                                            can create confusion. 
|------------------|-----------------     |-----------------|
| The webscraper   |Add Meaningful         the methods in the class are all grouped in relation to their funciton 
|class             | Context               providing. context to the class and its methods.  all the get methods are grouped
                                            together, the next page methods are grouped togethter at the bottom. 
                                            The user agent method is first, to reflect the header that is sent in the request
                   |Class Names
                                          |should be nouns or noun phrases, it is a Webscraper, to the point
|------------------|-----------------     |-----------------|

 
 Meaningful Distinctions
 Unfortunelay something i suffer from
 Names should be distinct and meaningful, not just slightly altered versions of each other 

 also suffering from 
 Pick One Word per Concept + Don’t Pun
Avoid using different words like "fetch," "retrieve," and "get" for similar actions, as this can create confusion. 

Use Problem Domain Names 
 instead of using generic names like dom, h, or p, use more descriptive names like document, header, or paragraph. Making it clear what each variable or function is supposed to represent or do. I do a little of both

## Reflection Functions

I worked on applying clean code as I worked on each function. For example in the scrape function in the WebScraper Class I considered the isolation of error handling when using try and catch blocks. In the book it states that instead of try catch blocks a seperate error function should be used. , as i placed the try keyword at the start of the function and ending the function with the catch block, ensuring that there is no functionality beyond the block i have isolated the functionality of the function to the error which i felt would be acceptable this time due to the lack of complexity of the function.(78 cc) Thereby focusing on the error handling of the function and improving readiblity and maintainablity while adhering to its primary function.

Struggling with function length, book states it should be up to 3 lines but mine are 10 t0 15.

in index for the run function the repetition of console.log is repeated for 9 lines in order to cover the seperate sections for the scraping. This is too long than is wanted in clean code. 

in divs to remove empty arrays added for loop which causes the empty arrays that are strings to become undefined and developed the for loop to include undefined. 
considering clean code, instead of adding more lines, used && to make the line longer and the function shorter

| Column 1 Header | Column 2 Header | Column 3 Header |
|-----------------|-----------------|-----------------|
| Row 1, Col 1    | Row 1, Col 2    | Row 1, Col 3    |
|-----------------|-----------------|-----------------|
| Row 2, Col 1    | Row 2, Col 2    | Row 2, Col 3    |
|-----------------|-----------------|-----------------|
| Row 2, Col 1    | Row 2, Col 2    | Row 2, Col 3    |
|-----------------|-----------------|-----------------|
| Row 2, Col 1    | Row 2, Col 2    | Row 2, Col 3    |
|-----------------|-----------------|-----------------|
| Row 2, Col 1    | Row 2, Col 2    | Row 2, Col 3    |
|-----------------|-----------------|-----------------|

