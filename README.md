# Transaction API

### Requirements

1. `TypeScript` used for the task and, and APIs (endpoints) built with `express`
2. Project use and setup with `Yarn`
3. Install docker on your Mac <a href="https://desktop.docker.com/mac/stable/Docker.dmg">Download Docker</a>
4. Create a docker Registry on <a href="https://hub.docker.com/signup">Create Account</a>
5. Containerize your application with Docker and push to your docker repository.
6. Input coming into api endpoints are validated to ensure they have the required properties and data types

## Problem Description:

Imagine you are asked to develop a transfer service with APIs to transfer money between two accounts
You application is expected to have the following database structure

- TABLE 1 - transactions

  - reference (unique)
  - senderAccount number
  - amount
  - receiverAccount number
  - transferDescription
  - createdAt

- TABLE 2 - balances
  - account number (unique)
  - balance
  - createdAt

The transaction table registers any transaction in an account (ie. today I paid N2000 for a movie with my card), the balances table represents the account balance of customers (ie. I have N50k in my bank account). If a sender is trying to make a transaction of an amount of money more than his current balance, an error should be returned indicating insufficient funds

The API you are to develop should be able to handle a transfer request of the form below and updates the transactions/balances table accordingly.

```
{
    from: account,
    to: account,
    amount: money
}
```

### Endpoints to test

| Method | Endpoint                | Enable a user to:                                            |
| :----- | :---------------------- | :----------------------------------------------------------- |
| POST   | /create-account         | Enable user to create an account stored in the balance table |
| GET    | /balance/:accountNumber | Getting balance for a particular account number              |
| GET    | /balance                | Getting all accounts and their balance                       |
| POST   | /transfer               | To make a transaction to another account                     |

## Test coverage

- Test written using supertest

## Hosting

- Application hosted on Heroku
```
https://week-7-node-010-dhanteyud.herokuapp.com/
```
