# Weather Planning Dashboard

## Description

### **This repository includes all files of my Weather Planning Dashboard**

This application allows the user to input a city and see data on current weather info, as well as 5 day forecast. Current weather info will show temperature (with visual icon), wind speed, humidity and UV index (UV index is color coded based on severity). 5 day forecast includes all of the aforementioned data points save the UV index. Users' search history will be stored and displayed on the page, and will stay as persistent data. There is an option to clear search history.

### Technologies Used

To this point, this application utilizes the most ammount of API's in conjunction with one another than I have previously attempted. In short, this application uses Bootstrap, MomentJs, JQuery, and Open Weather API. Open Weather API, being a server-side API, was perhaps the biggest challenge to me here because I haven't previously used fetch commands, but taking it one-step at a time (console logging everything as I proceeded), made the implementation fairly simple. One particular skill I've improved on in this application that wasn't as fleshed out in my last project was function flow. My functions all have a unique purpose, with clear naming conventions. This allowed me to easily call them multiple times with minimum adjustments needed to the functions themselves, greatly minimizing need to ever repeat code or make modifications as I repeatedly called the same functions for different scenarios. 

### Future Development of this Application

Right now, clicking on a previously searched city will display weather data from when the city was originally searched. This is fine when users switch between cities in the same session, but if they use my application the next day, saved weather data will be outdated. I'd like it so that clicking on previously searched cities the next data will re-fetch weather data from Open Weather API, but only when application is loaded on a new day. A more developed implementation of MomentJs should be the solution. For now, the best way to solve this issue would be for the user to clear search upon application load on following day and re-search cities, as cumbersome as that may be.

Though I'd like to solve that now, this is beyond the scope of my original motivation for creating this app, and I'll have to move on for the time being to develop my skills elsewhere.

---
## Deployed Page link

https://toacin.github.io/Weather-Planning-Dashboard/

## Installation

N/A (Please see above for deployed link.) Once on deployed page, begin searching cities to view weather data.


## License

Open Source

---
## Images of Application

### Application Image
![App Screenshot](./Assets/Images/AppScreenshot.JPG "Screenshot of Application")