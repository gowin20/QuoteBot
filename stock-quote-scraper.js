const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function startServer() {
    fs.readFile('./sbeve-quotes.html', 'utf8', (err, data) => {
        if (err) {
            console.log('eew');
        }

        const { document } = (new JSDOM(data)).window;
        console.log(document);
        const quotes = document.getElementsByClassName('chatlog__markdown-quote-content');

        const quoteList = [];
        for (const quoteRaw of quotes) {
            const quote = {
                'text':quoteRaw.innerHTML,
                'date':'',
                'quoter':'',
            };
            quoteList.push(quote);
        }

        const output = {
            'guild':'',
            'channel':'',
            'people':[],
            'quotes':{
                'anonymous':quoteList,
           },
        };

        console.log(output);
        fs.writeFileSync('stock-quotes.json', JSON.stringify(output));
    });
    return;
}

startServer();