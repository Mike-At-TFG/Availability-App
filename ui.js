// Select DOM elements to work with
const authenticatedNav = document.getElementById("authenticated-nav");
const accountNav = document.getElementById("account-nav");
const mainContainer = document.getElementById("main-container");
const mainNav = document.getElementById("mainNav");
const mainBody = document.getElementById("main-body");
const moreMeetings = document.getElementById("more-meetings");
const topContainer = document.getElementById("top-container");
const timerNextEvents = 6;

const Views = { error: 1, home: 2, calendar: 3 };

function createElement(type, className, text) {
  var element = document.createElement(type);
  element.className = className;

  if (text) {
    var textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }

  return element;
}

function showAuthenticatedNav(account, view) {
  authenticatedNav.innerHTML = "";

  if (account) {
    // Add Calendar link
    var calendarNav = createElement("li", "nav-item");

    var calendarLink = createElement(
      "button",
      `btn btn-link nav-link${view === Views.calendar ? " active" : ""}`,
      "Full Day Calendar"
    );
    calendarLink.setAttribute("onclick", "getEvents();");
    calendarNav.appendChild(calendarLink);

    authenticatedNav.appendChild(calendarNav);
  }
}

function showAccountNav(account) {
  accountNav.innerHTML = "";

  if (account) {
    // Show the "signed-in" nav

    accountNav.className = "nav-item dropdown";

    var dropdown = createElement("a", "nav-link dropdown-toggle");
    dropdown.setAttribute("data-toggle", "dropdown");
    dropdown.setAttribute("role", "button");
    accountNav.appendChild(dropdown);

    var userIcon = createElement(
      "i",
      "far fa-user-circle fa-lg rounded-circle align-self-center"
    );
    userIcon.style.width = "32px";
    dropdown.appendChild(userIcon);

    var menu = createElement("div", "dropdown-menu dropdown-menu-right");
    dropdown.appendChild(menu);

    var userName = createElement("h5", "dropdown-item-text mb-0", account.name);
    menu.appendChild(userName);

    var userEmail = createElement(
      "p",
      "dropdown-item-text text-muted mb-0",
      account.userName
    );
    menu.appendChild(userEmail);

    var divider = createElement("div", "dropdown-divider");
    menu.appendChild(divider);

    var signOutButton = createElement("button", "dropdown-item", "Sign out");
    signOutButton.setAttribute("onclick", "signOut();");
    menu.appendChild(signOutButton);
  } else {
    // Show a "sign in" button
    accountNav.className = "nav-item";

    var signInButton = createElement(
      "button",
      "btn btn-link nav-link",
      "Sign in"
    );
    signInButton.setAttribute("onclick", "signIn();");
    accountNav.appendChild(signInButton);
  }
}

function showError(error) {
  var alert = createElement("div", "alert alert-danger");

  var message = createElement("p", "mb-3", error.message);
  alert.appendChild(message);

  if (error.debug) {
    var pre = createElement("pre", "alert-pre border bg-light p-2");
    alert.appendChild(pre);

    var code = createElement(
      "code",
      "text-break text-wrap",
      JSON.stringify(error.debug, null, 2)
    );
    pre.appendChild(code);
  }

  mainContainer.innerHTML = "";
  mainContainer.appendChild(alert);
}

function showCalendar(events) {
  mainBody.style.backgroundColor = "white";
  var div = document.createElement("div");

  div.appendChild(createElement("h1", null, "Todays Meetings"));

  var table = createElement("table", "table");
  div.appendChild(table);

  var thead = document.createElement("thead");
  table.appendChild(thead);

  var headerrow = document.createElement("tr");
  thead.appendChild(headerrow);

  var organizer = createElement("th", null, "Organizer");
  organizer.setAttribute("scope", "col");
  headerrow.appendChild(organizer);

  var subject = createElement("th", null, "Subject");
  subject.setAttribute("scope", "col");
  headerrow.appendChild(subject);

  var start = createElement("th", null, "Start");
  start.setAttribute("scope", "col");
  headerrow.appendChild(start);

  var end = createElement("th", null, "End");
  end.setAttribute("scope", "col");
  headerrow.appendChild(end);

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);
  var today = new Date().toISOString().slice(0, 10);
  for (const event of events.value) {
    let eventDay = event.start.dateTime.slice(0, 10);
    if (eventDay == today) {
      var eventrow = document.createElement("tr");
      eventrow.setAttribute("key", event.id);
      tbody.appendChild(eventrow);

      var organizercell = createElement(
        "td",
        null,
        event.organizer.emailAddress.name
      );
      eventrow.appendChild(organizercell);

      var subjectcell = createElement("td", null, event.subject);
      eventrow.appendChild(subjectcell);

      var startcell = createElement(
        "td",
        null,
        moment.utc(event.start.dateTime).local().format("M/D/YY h:mm A")
      );
      eventrow.appendChild(startcell);

      var endcell = createElement(
        "td",
        null,
        moment.utc(event.end.dateTime).local().format("M/D/YY h:mm A")
      );
      eventrow.appendChild(endcell);
    }
  }

  mainContainer.innerHTML = "";
  mainContainer.appendChild(div);
}

function showRoomName(account) {
  mainNav.innerHTML = "";
  if (account) {
    var roomName = createElement("h3", null, `${account.name}`);
    mainNav.appendChild(roomName);
  }
}

function showMeetings(account, events) {
  if (account) {
    showAvailability(events);
  }
}

function showAvailability(events) {
  if (events.value.length === 0) {
    mainBody.style.backgroundColor = "green";
    var alert = createElement("div", "row availablity-display", "Available");
    var moreRow = createElement("h1", "row event-header", "Later Meetings:");
    var container = createElement("div", "containter-fluid");

    mainContainer.innerHTML = "";
    mainContainer.appendChild(container);
    container.appendChild(alert);
    container.appendChild(moreRow);

    getNextEvent(timerNextEvents);
  } else {
    mainBody.style.backgroundColor = "red";
    events.value.forEach((event) => displayEvent(event));
  }
}

function meetingsNext(events) {
  topContainer.innerHTML = "";
  if (events.value.length > 0) {
    events.value.forEach((event) => displayUpcomingEvents(event));
  } else {
    var container = createElement("div", "containter-fluid");
    var noMeetings = createElement(
      "div",
      "row event-details",
      "No Meetings Scheduled"
    );
    topContainer.appendChild(container);
    container.appendChild(noMeetings);
  }
}

function displayUpcomingEvents(event) {
  console.log(event.subject);
  var container = createElement("div", "container-fluid");
  var newRow = createElement(
    "div",
    "row event-details",
    event.subject +
      " @ " +
      moment.utc(event.start.dateTime).local().format("h:mm A") +
      " - " +
      moment.utc(event.end.dateTime).local().format("h:mm A")
  );
  topContainer.appendChild(container);
  container.appendChild(newRow);
}

function displayEvent(event) {
  var container = createElement("div", "container-fluid");
  var alert = createElement("div", "row availablity-display", "Busy");
  var subject = createElement("div", "row event-details", event.subject);
  var eventTime = createElement(
    "div",
    "row event-details",
    moment.utc(event.start.dateTime).local().format("h:mm A") +
      " - " +
      moment.utc(event.end.dateTime).local().format("h:mm A")
  );
  eventOrganizer = createElement(
    "div",
    "row event-details",
    event.organizer.emailAddress.name
  );

  mainContainer.innerHTML = "";
  mainContainer.appendChild(container);
  container.appendChild(alert);
  container.appendChild(subject);
  container.appendChild(eventTime);
  container.appendChild(eventOrganizer);
}

function updatePage(account, view, data) {
  if (!view || !account) {
    view = Views.home;
  }

  showAccountNav(account);
  showAuthenticatedNav(account, view);
  showRoomName(account);

  switch (view) {
    case Views.error:
      showError(data);
      break;
    case Views.home:
      getCurrentEvent();
      break;
    case Views.calendar:
      showCalendar(data);
      break;
  }
}

updatePage(null, Views.home);
