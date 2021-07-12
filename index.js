const puppeteer = require('puppeteer');

(async ()=> {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    await page.goto('http://www.amazon.com.mx');
    await page.screenshot({path:'amazon1.jpg'});

    await page.type('#twotabsearchtextbox','libros de JS');
    await page.screenshot({path:'amazon2.jpg'});

    await page.click('.nav-search-submit input');
    await page.waitForSelector('[data-component-type=s-search-result]');
    await page.screenshot({path:'amazon3.jpg'});
    await page.waitForTimeout(3000);

    const enlaces=await page.evaluate(()=>{
        const elements=document.querySelectorAll('[data-component-type=s-search-result] h2 a');
        const links=[];
        for(let element of elements){
            links.push(element.href);
        }
        return links;
    })
    console.log(enlaces.length);

    await browser.close();
})();
