# MeetingRoom

Pull in data for rooms and people, display availability on screens.

Based on the Microsoft Graph Tutorial for Node:
https://docs.microsoft.com/en-us/graph/tutorials/javascript?tutorial

#### You will need a GitHub Account to quick deploy to Azure
#### You will need to add a file for the configuration, there is a config-example.js that can be changed to make this available in your tenant. Create a NEW FILE called config.js or rename config-example to config

This is a work in progress...

## Start with logging into the azure portal (*portal.azure.com*)

### Navigate to Azure **Active Directory > Application Registration > New Registration**


![App Registration](https://github.com/FSi-Strategies/Availability-App/blob/master/images/App%20Registrations.png?raw=true)

### Input the __name of the Application__ (i.e. MeetingRoomApp, AvailabilityApp)


### then Select  **Accounts in this organizational directory only**


![App Name](https://github.com/FSi-Strategies/Availability-App/blob/master/images/Setttings1.png?raw=true)

### Finally select **Register** at the bottom of the page (_**You can skip the Redirect URL for now**_)


![Select register at the bottom of the page, leave the url empty](https://github.com/FSi-Strategies/Availability-App/blob/master/images/Register.PNG?raw=true)


## Setup the Azure Web App

### In the azure portal, go to App Services > New
![Create new azure web app](https://github.com/FSi-Strategies/Availability-App/blob/master/images/AppCreation1.png?raw=true)

### Fill in the following information 
#### Select a Resource Group or create a new one
#### Create a name for the web address (i.e. availabilityFSi, FSiMeetingRoom) - Remember the name you will need it
#### Runtime Stack should be set to Node 10.14

![input correct settings for web app](https://github.com/FSi-Strategies/Availability-App/blob/master/images/AppCreation2.png?raw=true)


#### Select the Sku and Size for the machine (HINT: There are free skus and other dev options the default sku is around $80 per month)
![Select Sku and then review and create webapp](https://github.com/FSi-Strategies/Availability-App/blob/master/images/AppCreation3.PNG?raw=true)

#### Select Create and then navigate to the resource once it is completed.

#### Select the Copy the App ID you will need this
![select copy on app ID](https://github.com/FSi-Strategies/Availability-App/blob/master/images/ApplicationID.png?raw=true)



## Open your config.js file
### You will need to uncomment out (remove the "\\" ) from the clientid and redirect url
### Input the AppID in the "" for client ID
### Input the app url you created for the redirect url (No this is not a real APPID)
![input client id and redirect url](https://github.com/FSi-Strategies/Availability-App/blob/master/images/config.png?raw=true)


## Go back to App Registrations (Azure Active Directory) 
### Select your app that you created
### Select Authentication > Add A Platform > Web
![Authentication settings, add a platform, select web](https://github.com/FSi-Strategies/Availability-App/blob/master/images/AddRedirect.PNG?raw=true)

### Fill out / Select the following:
#### Redirect URL (Azure WebURL for earlier)
#### Select both Access Token and ID Token
#### Select Configure
![enter redirect url, select token radios, select configure](https://github.com/FSi-Strategies/Availability-App/blob/master/images/Redirect.PNG?raw=true)

## Deploy the code
#### Navigate back to your application (App Service > NAME OF YOUR APP)
#### Select Deployment Center
#### Select GitHub
![deploy app, select github](https://github.com/FSi-Strategies/Availability-App/blob/master/images/githubselect.PNG?raw=true)

#### Select App Service Build Service
![select service](https://github.com/FSi-Strategies/Availability-App/blob/master/images/AppServiceBuild.png?raw=true)
#### Select Continue

#### Select the correct settings 
##### You or your organization 
##### Repository (Availability App)
##### Branch (Likely Master)

![input git information](https://github.com/FSi-Strategies/Availability-App/blob/master/images/FSiConfigureGit.PNG?raw=true)

#### Select continue
#### Select Finish
![select finish](https://github.com/FSi-Strategies/Availability-App/blob/master/images/deployApp.PNG?raw=true)

# YOU HAVE NOW DEPLOYED THE APP
## Go to the web address and login! (or use edge and SSO in)
