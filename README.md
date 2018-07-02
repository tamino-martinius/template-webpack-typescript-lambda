# Webpack Template for Lambda using TypeScript

This is a Webpack Template for creating AWS Lambda functions with TypeScript.

## TOC

- [Webpack Template for Lambda using TypeScript](#webpack-template-for-lambda-using-typescript)
  - [TOC](#toc)
  - [Initialize your project](#initialize-your-project)
  - [Install SAM CLI](#install-sam-cli)
  - [Add your code](#add-your-code)
  - [Scripts](#scripts)
    - [Build](#build)
    - [Production Build](#production-build)
    - [Watch](#watch)
    - [Create CloudFormation Stack](#create-cloudformation-stack)
    - [Update CloudFormation Stack](#update-cloudformation-stack)
    - [Delete CloudFormation Stack](#delete-cloudformation-stack)
    - [Update Lambda function](#update-lambda-function)
    - [Local Test Invocation](#local-test-invocation)
  - [Modify CloudFormation Stack](#modify-cloudformation-stack)

## Initialize your project

Copy this Repository by using the GitHub [Import Repository](https://github.com/new/import) or just [download the source](https://github.com/tamino-martinius/template-webpack-typescript-lambda/archive/master.zip).

Go to the folder and install dependencies:

```sh
npm install
# or
yarn
```

## Install SAM CLI

To run your Lambda function locally you need to have [AWS SAM CLI](https://github.com/awslabs/aws-sam-cli) installed

```sh
pip install --user aws-sam-cli
```

Please verify that the `sam` command is working

*Please note:*

If you get the Error `ImportError: No module named ssl_match_hostname` while starting sam, please run:

```sh
pip uninstall backports.ssl-match-hostname
pip install -U docker
```

## Add your code

The main handler is expected to be the default export of the `src/index.ts` file. With `node 8.10` you can use an `async` function as default export. With `node 4.3.2` you need to return a callback with the default handler.

Node 8:

```ts
export default async (event: any, context: AWSLambda.Context) => {
  return 'Hello World';
};
```

Node 4:

```ts
export default (event: any, context: AWSLambda.Context, cb: AWSLambda.Callback) => {
  return 'Hello World';
};
```

The `event` can also be typed with `AWSLambda.APIGatewayEvent` or others - depending on your Lambda invocation.

## Scripts

### Build

```sh
npm run build
```

Builds the code and saves it to the `dist` folder.

### Production Build

```sh
npm run build:production
```

Builds and minifies the code and saves it to the `dist` folder.

### Watch

```sh
npm run watch
```

Listens to code changes and builds the code and saves it to the `dist` folder every time it detects changes.

### Create CloudFormation Stack

```sh
npm run cf:create
```

Creates Lambda function with an CloufFormation Stack based on the `package.json` settings and the CloudFormation Template build at the `scripts/env.ts` file.

### Update CloudFormation Stack

```sh
npm run cf:update
```

Updates the CloudFormation Stack based on the `package.json` settings and the CloudFormation Template build at the `scripts/env.ts` file. This creates an ChangeSet and applies it immediately.

### Delete CloudFormation Stack

```sh
npm run cf:delete
```

Deletes the CloudFormation Stack. To prevent errors on rollback the S3 Bucket will get cleared first.

### Update Lambda function

```sh
npm run lambda:update
```

Compiles the code with production settings and uploads the new code as zip file to Lambda. Code will be applied immediately.

### Local Test Invocation

```sh
npm run sam:invoke
```

RunsLambda function locally with payload defined in `scripts/samInvoke.ts` This will be changed.

## Modify CloudFormation Stack

The CloudFormation Template is build at `scripts/env.ts`. This will be changed in the future.
