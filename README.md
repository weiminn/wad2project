# Meeting Go Where - G5T1

  

## TEAM MEMBERS:

- Amanda Choo Yun Xuan
- Po Qi Lin
- Baratharam S/O Manogaran
- Then Ee ki
- Wei Minn

  
## Project Overview


### Meeting Go Where
Aims to

1. To provide a respectable user experience for the students who access Facility Booking System on their  mobile devices

2. Provide students shortcuts to rebook their frequently booked room

3. Display the overview of all the available facilities
 
  

  

## Project setup commands
### Installation of required dependencies
```

npm install

```

  

### Compiles and hot-reloads for development

```

npm run serve

```

  

### Compiles and minifies for production

```

npm run build

```

## Steps to deploy to Localhost

For development and debugging purposes, the project can be served locally via the command executed in the **project folder root**:

```

npm run serve

```
A local Node server will be started and the default serving URL is http://localhost:8080/app

## Steps to deploy to Cloud

1. Build the project by running the following command in the **project folder root** :
	

```

npm run build

```

2. The command will generate a **dist** folder in the project root.  The files in the **dist** are to be uploaded via FTP to the cloud service.
3. Example of generated **dist** files include the index.html, minified css and js 

## Steps to deploy Email Rest API

The included files under the Mail folder, are to be deployed to a PHP server. The URL of the server is then to be replaced in the Wizard.vue file under **src/components/**

example of the URL to be replaced
![email_server_rest](screenshots/email_server_endpoint.PNG)

## Project Structure 

Main pages
  - Home Page
  - Booking Form
  - My Bookings Page
  - Scheduling Page
  - Tasks Page
 

Authentication/User Pages
 - Login Page 
 - Profile Page
 

## Remarks 

### Email Rest API(mail.php)
The Mail.php is currently hosted on an external cloud service and is called by the main application to send out the booking confirmation emails. Steps to deploy are included above.

## Credentials/API Keys

### Email (SendGrid)
```
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
```

### User Account 
- Authentication is by social login, any suitable **SMU** gmail account can be used to login. 
- typically starts like xxxxx.xxxx@**smu.edu.sg**![social login](screenshots/2020-11-15-20-21-wad2project.azurewebsites.net.png)






  

