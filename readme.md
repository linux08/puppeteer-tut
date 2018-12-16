# Web scrapper
Scrapping the web  using pupetter and node



# Features

    -Get a web address screenshot and send to your email address
    -scrape twitter
    -Get daily update of news from ycombinator to your email address


set heroku environmet variables from command line ```heroku config:set $(cat .env)```

Add the puppeteer heroku buildpack: ```heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack```

BASE URL : https://puppeteer-demo1.herokuapp.com/

https://puppeteer-demo1.herokuapp.com/scrape-twitter?search=nigeria