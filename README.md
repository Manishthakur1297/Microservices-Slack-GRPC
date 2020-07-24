# Microservices GRPC SLACK

## Problem Statement

1. Develop 2 microservices (any language) that communicates with one another using gRPC.
2. Lets say:
   a. 1st Microservice: M1
   b. 2nd Microservice: M2
3. M1 is a client facing microservice that exposes a simple REST endpoint to input a message
   from the user in JSON format.
4. M1 then relays the received message to M2 by communicating over gRPC.
5. M2 then stores this message either in a local storage (say file based storage) or uses a remote
   database. (either one is ok)
6. After storage, M2 then integrates with a sample Slack app and sends this message(received
   from M1) to any one of the slack channels.
7. Feel free to Create your own slack app for demo purposes
8. Slack API documentation: https://api.slack.com/

## Solution - FOLLOW THE STEPS FIRST:

---

### 1. Open Slack Channel URL given Below.

#### Slack Url: https://digiretailworkspace.slack.com/

### 2. Login with Credentials Given to Above Slack Channel

#### Email Id: testmail1297@gmail.com

#### Password: digiretail

### 3. Go to New Tab and open Web APP deployed on Cloud

---

### Live URL -> https://digiretail.herokuapp.com/

---

### 4. Type any Message in the input field and Hit Enter.

### 5. Check Typed Message under #microservices-over-grpc SLACK channel.

---

## Steps to RUN on Local Machine

---

### 1. git clone <url>

### 2. npm install

### 3. npm run dev

### 4. Use above credential to login to SLACK Channel

OR

### JOIN LINK: https://join.slack.com/t/digiretailworkspace/shared_invite/zt-g38orkci-WzEI72VXtzf4pMsbi7DH1g

OR

### You can Create your own Custom SLACK APP and integrate that.

---
