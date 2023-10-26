---
layout: default
title: Student Blog
---

![Alt text](images/pokemon.png)

<!-- HTML table fragment for page -->
<table>
  <thead>
  <tr>
    <th>Pokemon</th>
    <th>Upvote</th>
    <th>Downvote</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated data -->
  </tbody>
</table>

<!-- Script is layed out in a sequence (without a function) and will execute when page is loaded -->
<script>

  // prepare HTML defined "result" container for new output
  const resultContainer = document.getElementById("result");

  // keys for joke reactions
  const UPVOTE = "upvote";
  const DOWNVOTE = "downvote";

  // prepare fetch urls
  const url = "https://jarvproject.stu.nighthawkcodingsociety.com/api/pokemons";
  const like_url = url + "/upvote/";  // upvote reaction
  const jeer_url = url + "/downvote/";  // downvote reaction

  // prepare fetch GET options
  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  // prepare fetch PUT options, clones with JS Spread Operator (...)
  const put_options = {...options, method: 'PUT'}; // clones and replaces method

  // fetch the API
  fetch(url, options)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors
      if (response.status !== 200) {
          error('GET API response failure: ' + response.status);
          return;
      }
      // valid response will have JSON data
      response.json().then(data => {
          console.log(data);
          for (const row of data) {
            // make "tr element" for each "row of data"
            const tr = document.createElement("tr");
            
            // td for joke cell
            const joke = document.createElement("td");
              joke.innerHTML = row.id + ". " + row.joke;  // add fetched data to innerHTML

            // td for upvote cell with onclick actions
            const upvote = document.createElement("td");
              const upvote_but = document.createElement('button');
              upvote_but.id = UPVOTE+row.id   // establishes a UPVOTE JS id for cell
              upvote_but.innerHTML = row.upvote;  // add fetched "upvote count" to innerHTML
              upvote_but.onclick = function () {
                // onclick function call with "like parameters"
                reaction(UPVOTE, like_url+row.id, upvote_but.id);  
              };
              upvote.appendChild(upvote_but);  // add "upvote button" to upvote cell

            // td for downvote cell with onclick actions
            const downvote = document.createElement("td");
              const downvote_but = document.createElement('button');
              downvote_but.id = DOWNVOTE+row.id  // establishes a DOWNVOTE JS id for cell
              downvote_but.innerHTML = row.downvote;  // add fetched "downvote count" to innerHTML
              downvote_but.onclick = function () {
                // onclick function call with "jeer parameters"
                reaction(DOWNVOTE, jeer_url+row.id, downvote_but.id);  
              };
              downvote.appendChild(downvote_but);  // add "downvote button" to downvote cell
             
            // this builds ALL td's (cells) into tr (row) element
            tr.appendChild(joke);
            tr.appendChild(upvote);
            tr.appendChild(downvote);

            // this adds all the tr (row) work above to the HTML "result" container
            resultContainer.appendChild(tr);
          }
      })
  })
  // catch fetch errors (ie Nginx ACCESS to server blocked)
  .catch(err => {
    error(err + " " + url);
  });

  // Reaction function to likes or jeers user actions
  function reaction(type, put_url, elemID) {

    // fetch the API
    fetch(put_url, put_options)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors
      if (response.status !== 200) {
          error("PUT API response failure: " + response.status)
          return;  // api failure
      }
      // valid response will have JSON data
      response.json().then(data => {
          console.log(data);
          // Likes or Jeers updated/incremented
          if (type === UPVOTE) // like data element
            document.getElementById(elemID).innerHTML = data.upvote;  // fetched upvote data assigned to upvote Document Object Model (DOM)
          else if (type === DOWNVOTE) // jeer data element
            document.getElementById(elemID).innerHTML = data.downvote;  // fetched downvote data assigned to downvote Document Object Model (DOM)
          else
            error("unknown type: " + type);  // should never occur
      })
    })
    // catch fetch errors (ie Nginx ACCESS to server blocked)
    .catch(err => {
      error(err + " " + put_url);
    });
    
  }

  // Something went wrong with actions or responses
  function error(err) {
    // log as Error in console
    console.error(err);
    // append error to resultContainer
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = err;
    tr.appendChild(td);
    resultContainer.appendChild(tr);
  }

</script>