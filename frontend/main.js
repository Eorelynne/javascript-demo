//Add an event listener on keyup in the input field
//-run the search function on each keyup
$('input').keyup(search);

//A click on a person should toggle (show/hide) more info
//Delegated eventhandling with "on"
//grab something that already exists -> body
//and when someones click the body only run the event if 
//the click occurs in an element that has the class person
$('body').on('click', '.person h3', function () {
  //I/this is an h3 tag inside a div.person
  // so the parent is the div.person
  //and we serach for p tag and use toggle
  //to show them if they are hidden and hide them if they are shown
  $(this).parent().find('p').toggle(400);
});

async function search() {
  //Read the value of the input field
  let search = $('input').val();
  //Make a fetch
  let result = await (await fetch('/persons/namesearch/' + search)).json();
  displaySearchResult(result);
}

async function displaySearchResult(persons) {
  //if no persons found report that
  if (persons.length === 0) {
    $('.result').html('Inga personer hittade...');
    return;
  }
  //An empty string that we are going to fill with html
  let html = 'Klicka på en person för mer info...';
  //Loop through each person in the search result.
  //and usa a destructuring assignment to get person properties
  //as loop variables

  for (let { first_name, last_name, email, birthDate } of persons) {
    //Add html to display the person in the div.result
    html += `
    <div class="person">
      <h3> ${first_name} ${last_name}</h3>
      <p><b>Email:</b> ${email}</b></p>
    <p><b>Birth date:</b> ${birthDate}</p >
    </div>
    `;
  }
  //Replace the content of the div.result with our html
  $('.result').html(html);
}