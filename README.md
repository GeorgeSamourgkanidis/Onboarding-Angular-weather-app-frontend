Onboarding project to practice Angular and dotnet webapis.

The backend should be running locally in order to call it's apis in the frontend: https://github.com/GeorgeSamourgkanidis/Onboarding-Angular-weather-app-backend

Implemented the frontend using angular 17, ngrx store, materialUi, bootstrap, weatherapi, rxjs, ngx-echarts.
First of all using the angular/router I redirect to the route "/weather" (only this page was requested to implement). The appcomponent is separated to 3 parts (header, router-outlet, footer). WeatherComponent is the main component of the main route. This page is splitted to 2 parts. Left-side-panel includes the search input and the saved favorite cities. Once a city is selected or searched correctly, the WeatherCityDetails component is shown. Using OnChange lifecycle when the cityName input changes, I call 3 apis to fill the charts and city details. The pages are responsive. I change some css once the size is smaller than a laptop <1024 and even further(mobile).

Added Interceptor in the http provider

Added Auth service to handle the user/auth apis

Added login/logout buttons in the header

Use backend apis to get/save/unsave the favortie cities based on the username if the user is logged in

Enable or disable feautres if the user is logged in (in sessionStorage)

Sign in with google/facebook by sending the user email and id as username and password
