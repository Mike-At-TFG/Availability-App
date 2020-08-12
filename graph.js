// Create an options object with the same scopes from the login
const options = new MicrosoftGraph.MSALAuthenticationProviderOptions([
  "user.read",
  "calendars.read",
  "calendars.readwrite",
]);
// Create an authentication provider for the implicit flow
const authProvider = new MicrosoftGraph.ImplicitMSALAuthenticationProvider(
  msalClient,
  options
);
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
const timeToWait = 60000;

function timer(countdown) {
  console.log("Timer is running");
  setTimeout(getCurrentEvent, countdown);
}

async function getEvents() {
  try {
    let events = await graphClient
      .api("/me/events")
      .select("subject,organizer,start,end")
      .orderby("createdDateTime DESC")
      .get();

    updatePage(msalClient.getAccount(), Views.calendar, events);
  } catch (error) {
    updatePage(msalClient.getAccount(), Views.error, {
      message: "Error getting events",
      debug: error,
    });
  }
}

async function getCurrentEvent() {
  try {
    console.log("Current Events GET working");
    let event = await graphClient
      .api(
        "/me/calendarview?startdatetime=" +
          new Date().toISOString() +
          "&enddatetime=" +
          moment(new Date().toISOString()).add(1, "m").toDate().toISOString()
      )
      .get();
    showMeetings(msalClient.getAccount(), event);
    timer(timeToWait);
  } catch (error) {
    updatePage(msalClient.getAccount(), Views.error, {
      message: "Error getting current event",
      debug: error,
    });
  }
}

async function getNextEvent(timerNextEvents) {
  console.log("GET future events running");
  try {
    let event = await graphClient
      .api(
        "/me/calendarview?startdatetime=" +
          new Date().toISOString() +
          "&enddatetime=" +
          moment(new Date().toISOString())
            .add(timerNextEvents, "h")
            .toDate()
            .toISOString()
      )
      .get();
    meetingsNext(event);
    console.log(event.value);
  } catch (error) {
    updatePage(msalClient.getAccount(), Views.error, {
      message: "Error getting future events",
      debug: error,
    });
  }
}
