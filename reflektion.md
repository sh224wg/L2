# Reflektion

 Denna module följer en objekt orienterad design genom användingen av klasser och encapsulation. Vissa metoder är privata då funktionaliteten är intern och används inte utanför klassen. Alla metoder för att finna HTML element i Webscraper klassen är publika så man själv kan foksuera på det som är relevant. FindNextPage är privat då den bara används inom klassen av scrapeNextPage metoden. På detta sätt gömmer jag implementationen och koden blir enklare att underhålla. Jag använder mig av en getScrapedData metod för att encapsulera datan inom klassen och skapar då ett interface för att få tillgång till det.

## KodKvalite 

Innan denna uppgift trodde jag att min kodkvalite var relativt bra, men insåg genomgående att det fanns en del problem. Mina metodnamn skulle kunna vara tydligare. Men främst kom mitt problem med funktioner. 

Boken talar också om low och high levels of abstraction och inom denna uppgift har jag gjort mitt bästa att följa the stepdown rule, med funktioner som fungerar på en låg abstraktionsnivå som kan läsas som top down sets av to paragraphs med ett tydligt narrativ. Detta reflekteras i min webscraper klass där scrape metoden är först och kallar de andra följade funktionerna i tur och ordning i ett logiskt flöde. 

Vidare så är min kod rätt bloated. Jag använder sets i varje metod och for loopen. Mina funktioner är väldigt liknande då de letar efter olika element i en DOM struktur. Detta skulle jag gärna förbättre, men inser att i en scraper är det sannolikt att det blir repetivit.

Jag förstår att man vill unvika att använda flera argument men generellt verkar det som att det inte alltid är möjligt att följa alla dessa regler som boken föreslår, nilic argument, långa rader av kod för att ha korta funktioner, stepdown rule. I vissa fall måste det finnas avikelser vilket inte borde betyda att koden är dålig eller otydlig. Boken upphöjer tydlighet, genom tex function namn som indikerar om den frågar något, omvandlar ett argument, eller är ett event; och att man är konsekvent. Det är detta som man kan bära med sig och använda för att uppnå clean code, då det alltid kan finnas undantag till de andra reglerna.

## Reflection Names
I have created a table below with the most relevant name rules from clean code. Before i began reflecting and considering the rules I felt that i had adhered to the name rules relatively well. However, upon reflection it is clear that I too fall into some of the pitfalls of naming. 

While i was working and writing code there were some rules from the book that i remebered and implemented such as 'Use intention revealing names', which made me change text to paragraph to indicate functionality while making it as clear as possible that the function concerned the <p> tag and not just a String or block of text. However, i realised what i thought was intention revealing names, descriptive names, and searchable names, can also be argued to be misleading as i use get before the element i am scraping. This may give the impression of being a getter and mislead a programmer who is reading it. In regards to Meaningful Distinctions i am concerned that perhaps they are not distinct enough because they are just slightly alterned versions of each other. 
 
In findNextPage and ScrapeNextPage the only distinction is the first word which could easily lead to confusion. I could have made it more distinct with findNextPage and scrapeFollowingPages or scrapeFiveMore. The rule Pick One Word per Concept, highlight this problem the most as it states to avoid using different simliar words like 'get' for similiar actions or as in the above example find and scrape.

I think the chapter was very rewarding as i gained alot of insight into naming functions for the external programmer. Some rules i follow already such as dont pun and done use abbreviations or symbols. But i could make my names more distinguisable and descriptive in regards to functionality. My only concern is how do we know when it is too descriptive or too intention revealing, what is enough. I think prior some of the names are clear but after reading the chapter it is easy to doubt oneself.

### Name Table


| Name Rules       | Method Names         | Reasoning                                                                       |
|------------------|----------------------|---------------------------------------------------------------------------------|
|getMetaData       |Avoid Disinformation  |Name could confuser developers due to the use of the term get, implying its a| 
|(method that      |                      |getter. I didnt consider this first and the use of get might lead to confusion 
|scrapes a site for|                      |about functionality. But is does imply what information is being retreived.
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
|getTitle          |Use Searchable Name   |Methods with getTitle, getLink etc, are simple, easy to search. Get followed by  |
|(Method to get h  |                      |a HTML element, which makes it intuitive and descriptive and easy to find in the 
|elements)         |                      |codebase. A programmer could easily guess the following names of the functions.
|                  |                      |
|getList           |                      |All the getELEMENT methods focus on specific HTML & DOM elements underlining the | 
|(method to get ul |Use Problem Domain    |importanve of relevant terms within the relevant domain, in this case HTML li and|
|and li elements)  | Names                |ul elements reflecting the functionality and purpose of the function
|------------------|----------------------|---------------------------------------------------------------------------------|
| getUserAgents    |Method Names          | By using get, the method name becomes a verb however 'get' is a standard prefix |  
|(method to create |                      | for accessors and could lead to confusions. I would change it next time but it  |
|user Agents)      |                      | appeared logical at the time.
|                  |                      |
|                  |Pick One Word per     | I used the consistent term get throughout the codebase, however this was a  
|                  |Concept               | mistake as it has been discussed. But it does imply im accesing information. 
|------------------|----------------------|---------------------------------------------------------------------------------|
| The webscraper   |Add Meaningful        |The methods in the class are all grouped in relation to their function providing
|class             | Context              |a context to the class and its methods, to scrape. The get methods are grouped
|                  |                      |together, the next page methods are grouped together at the bottom. The user agent 
|                  |                      |method is first, to reflect the header sent in the request.                      |
|                  |                      |
|                  |Class Names           |Class names should be nouns which Webscraper is, indicating its intention & use. |
|------------------|----------------------|---------------------------------------------------------------------------------|


## Reflection Functions
Det finns vissa saker jag inte följer i boken som jag insåg att jag behövde bättra. Jag använder mig av en try catch block i scrape, vilket ska förvirra error processer med normala processer. Jag förstår poängen här och kan i framtiden använda mig av error funktioner istället för att använda try blocks. I detta fall, då det är en enkel modul är det acceptabelt men i framtiden är detta ett bra sätt att förtydliga kod och inte krångla funktioner.

Mina funktioner är ofta långa och inte som föreslås i boken korta. Enligt boken ska funktioner inte ens vara 20 rader långa vilken många utav mina är. Jag gör mitt bästa för att göra de korta men brukar fördela funktioner på flera rader, något som boken avslår, och uppmanar att man har en lång rad som kan vara tex en while sats, vilket skulle göra det svårare för mig att hitta eventuella fel och läsa koden. Den förslår kring blocks and indets, att men max har två indets i en funktion vilket jag i min getLinks funktion inte lyckas med. 

Jag använder mig också av nested funktions med if satser inom for satser vilken jag kan erkänna gör saker lite väl komplicerade, då man lätt skriver fel. Detta vill jag bättre och förstår motivering av att det gör det enklare att förstå funktionen. Enligt boken ska dessa sepereras ut från metoden och göras till en egen metod. Jag har separerat ut vissa delar av metoder för att göra individuella funktioner mindre och mer förståeliga, getRandomUserAgents brukade vara en del av scrape men är nu en egen metod. Men vissa av min metoder skulle kunna fördelas ut till mindre funktioner för att undvika nesting.

Allmänt har jag inset att mina största fallgropar är Dont Repeat Yourself, då jag ofta har långa funktioner med tomma rader och repeaterad kod eller kod som skulle kunna förenklas ner. Med denna uppgift har jag lyckats göra det till en litan nivå pga boken och dess insikter, isValid blev en egen helper funktion som används i scrape för att kontrollera URL. Vilket leder mig till mitt andra problem vilket är Abstraction/ Step Down rule, jag har ofta både hög och låg abstraktion i funktionerna och kunde istället skapa en funktion med hög abstraktion och flytta resten ut i helper funktioner vilket skulle lösa mina långa funktioner.  

Jag har skapat en tabell över funktioner nedan.

### Function Table

| Funciton Name    | Antal Rader  | Reflection                                                                      |
|------------------|--------------|---------------------------------------------------------------------------------|
|scrape            |34            | Function Length: The function is longer than it could be, alot of empty lines to|
|                  |              | seperate parts of the function which could be removed. this.scrapedData is messy| 
|                  |              | because it handles order and format. Could be a seperate function
|                  |              |
|                  |              |Error Handling: Could extract the try block and create a error handling function |
|                  |              |instead. Now the function is full of lots of different things and error function |
|                  |              |would reduce complexity and length
|                  |              |
|                  |              |Function Arguments: Function takes two arguments (dyadic) url and options, which |
|                  |              |isnt ideal as the book suggests zero or one*                                     |
|------------------|--------------|---------------------------------------------------------------------------------|
|getImages         |23            |Avoid Side effect: function only works with local variables (images, uniqueImag) |
|                  |              |which reduces side effects and simple.
|                  |              |
|                  |              |Function size: The function is longer than it should be, but core (alt, title    |
|                  |              | img) could be moved into a helper function, and by using forEach instead of for |
|                  |              | loops i could reduce the number of lines and make it more concise.              |
|------------------|--------------|---------------------------------------------------------------------------------|
|getTables         |24            |Single Responsiblity : there is alot of code because it looks at rows, cells, 
|                  |              | tables and i could seperate these into helper functions to make it simpler.
|                  |              |
|                  |              |Dont Repeat Yourself: The pattern for textContent.trim to trim content is used 
|                  |              |here and it scrape and getTables and it would be better to turn it into a 
|                  |              |seperate helper function to make it less crowded.
|------------------|--------------|---------------------------------------------------------------------------------|
|getList           |25            |One level of Abstraction: The function could seperate ul and li to seperate the
|                  |              |level of abstraction and follow the step down rule which keeps the code simple.
|                  |              | I dont do that but it would make it shorter/simpler                             |
|                  |              |
|                  |              |Function argument: The function is monadic which is perfered and the argument is | 
|                  |              |required in order to scrape the page of li and ul elements. 
|------------------|--------------|---------------------------------------------------------------------------------|
|scrapeNextPage    |21            | Abstraction: The function focuses on one level of abstraction without mixing the|
|                  |              | two making it easy to understand.                                               |
|                  |              |
|                  |              | Avoid Flag arguments: I dont use booleans instead i keep it concise and simple 
|                  |              | to avoid complexity. 
|                  |              |
|                  |              |Clear Intent: It does one thing, scraping the next 5 pages, making it logical    |   
|                  |              |and simple. One of the few longer functions were i have managed to reduce        |
|                  |              |unecessary complexity
|------------------|--------------|---------------------------------------------------------------------------------|