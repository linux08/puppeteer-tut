
Link to article: [here](https://medium.com/@holy_abimz/exploring-the-power-of-puppeteer-903a1c8c137b)

 Setting up 

## Ensure you have Node.js installed on your machine if not download

## To get started

*  clone the repository 

* cd into the project
     

* install dependencies
    ``` npm i ```
    
* run the code 
    ```npm start ```

    
# Features

    -Get a web page to pdf  and send to your email address
    - get screenshot of a web page
    -scrape twitter
    -Get daily update of news from ycombinator to your email address


set heroku environment variables from command line ```heroku config:set $(cat .env)```

Add the puppeteer heroku buildpack: ```heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack```

BASE URL : https://puppeteer-demo1.herokuapp.com/

 Get all the trending tweet relating to nigeria :
 https://puppeteer-demo1.herokuapp.com/scrape-twitter?search=nigeria
 
 to use the above endpoint change nigeria to whatever you want.
