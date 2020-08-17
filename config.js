const msalConfig = {
  auth: {
    //Uncomment out the 2 sectiosn below
    //get app id from newly created app.
    clientId: "bd42a7ad-1605-4fd7-94a9-f539fad75576",
    //input your webURL from your web deployment (example.azurewebsites.net)
    redirectUri: "https://tfgmeetingapp.azurewebsites.net",
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
