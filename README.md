# IP Address Management REST API
 
Create a simple IP Address Management REST API on top of any data store. It will include the ability to add IP Addresses by CIDR block and then either acquire or release IP addresses individually. Each IP address will have a status associated with it that is either “available” or “acquired”. 
 
The REST API must support four endpoint:
  * **Create IP addresses** - take in a CIDR block (e.g. 10.0.0.1/24) and add all IP addresses within that block to the data store with status “available”
  * **List IP addresses** - return all IP addresses in the system with their current status
  * **Acquire an IP** - set the status of a certain IP to “acquired”
  * **Release an IP** - set the status of a certain IP to “available”

Trillion Project ReadMe (Updated)
---------------------------------

Steps that I followed after creating a fork of the project.

1. Clone the Trillion repository
mkdir trillion
cd trillion
git clone https://github.com/trillion-repos/ip-rest-api-JonathanEkwempu-.git
cd ip-rest-api-JonathanEkwempu-

2. Create a package.json file by executing:
npm init

follow prompts and answer the questions
- ip-rest-api-JonathanEkwempu-
- Trillion IP CRUD Rest API
- https://github.com/trillion-repos/ip-rest-api-JonathanEkwempu-.git
- Trillion IP CRUD Rest API 
- Jonathan Ekwempu

3. Do some install
npm install --save-dev nodemon
npm install express --save
npm install ip --save

4. Open the project in an editor (e.g. VSCode)
Create a file server.js in the root of your project and write the server code in it.

5. Open a terminal and Start the server (cd to your project)
npm run start

6. Unit Test the API
---------------------

End points (you may have to replace localhost with an appropriate host):

6.1 **Create IP addresses**
localhost:8080/trillion/create/cidr
You can test this end point using a client like Postman. 
Use POST, 
Params: Body -> raw (make sure you select JSON also)
In the body enter (example):
{
    "cidr":"1.0.0.1/24"
}
Run List IPs (6.2 below) to see the IPs that were generated

The other endpoints could easily be tested in the browser (or still in Postman) 
6.2 **List IP addresses**
http://localhost:8080/trillion/list/ips

6.3 **Acquire an IP**
http://localhost:8080/trillion/acquire/1.0.0.24
Run List IPs (6.2) to see your changes

6.4 **Release an IP**
http://localhost:8080/trillion/release/1.0.0.2
Run List IPs (6.2) to see your changes

Some useful endpoints
6.5 ** Total Number of IPs **
http://localhost:8080/trillion/ips/total
Sample Result: {"count":256}

6.6 ** Number of IPs available **
http://localhost:8080/trillion/ips/available
Sample Result: {"count":255}

6.7 ** Number of IPs acquired **
http://localhost:8080/trillion/ips/acquired
Sample Result: {"count":1}

