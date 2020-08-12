# MeetingRoom

Pull in data for rooms and people, display availability on screens.

Based on the Microsoft Graph Tutorial for Node:
https://docs.microsoft.com/en-us/graph/tutorials/javascript?tutorial

You will need to add a file for the configuration, there is a config-example.js that can be changed to make this available in your tenant.

This is a work in progress...

Start with logging into the azure portal (portal.azure.com)

Navigate to Azure Active Directory > Application Registration > New Registration
![App Registration](https://github.com/FSi-Strategies/Availability-App/blob/master/images/App%20Registrations.png?raw=true)

Input the name of the Application (i.e. MeetingRoomApp, AvailabilityApp)
then Select -  Accounts in this organizational directory only 
![App Name](https://github.com/FSi-Strategies/Availability-App/blob/master/images/Setttings1.png?raw=true)

Finally select Register at the bottom of the page (You can skip the Redirect URL for now)
![Select register at the bottom of the page, leave the url empty](https://github.com/FSi-Strategies/Availability-App/blob/master/images/Register.PNG?raw=true)
