const msalConfig = {
  auth: {
    //Uncomment out the 2 sectiosn below
    //  get app id from newly created app.
    // clientId: 'STRING GOES HERE FROM AZURE ENTERPRISE APPS',
    //input your webURL from your web deployment (example.azurewebsites.net)
    //redirectUri: "http://localhost:8080",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    forceRefresh: false,
  },
};

const loginRequest = {
  scopes: ["openid", "profile", "user.read", "calendars.read"],
};
