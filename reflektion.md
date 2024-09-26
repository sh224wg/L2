# Reflektion TÄNK PÅ K2 NAMN K3 FUNKTIONER

Jag började med att skapa en grunläggande struktur på mappen. Jag skapade gitignore, README, package.json, en mapp för test, och en src map för min kod. Jag gjorde detta först för att förstå mig på storleken på uppgiften men främst för att etablera vad jag behövde så att allt skulle vara tillgängligt när jag skulle behöva det. Sedan satt jag ner och skrev pseudokod för att ge mig själv en ide kring hur scrapan skulle fungera. En separat fil för scrapan och sedan en index fil för att köra programmet.

Jag började sedan med att etablera en Scraper class som kunde exporteras och började med att fokusera på p och h element för att testa om den grundläggande scrapan fungerade men också hur formatet skulle se ut när den skrevs ut i konsolen. Efter att ha arbetat med detta och scrapat en variation av sidor som recept sidor, svt, wikipedia, och bloggsidor har jag inset att detta inte är nog. Jag tänker lägga till mer element som scrapas som HTML element: p, h, div, and li/ul.
och CSS Element som kan ge mer information om det tex finns en bild på sidan : href, src, alt, och title. Senare ska dessa delas up i respektive div för bättre formatering. 

Reflection 2

I worked on applying clean code as i worked on each function. For example in the scrape function in the WebScraper Class I considered the isolation of error handling when using try and catch blocks. In the book it states that instead of try catch blocks a seperate error function should be used. However, as i placed the try keyword at the start of the function and ending the function with the catch block, ensuring that there is no functionality beyond the block i have isolated the functionality of the function to the error which i felt would be acceptable this time due to the lack of complexity of the function.(78 cc) Thereby focusing on the error handling of the function and improving readiblity and maintainablity while adhering to its primary function.

Another focus i had was names. clean code names, changed text to paragraph to highlight book and indicate funcitonality to make it as clear as possible what each function is doing. 

reflection 3

Struggling with function length, book states it should be up to 3 lines but mine are 10 t0 15.

reflection 4

reflection 5

