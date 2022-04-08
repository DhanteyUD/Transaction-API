# week-7-task-node010

### Requirements

1. Your are required to use `TypeScript` for the task and build the APIs (endpoints) with `express`
2. Use and setup the project with `Yarn`
3. Install docker on your Mac <a href="https://desktop.docker.com/mac/stable/Docker.dmg">Download</a>
4. Create a docker Registry on <a href="https://hub.docker.com/signup">Create Account</a>
5. Containerize your application with Docker and push to your docker repository.
6. Validate all input coming into your api endpoints to ensure they have the required properties and data types

## Problem Description:

Imagine you are asked to develop a transfer service with APIs to transfer money between two accounts
You application is expected to have the following database structure

- TABLE 1 - transactions

  - reference (unique)
  - senderAccount nr
  - amount
  - receiverAccount nr
  - transferDescription
  - createdAt

- TABLE 2 - balances
  - account nr (unique)
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

- Make sure you write test to cover your application using supertest

## Hosting

- Host your application on Heroku

https://week-7-node-010-dhanteyud.herokuapp.com/
