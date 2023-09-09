// Uses jQuery to grab the save button and time blocks from the html
const saveBtn = $('.saveBtn');
const timeBlock = $('.time-block');

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  // sets click event listener on the save button
  saveBtn.on('click', function() {
    // declares the key and assigns the value by grabbing the parent element of the save button by its id, which is the div container with the id of hour-x
    const key = $(this).parent().attr('id');
    // declares the value and assigns the value by grabbing the sibling of the save button by its class, which is the text area, and grabbing its value
    const value = $(this).siblings('.description').val();
    // stores the key and value in local storage to save the text entered in the text area and pairing it with the key which is the time slot described in the id
    localStorage.setItem(key, value);
  });
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  // Displays user input in text area by getting item from local storage in a loop that iterates through each time block
  // Uses .each to iterate in a loop to go through each timeblock and grab any value in the local storage to display on the page
  timeBlock.each(function() {
    // declares key and assigns the value by the time block's id which contains its specific hour
    const key = $(this).attr('id');
    // declares value and assigns the value by the key in the local storage
    const value = localStorage.getItem(key);
    // Grabs the value of the children of the timeBlock which is the text area with the class of description so the user's input history is displayed on the page
    $(this).children('.description').val(value);
  });
  // TODO: Add code to display the current date in the header of the page.
  // Sets the current date
  function currentDateAndTime() {
    // Uses jQuery to declare date and time variable by grabbing the spans in the html by their id
    const dateEl = $('#date');
    const timeEl = $('#time');
    // Uses dayjs to get the current date and time by not passing any parameters in the dayjs() and using .format to choose the format in which the date and time will be displayed
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm A');
    // Displays the Date and Time by changing the text content to display the current date and time
    dateEl.text(currentDate);
    timeEl.text(currentTime);
    setInterval(currentDateAndTime, 1000);
  };
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  function timeBlockColor() {
    // .each iterates through the time blocks to grab the value of the hour
    timeBlock.each(function() {
    // Declares variable of hour by grabbing the id of the time block which contains the number of the time but since it's a string it needs parseInt to return it as an integer
      const hour = parseInt(this.id);
      // Grabs the current hour by just the H value 
      const currentHour = dayjs().format('H');
      // Checks if time is equal to current time 
      if (hour == currentHour) {
        // Removes irrelevant class colors and adds class with color to represent present state
        $(this).removeClass('past future').addClass('present');
        // Checks if time is behind present time indicating it's in the past
      } else if(hour < currentHour) {
        // Removes irrelevant class colors and adds class with color to represent the past state
        $(this).removeClass('present future').addClass('past');
      } else {
        // If neither if or if else are true, the class of future is added after removing the other classes
        $(this).removeClass('past present').addClass('future');
      };        
    });
  };
  // Calls the function that sets the date and time
  currentDateAndTime();
  // Calls function that sets the color on the timeBlock
  timeBlockColor();
});