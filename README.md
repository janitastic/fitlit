## 💪🏼 FitLit! 💪🏼
  ### A Front End Engineering Project by: 
  - [Jani Palomino](https://github.com/janitastic)
  - [Nate Ewert-Krocker](https://github.com/NEwertKrocker)
  - [Regan Losey](https://github.com/reganlosey)
  - [Susanna Carey](https://github.com/susannaopal)


  #### Project Manager: [Cassandra Torkse](https://github.com/CassandraGoose)

  #### Formal Code Review by: [Mike Limberg](https://github.com/mlimberg), [Rachel Williams](https://github.com/rwilliams659), and [Katie Scruggs](https://github.com/katiescruggs)
<hr>

### Project Overview:
   Our group was given a basic code foundation to add to in order to create an interactive fitness tracker that allows a user to track their lifestyle activities over several categories including water intake, amount and quality of sleep, and physical activity.
   <br><br>
    We accomplished this by applying our accumulated knowledge of Front End Engineering combined with a variety of newly introduced concepts such as Webpack, network requests and responses, 3rd party NPM dependencies, and Test Driven Development using the  Mocha and Chai.

<hr>

### Functionality:
   With the Fitlit application, the user can keep track of a multitude of health and fitness metrics. Widgets will display a visual representation of the user's daily and weekly water intake, daily step goal and the average step goal of their community, as well as the measurements of their daily and weekly hours slept and sleep quality. The user can also update these metrics for the current day in the "Daily Overview" section.
   
## 🎥 [Take a look at our Video Demo!](https://vimeo.com/643699820)
*Click on the video below to view a live demo*<br><br>
<a href="https://vimeo.com/643699820" target="_blank"><img src="https://user-images.githubusercontent.com/82983696/140831925-e96e9446-82aa-4445-a8ab-e1b6e1b3e98c.gif" alt="Fitlit Demo" width="1200" height="480" border="10" /></a>

### Accessibility:
  We designed our Fitlit app to mobile response, readable on a screen reader, and tabable if a user is navigating it without a mouse. See examples below.
<br>
![Mobile Demo](https://github.com/janitastic/fitlit/blob/main/src/images/mobile-fitlit.gif)
![Tabable Demo](https://github.com/janitastic/fitlit/blob/main/src/images/tabable-fitlit.gif)

### Techologies Used:
  - JavaScript
  - HTML
  - SASS
  - Mocha & Chai
  - Node.js
  - VSCode & Atom
  - Lighthouse

### Installation and Setup:
**To navigate the website live, a server download is required.**
  1. Download the necessary server and API [here](https://github.com/turingschool-examples/fitlit-api)
  2. Cd into the `server` directory and then into the `fit-lit-api` directory.
  3. In the command line, run `npm start`

**Then clone down this repository**
  1. In your command line, `cd` into your local directory and clone down this repository -<br>
      `git clone https://github.com/janitastic/fitlit`
  2. Install the necessary package dependencies - <br>
      `npm install`
  3. Run the command `npm start` 
  4. With both the server running and this package, and visit `http://localhost:8080/` in your browser.

### Future Enhancements :
- Integrate functionality to update displayed info with the input added from the user in the sleep, activity and hydration fields.
- Add functionality for a user to create a new profile with a login and password.
- Allow user to create their own sleep, hydration, and activity goals.
- Add more elements like a profile photo to the user profile. 
- Customizable theme templates.

### Resources:
- [Rubric and Project Specifications - Part 1](https://frontend.turing.edu/projects/Fitlit-part-one.html)
- [Rubric and Project Specifications - Part 2](https://frontend.turing.edu/projects/Fitlit-part-two.html)
- [Chart.js](https://www.npmjs.com/package/chart.js)
