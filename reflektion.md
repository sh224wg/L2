# Reflektion
### Skriv en kortare reflektion (halv sida 12pt) där du beskriver dina erfarenheter från din egen kodkvalitet. Använd begrepp från boken. 

Jag började med att etablera en Scraper class som kunde exporteras och började med att fokusera på p och h element för att testa om den grundläggande scrapan fungerade men också hur formatet skulle se ut när den skrevs ut i konsolen. Efter att ha arbetat med detta och scrapat en variation av sidor som recept sidor, svt, wikipedia, och bloggsidor har jag inset att detta inte är nog. Jag tänker lägga till mer element som scrapas som HTML element: p, h, div, and li/ul.
och CSS Element som kan ge mer information om det tex finns en bild på sidan : href, src, alt, och title. Senare ska dessa delas up i respektive div för bättre formatering. 

Jag försökte med att organisera det genom div:ar men insåg att med div blir det fler tomma divar i formatering och inte användarvänligt. Bättre om använderen har en lista med olika element. Introduktion av sets i varje function för att se till att information inte repeteras gjorde utdatan mer koncis. Detta skapade vissa problem med getImages då titlar och alt kan vara identiskt men src varierar minimalt, för att hantera detta använda jag split på src för att hitta de delar där src av två lika bilder överfaller. Jag utökade modulen mer med getUserAgent för att använda mig av user agents i headern som skickas med varje request för att se till att scrapan inte får avslag från en hemsida och begären verkar mer legitim. Jag använde mig bara av 3 och det valet av den som används randomiseras. Denna metod är privat då funktionaliteten är intern och används inte utanför klassen detta gör koden mer objectorienterad. Med samma anledning har jag gjort alla metoder för att finna HTML element i Webscraper klassen privata. FindNextPage är också privat då den bara används inom klassen av scrapeNextPage. På detta sätt gömmer jag implementationen och koden blir enklare att underhålla.

## KodKvalite 

Innan denna uppgift trodde jag att min kodkvalite var relativt bra, men insåg genomgående att det fanns en del problem. Mina metodnamn skulle kunna vara tydligare. Men främst kom mitt problem med funktioner. 

Mina funktioner är ofta långa och inte som föreslås i boken korta. Enligt boken ska funktioner inte ens vara 20 rader långa vilken mång utav mina är. Jag gör mitt bästa för att göra de korta men brukar fördela funktioner på flera rader, något som boken avslår, och uppmanar att man har en lång rad som kan vara tex en while sats, vilket skulle göra det svårare för mig att hitta eventuella fel. Den förslår kring blocks and indets, att men max har två indets i en funktion vilket jag i min getLinks funktion inte lyckas med. Men för mig är det enklare att indentera och använda flera rader för att det gör det enklare att läsa koden, se fel och ändra på saker. Möjligen med mer erfarenhet kan jag uppnå det boken förslår.

Jag använder mig också av nested funktions med if satser inom for satser vilken jag kan erkänna gör saker lite väl komplicerade, då man lätt skriver fel. Detta vill jag bättre och förstår motivering av att det gör det enklare att förstå funktionen. Vidare använder jag mig ofta av if satser inom for loopar eller if satser inom if satser vilket enligt boken helst ska sepereras ut från metoden och göras till en egen metod. Jag har separerat ut vissa delar av metoder för att göra individuella funktioner mindre och mer förståeliga, getRandomUserAgents brukade vara en del av scrape men är nu en egen metod. Men vissa av min metoder skulle kunna fördelas ut till mindre funktioner för att undvika nesting.

Boken talar också om low och high levels of abstraction och inom denna uppgift har jag gjort mitt bästa att följa the stepdown rule, med funktioner som fungerar på en låg abstraktionsnivå som kan läsas som top down sets av to paragraphs med ett tydligt narrativ. Detta reflekteras i min webscraper klass där scrape metoden är först och kallar de andra följade funktionerna i tur och ordning i ett logiskt flöde. 





## Reflection Names

## Läs kapitel 2 i Clean Code. Skapa en tabell över fem namn på identifierare (ex. namn på klasser, metoder/funktioner och variabler)Utgå ifrån kapitel 2s titlar och ange de viktigaste “reglerna” som applicerats eller skulle kunna appliceras på just ditt namn. Försök variera vilka regler du analyserar mellan namnen så att inte alla har samma regel-titlar applicerade. Visa upp att ni förstår flera regler och inte bara ett par. 

# Ange även en kort reflektion kring innehållet i kapitel 2. Ni kanske upptäcker en brist hos er tidigare namngivning, ni kanske inte håller med någon av “reglerna” från kursboken. Jag ser hellre att ni hittar och reflekterar över era brister än att ni döljer dem.

I have created a table below with the most relevant name rules from clean code. Before i began reflecting and considering the rules I felt that i had adhered to the name rules relatively well. However, upon reflection it is clear that I too fall into some of the pitfalls of naming. 

While i was working and writing code there were some rules from the book that i remebered and implemented such as 'Use intention revealing names', which made me change text to paragraph to indicate functionality while making it as clear as possible that the function concerned the <p> tag and not just a String or block of text. 

Problem Domain
The getList method focuses on scraping and processing HTML list elements, specifically <ul> and <li>. Using these domain-specific terms ensures clarity and aligns with the function's purpose of handling HTML lists in a web scraping context.


| Name Rules       | Method Names         | Reasoning                                                                       |
|------------------|----------------------|---------------------------------------------------------------------------------|
|getMetaData       |Avoid Disinformation  |Name could confuser other developers because of the use of the term get, implying| 
|(method that      |                      |its a getter. I did not consider this at first and the use of get for most 
|scrapes a site for|                      |of the methods might lead to confusion about functionality.
| the metadata)    |                      |
|                  |Avoid Mental Mapping  |The names of most of the methods are getMETHOD which i thought was clear and 
|                  |                      |concise indicating purpose(get the data/content). The name describes the purpose | 
|                  |                      |and writes out the tag and information without excpeting the programming to      |
|                  |                      |understand abbreviations or in depth knowledge.                                  |
|------------------|----------------------|---------------------------------------------------------------------------------|
|findNextPage      | Use Intention-       |The name is clear and indicates the intention of the function, to find the next  |
|(method to find   | Revealing Names      |page, might be unclear how, could be findLinkToNextPage, but it long and         |
|link to next page)|                      |complicated. But it does imply the purpose of the function clearly.              |
|                  |                      |          
|ScrapeNextPage    | Dont be Cute         |The name is straighforward, scrape the next page, which accuretly describe the 
|(method to scrape |                      |functionlity of the function. References back to the main scrape function.       |
|next 5 pages)     |                      |Both of these functions have simliar names but my intention with the use of find
|                  |                      |and scrape was to distinguish between their functionality.
|------------------|----------------------|---------------------------------------------------------------------------------|
|getTitle          |Use Searchable Name   |Methods with getTitle, getLink etc, are simple, easy to search. Its Get followed by
|(Method to get h  |                      |a HTML element, which makes it intuitive and descriptive and easy to find in the 
|elements)         |                      |codebase. A programmer could easily guess the following names of the functions.
|                  |                      |
|getList           |                      |All the getELEMENT methods focus on specific HTML and DOM elements underlining the 
|(method to get ul |Use Problem Domain    |importanve of relevant terms within the relevant domain, in this case HTML li and ul
|and li elements)  | Names                |elements reflecting the functionality and purpose of the function
|------------------|----------------------|---------------------------------------------------------------------------------|
| getUserAgents    |Method Names            Method names should be verbs or verb phrases. Use standard prefixes for accessors 
|                                           and mutators (e.g., get, set, is).
|
|                   Pick One Word per       Use a consistent term for a particular concept across your codebase. Avoid using 
|                   |Concept                 different words like "fetch," "retrieve," and "get" for similar actions, as this 
|                                           can create confusion. 
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

