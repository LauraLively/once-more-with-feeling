
## Personal Trello Clone
When I first thought of what to do for my full stack final project, I had no idea what to do.  I could have created a simple to do list and it would have fulfilled the requirements for the assignment. But where is the fun in that? 

I have always been a sticky note girl. If I need to remember it it goes on a sticky note. and then placed where ever... The problem with that is the where ever part. I have a planner that goes with me where ever I go, but the problem with that is it never gets opened (except to make it pretty at the beginning of the week).  Sometimes sticky notes end up in there, but more often then not the sticky note disappears into the ether.

I needed a place that can be my personal sticky note collector, that is to heavy to misplace. I was first introduced to the concept of a Kanban board during my LHM internship for www.1280thezone.com. We used Trello for our workflow and I thought to myself, "self, why can't I use one of these thing for my life?" And so a love affair with Trello began. 

Ultimately, I would love to have all the things I need to do up on a desktop app that I created (so I have personal pride and ownership in using it) up and running on my surface. Because the first thing I do in the morning is open up my Surface to read with my coffee. And then I get sucked into reading or social media and before I know it half the day is gone and I haven't done things like shop for food and my kids are angry that there isn't any food in the house. (Not really but you get the idea.)

I researched the crap outta the different technologies that I could go with on this project. But ultimately decided on the MERN tech stack (`MongoDB`, `Express.js` `React` and `Node.js`)

The packages that I used in this project are:

 - react-beautiful-dnd
 - react-router-dom
 - styled-components
 - react-datepicker
 - Material UI
 - react-bootstrap
 - react-fontawesome

### Initial github Commit
For my Initial Commit I have pushed up my `MVP`. It has the ability to create new lists and tasks under specific lists. Everything can be updated and deleted. I have not gotten the drag and drop functionality working yet. This is just my bare bones to do list that has the styling of a trello board. 

I have the `API` working with `Micro` and will be porting it to `Express.js`.  The database is `MongoDB` and the data structure is solid. It is structured into two collections. One is for lists and the other for tasks. All of my tasks are tagged with a listID so that one task can only be associated with one list. But 1 board will be able to have multiple lists. 


