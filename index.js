const puppeteer = require('puppeteer');

(async ()=> {
    const browser = await puppeteer.launch({headless:true}); //Si es false, el navegador no se muestra
    const page = await browser.newPage();

    await page.goto('http://www.gandhi.com.mx');
    await page.screenshot({path:'gandhi1.jpg'});

    await page.type('#search','libros de JavaScript');
    await page.screenshot({path:'gandhi2.jpg'});

    await page.click('#start-search');
    await page.waitForSelector('div.category-products.category-view');
    await page.screenshot({path:'gandhi3.jpg'});
    await page.waitForTimeout(3000);

    const enlaces=await page.evaluate(()=>{
        const elements=document.querySelectorAll('h2.product-name a');
        const links=[];
        for(let element of elements){
            links.push(element.href);
        }
        return links;
    })
    console.log("Cantidad de enlaces encontrados: ", enlaces.length);

    const books= [];
    for(let enlace of enlaces){
        await page.goto(enlace);
        //await page.waitForTimeout(1000);
        await page.waitForSelector('div.name-text h1');

        const book = await page.evaluate(()=>{
            const tmp={};
            tmp.title=document.querySelector('div.name-text h1').innerText;
            tmp.author=document.querySelector('h2.special-label a').innerText;

            return tmp;
        });
        books.push(book);
    }
    console.log(books);

    await browser.close();
})();
