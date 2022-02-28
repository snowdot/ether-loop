# Etherloop 🌌
[Etherloop](https://etherloop.moonlabs.xyz/) is a social connection web application that allows users to:
- **follow**/**unfollow** Ethereum addresses and get **recommendations** on how to follow next;
- view the **total net worth** and **number of assets** for all the addresses the users are connected to;
- view their own wallet **balances**, **tokens**, **transactions**, **POAPs** and **NFTs**.<br>

Project link: https://etherloop.moonlabs.xyz/<br>
Public repo: https://github.com/snowdot/ether-loop<br>
Recorded video demo of Unstoppable Domains Login integration: https://youtu.be/TMaPd_3hxtk<br>
Recorded video demo of CyberConnect API integration: https://youtu.be/r5MPI5X0688<br>

![landing](https://user-images.githubusercontent.com/39951422/145643642-c7e5be41-2181-4377-95f3-891c81f34ec3.PNG)

# [CyberConnect API](https://docs.cyberconnect.me/) feedback
## Following & Followers List
1. The query response is fast and these are the results on average:
- ```query followers: 800ms```
- ```query followings: 800ms``` 
2. The schema is easy to follow and understand.
3. The pagination (using ```First``` and ```After``` arguments) is really helpful;<br>
**Suggestion** 💡: ```After``` being of type ``INT`` like ```First``` as we are passing a number.<br>

## Recommended Following List
1. The query response is fast and these are the results on average:
- ```query recommendations: 1100ms```<br>
2. The schema is easy to follow and understand;<br>
3. In terms of pagination we have the same suggestion as mentioned above for the Following & Followers List.<br>
4. Having the ability to find recommended addresses based on existing connections is really helpful and powerful. It opens up the potential to build powerful applications.<br>

## Follow Button
We implemented in our application the React Component for the ```Follow Button```.<br>
1. The library is fast and the button component is interactive and easy to use.<br>
2. Using the same button component that automatically switches between follow/unfollow just by providing it the address and without the need to create another component is a big plus and saves time.<br>
3. We did encounter two errors that got fixed right away with the help of the CyberConnect developers:<br>
- The first one was CORS block ```Access-Control-Allow-Origin``` on connecting using a domain.<br>
- The second error was ```{code: 'CeramicError', message: 'Can not get ceramic outboundLink'}``` that got fixed with the library update.<br>

## Searching for an identity
We also used in our application the ```identity query``` to search by providing an address or an ens name as input.
1. Having the ability to find an identity just by proving a single input proved to be really handy especially since nowadays domain names are popular.<br>
**Suggestion** 💡: for this particular query, when providing the wrong input (either input an unavailable ens or the user makes a mistake), the server should reply with an error message ```"message": "Name not found"``` instead of ```"message": "Server Internal Error"```.<br>

Overall we enjoyed working with the APIs since it's fast, easy to use and saves time. We're happy that we discovered the project through the hackathon and allowed us to built our app.<br><br>

# Setup
## Prerequisites needed:
  - [Node 12 or better](https://nodejs.org/en/)
  - [Covalent API key](https://www.covalenthq.com/platform/#/auth/register/)
  - [EtherScan API key](https://etherscan.io/myapikey)
  - [Moralis Server & APP ID](https://admin.moralis.io/servers)
  - [Unstoppable Domains credentials](https://unstoppabledomains.com/apps)

## Steps to set the Backend running:
1. Set the following variables in ```.env```
- ```COV_API=https://api.covalenthq.com/v1```
- ```COV_KEY=``` Covalent API key
- ```PORT=2300``` 
- ```MORALIS_SERVER_URL=``` Moralis Server URL
- ```APPID=``` Moralis APP ID
- ```ETHERSCAN_API_KEY=``` EtherScan API key
3. install npm dependencies;
4. run the project with the command ```$ npm start```;

## Steps to set the Client running:<br>
1) go to the Client folder directory;
2) make sure you do not have anything running on port 3000;
3) install the Node dependencies by running ```$ yarn``` in the terminal;
4) insert in the ```package.json``` file the following key value pair, right above ```"dependencies": "proxy": "http://localhost:8080"``` and save the changes;
5) open a new terminal and run the command ```$ yarn start``` (make sure you are in the right directory);
6) set in the ```.env``` the Unstoppable Domains credentials.

