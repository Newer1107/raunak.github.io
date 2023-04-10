require('dotenv').config();
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.messagingSenderId,
  measurementId: process.env.measurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// Handle form submission
function handleSubmit(event) {
  event.preventDefault(); // prevent default form behavior
  var name = document.getElementById('name').value; // get name input value
  var birthdate = document.getElementById('birthdate').value; // get birthdate input value
  var usersRef = database.ref('users'); // get a reference to the 'users' collection

  // Check if a user with the same name and birthdate already exists
  usersRef.orderByChild('name_birthdate').equalTo(name + '_' + birthdate).once('value', function(snapshot) {
    if (snapshot.exists()) {
      // User already exists
      alert('A user with the same name and birthdate already exists. Please enter a different name or birthdate.');
    } else {
      // User doesn't exist, add new user
      var newUserRef = usersRef.push(); // create a new child node with a unique ID
      newUserRef.set({ // set the data for the new node
        name: name,
        birthdate: birthdate,
        name_birthdate: name + '_' + birthdate // add a new field to query by name and birthdate
      });
      
      alert('Data saved successfully!');
    }
  });
}

var usersRef = database.ref('users');

// Attach an event listener for when the data changes
usersRef.on('value', function(snapshot) {
  var users = snapshot.val(); // get the data as an object
  var tableBody = document.getElementById('table-body');

  // Clear any existing rows from the table body
  tableBody.innerHTML = '';

  // Loop through the users and generate a table row for each one
  for (var key in users) {
    var user = users[key]; // get the user data
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    var birthdateCell = document.createElement('td');

    nameCell.textContent = user.name;
    
    // Format the birthdate in dd/mm/yyyy format
    var birthdate = new Date(user.birthdate);
    var day = birthdate.getDate().toString().padStart(2, '0');
    var month = (birthdate.getMonth() + 1).toString().padStart(2, '0'); // months start from 0, so add 1 to get the correct month
    var year = birthdate.getFullYear();
    birthdateCell.textContent = day + '/' + month + '/' + year;

    row.appendChild(nameCell);
    row.appendChild(birthdateCell);
    tableBody.appendChild(row);
  }
});

function displayUpcomingBirthday(users) {
    var today = new Date(); // get the current date
    var closestBirthdayUser = null; // initialize the closest birthday user to null
    var closestBirthday = Infinity; // initialize the closest birthday to infinity
  
    // Loop through the users to find the user with the closest upcoming birthday
    for (var key in users) {
      var user = users[key]; // get the user data
      var userBirthday = new Date(user.birthdate); // parse the user's birthdate string into a Date object
      userBirthday.setFullYear(today.getFullYear()); // set the year of the user's birthday to the current year
  
      // Calculate the difference between the user's birthday and today's date
      var timeDiff = userBirthday.getTime() - today.getTime();
      var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
      // If the user's birthday is today, display a "Happy Birthday" message
      if (daysDiff == 0) {
        var message = "HAPPY BIRTHDAY " + user.name.toUpperCase() + "!";
        var birthdayMessage = document.getElementById("birthday-message");
        birthdayMessage.innerHTML = message;
        birthdayMessage.style.fontWeight = "bold";
        birthdayMessage.style.fontSize = "24px";
        birthdayMessage.style.color = "#FFC107";
        return;
      }
  
      // If the user's birthday is in the future and closer than the current closest birthday, update the closest birthday user
      if (daysDiff > 0 && daysDiff < closestBirthday) {
        closestBirthdayUser = user;
        closestBirthday = daysDiff;
      }
    }
  
    // If no user has a birthday today, display a "Upcoming Birthday" message for the user with the closest upcoming birthday
    if (closestBirthdayUser) {
      var message = "UPCOMING BIRTHDAY: " + closestBirthdayUser.name.toUpperCase() + " in " + closestBirthday + " day(s)!";
      var birthdayMessage = document.getElementById("birthday-message");
      birthdayMessage.innerHTML = message;
      birthdayMessage.style.fontWeight = "bold";
      birthdayMessage.style.fontSize = "24px";
      birthdayMessage.style.color = "#FFC107";
    }
  }
  
  