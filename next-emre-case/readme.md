# PREPTEST FRONTEND TECHNICAL TEST

This is a technical test for frontend developer position at PREPTEST.
You are expected to create a simple web application that is similar to below FIGMA DESIGN:

You can add more features or alter the design a little bit as you see fit. The design is just a reference. But core features must be the same.
You can use icons from [Material Design Icons](https://materialdesignicons.com/).

## [OPEN FIGMA FILE](https://www.figma.com/file/dwq7prfTwjVvfSuhQOAYI9/PREPTEST-TECHNICAL-TEST?type=design&node-id=0-1&mode=design&t=syNOb5ioV3QCjkf5-0)

## Table of Contents

<!-- TOC -->

- [REQUIREMENTS](#requirements)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
    - [VSCode Extensions](#vscode-extensions)
  - [Installing](#installing)
  - [Running](#running)
- [Built With](#built-with)
- [Testing](#testing)
  - [How to write test](#how-to-write-test)
    - [Unit Test](#unit-test)
    - [E2E (End to End) Test - RECOMMENDED](#e2e-end-to-end-test---recommended)

<!-- /TOC -->

## REQUIREMENTS

- Use this repository as a template to start your project.
- MUI (Material UI) as a UI framework.
- ReactJS with hooks. (No class component)
- Use React Composition Pattern to create reusable components.
- It is extra to create unit test and e2e test. (You can use Jest, React Testing Library, and Cypress) **E2E test is recommended but not required**. You can ask for support and more information about this if you need.
- After completion, you should send the link to your repository to us via email.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you start, make sure you have installed the following software on your computer:

- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download)

#### VSCode Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Installing

1. First, [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repository into your GitHub account.

2. Then, clone this repository into your computer:

```bash
git clone https://github.com/[GITHUB_USER_NAME]/preptest-frontend-technical-test
```

3. Then, install yarn v1.22.10 globally (if you don't have it already):

```bash
npm install --global yarn@1.22.10
```

4. Then, install all dependencies:

```bash
yarn
```

### Running

To run this project, run the following command:

```bash
yarn dev
```

## Built With

- [NextJS](https://nextjs.org/) - The React Framework for Production
- [Material UI](https://material-ui.com/) - React components for faster and easier web development

## Testing

- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Simple and complete React DOM testing utilities that encourage good testing practices
- [Cypress](https://www.cypress.io/) - Fast, easy and reliable testing for anything that runs in a browser

### How to write test

#### Unit Test

Unit test is written using **Jest** and **React Testing Library**. To write unit test, create a file with the same name as the file you want to test, but with `.test.ts` or `.test.tsx` extension. For example, if you want to test `src/components/HelloWorld.tsx`, create a file named `src/components/HelloWorld.test.tsx`.

#### E2E (End to End) Test - RECOMMENDED

E2E test is written using **Cypress**. To write E2E test, create the files with the same folder structure in **cypress** folder at the root of the project. For example, if you want to test `src/pages/index.tsx`, create a file named `cypress/e2e/pages/index.cy.ts`.
