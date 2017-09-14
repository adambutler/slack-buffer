# slack-buffer

## Description

Add content into your buffer queue from Slack

## Setup

```
$ git clone https://github.com/adambutler/slack-buffer.git
$ cd slack-buffer
$ yarn install
$ cp config.json.example config.json
```

Edit `config.json` to add your Slack token, Buffer Profile IDs & Buffer Access Token

**Configure AWS Credentials**

Create a file at `~/.aws/credentials` with your AWS credentials:

```
[slack-buffer]
aws_access_key_id = abc123
aws_secret_access_key = abc123
```

## Deploy

```
$ yarn deploy
```

## Apply config & push code to Lambda

```
$ yarn upload
```

This will give you a response containing the Lambda URL. You configure that as your [slash command](https://bristoljs.slack.com/apps/A0F82E8CA-slash-commands) in Slack.

## Contributing

Contributions are welcome, please follow [GitHub Flow](https://guides.github.com/introduction/flow/index.html)
