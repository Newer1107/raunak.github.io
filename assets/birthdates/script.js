var firebaseConfig = {
    apiKey: "AIzaSyCOoXNQIyjeeTFhEBWSp-ux4x2c7oszNyQ",
  authDomain: "someproject-38ec0.firebaseapp.com",
  databaseURL: "https://someproject-38ec0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "someproject-38ec0",
  storageBucket: "someproject-38ec0.appspot.com",
  messagingSenderId: "753262877001",
  appId: "1:753262877001:web:fcd6854580378aa8b46298",
  measurementId: "G-GS4MPRM7J7"
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
  
  if (window.history.replaceState) {
    // Get the current URL path
    var path = window.location.pathname;
    
    // Replace the current URL with the desired URL
    window.history.replaceState({}, '', path.replace('/assets/birthdates/index.html', '/birthdates'));
  }
  const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function() {
  const filter = searchInput.value.toUpperCase();
  const tableRows = document.querySelectorAll('#table-body tr');
  tableRows.forEach(function(row) {
    const name = row.cells[0].textContent.toUpperCase();
    if (name.indexOf(filter) > -1) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

function showClosestBirthday() {
  var usersRef = database.ref('users');
  var closestBirthday = null;
  var closestBirthdayName = null;

  usersRef.once('value', function(snapshot) {
    var users = snapshot.val(); // get the data as an object

    // Loop through the users and find the closest upcoming birthday
    for (var key in users) {
      var user = users[key]; // get the user data

      // Calculate the number of days until the user's next birthday
      var birthdate = new Date(user.birthdate);
      var now = new Date();
      var thisYearBirthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());
      if (thisYearBirthday < now) {
        // If the user's birthday has already passed this year, calculate for next year
        thisYearBirthday.setFullYear(thisYearBirthday.getFullYear() + 1);
      }
      var daysUntilBirthday = Math.round((thisYearBirthday - now) / (1000 * 60 * 60 * 24));

      // Check if this is the closest upcoming birthday found so far
      if (closestBirthday === null || daysUntilBirthday < closestBirthday) {
        closestBirthday = daysUntilBirthday;
        closestBirthdayName = user.name;
      }
    }

    // Convert the current time to IST timezone
    var now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    now = new Date(now);

    // Calculate the time until the closest upcoming birthday
    var birthday = new Date(thisYearBirthday);
    birthday.setHours(0, 0, 0, 0);
    var timeUntilBirthday = birthday - now;

    // Display the closest upcoming birthday and the time until it
    var closestBirthdayText = closestBirthdayName + "'s birthday is the closest, which is in " + closestBirthday + " days, ";
    closestBirthdayText += Math.floor(timeUntilBirthday / (1000 * 60 * 60)) + " hours, ";
    closestBirthdayText += Math.floor((timeUntilBirthday % (1000 * 60 * 60)) / (1000 * 60)) + " minutes, and ";
    closestBirthdayText += Math.floor((timeUntilBirthday % (1000 * 60)) / 1000) + " seconds.";

    document.getElementById('closest-birthday').textContent = closestBirthdayText;

    // Update the countdown every second
    setInterval(function() {
      var now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      now = new Date(now);
      var timeUntilBirthday = birthday - now;
      closestBirthdayText = closestBirthdayName + "'s birthday is the closest which is in " + closestBirthday + " days, ";
      closestBirthdayText += Math.floor(timeUntilBirthday / (1000 * 60 * 60)) + " hours, ";
      closestBirthdayText += Math.floor((timeUntilBirthday % (1000 * 60 * 60)) / (1000 * 60)) + " minutes, and ";
      closestBirthdayText += Math.floor((timeUntilBirthday % (1000 * 60)) / 1000) + " seconds.";
      document.getElementById('closest-birthday').textContent = closestBirthdayText;
    }, 1000);
  });
}


var closestBirthday = showClosestBirthday();
// Display the closest birthday and days left
showClosestBirthday();

closestBirthdayElement.textContent = closestBirthday.name + "'s birthday is coming up on " + closestBirthday.dateString + ". Only " + closestBirthday.daysLeft + " days left!";