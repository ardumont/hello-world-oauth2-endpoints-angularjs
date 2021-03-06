appengine-endpoints-backend-java
================================

This application implements a simple backend for a greeting api using
Google Cloud Endpoints, App Engine, and Java.

## Products
- [App Engine][1]

## Language
- [Java][2]

## APIs
- [Google Cloud Endpoints][3]
- [Google App Engine Maven plugin][6]

## Setup Instructions
1. Update the value of `application` in `appengine-web.xml` to the app ID you
   have registered in the App Engine admin console and would like to use to host
   your instance of this sample.
1. Update the values in `src/com/google/devrel/samples/ttt/spi/Ids.java` to
   reflect the respective client IDs you have registered in the
   [APIs Console][4].
1. Update the value of `CLIENT_ID` in
   `webapp/js/base.js` to reflect the web client ID you have registered in the
   [APIs Console][4].
1. mvn clean install
1. Run the application with `mvn appengine:devserver`, and ensure it's running 
   by visiting your local server's  address (by default [localhost:8080][5].)
1. Get the client library with `mvn appengine:get_client_lib`
1. Deploy your application.


[1]: https://developers.google.com/appengine
[2]: http://java.com/en/
[3]: https://developers.google.com/appengine/docs/java/endpoints/
[4]: https://code.google.com/apis/console
[5]: https://localhost:8080/
[6]: https://developers.google.com/appengine/docs/java/tools/maven


## Steps to deploy hello world
### Create OAuth 2.0 client IDs
 1. Go to https://code.google.com/apis/console
    and create or choose your project (i used the same name for my project as the GAP application name) 
 2. Click on API Access link and fill in all the relevant infomations and click **create a new Oauth2 client ID** or **create anthor client ID**
    - make sur that **web application** is selected
    - click **Your site or hostname (more options)** link and then fill in : 
       optional : Authorized Redirect URIs : https://oauthcloud-endpoints.appspot.com
       Authorized JavaScript Origins :  https://oauthcloud-endpoints.appspot.com
                                        add all urls that will be used to access your app (localhost:8080 for  example to test localy)
      
      Note that this URL corresponds to the one that will be used to access your application on GAP
    - validate your creation
 3. Copy the generated client ID and then past it in : (base.js and Ids.java) in the relevant location
 4. Copy your GAP application ID and past it to  your appengine xml descriptor
 5. Regenerate client lib by running : mvn appengine:endpoints_get_client_lib
 6. Deploy your application to GAP : mvn appengine:update
 7. Access your application on https://oauthcloud-endpoints.appspot.com

Your done     
