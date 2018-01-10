# aws-comprehend socket

This socket integrates Amazon Comprehend to syncano.

### Install

```
syncano-cli add aws-comprehend
```

### Socket Documentation
[Link to aws-comprehend socket documentation](https://syncano.io/#/sockets/aws-comprehend)

## Endpoints
#### batch-detect-dominant-language
This endpoint determines the dominant language of the input text for a batch of documents.

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| TextList      | array   | List containing the text of the input documents | ['Hello Syncano', 'Bonjour mademoiselle']

*_Response_*

```
{
  "ErrorList": [
    {
      "ErrorCode": "string",
      "ErrorMessage": "string",
      "Index": number
    }
  ],
  "ResultList": [
    {
      "Index": number,
      "Languages": [
        {
          "LanguageCode": "string",
          "Score": number
        }
      ]
    }
  ]
}
```

#### batch-detect-entities
This endpoint inspects the text of a batch of documents for named entities and returns information about them

*_Parameters_*


| Name          | Type    | Description  | Example
| ------------- |---------| ------------| ---------
| LanguageCode  | string  | Language of the input documents        | en
| TextList      | array   | List containing the text of the input documents | ['Hello Syncano', 'Bonjour mademoiselle']

*_Response_*

```
{
  "ErrorList": [
    {
      "ErrorCode": "string",
      "ErrorMessage": "string",
      "Index": number
    }
  ],
  "ResultList": [
    {
      "Index": number,
      "Entities": [
        {
          "BeginOffset": number,
          "EndOffset": number,
          "Score": number,
          "Text": "string",
          "Type": "string"
        }
      ]
    }
  ]
}
```

#### batch-detect-key-phrases
Endpoint detects the key noun phrases found in a batch of documents

*_Parameters_*


| Name          | Type      | Description  | Example
| ------------- |-----------| ------------| ---------
| LanguageCode  | string  | Language of the input documents        | en
| TextList      | array   | List containing the text of the input documents | ['Hello Syncano', 'Bonjour mademoiselle']

*_Response_*

```
{
  "ErrorList": [
    {
      "ErrorCode": "string",
      "ErrorMessage": "string",
      "Index": number
    }
  ],
  "ResultList": [
    {
      "Index": number,
      "KeyPhrases": [
        {
          "BeginOffset": number,
          "EndOffset": number,
          "Score": number,
          "Text": "string"
        }
      ]
    }
  ]
}
```

#### batch-detect-sentiment
Endpoint inspects a batch of documents and returns an inference of the prevailing sentiment, POSITIVE, NEUTRAL, MIXED, NEGATIVE for each document

*_Parameters_*


| Name          | Type      | Description  | Example
| ------------- |-----------| ------------| ---------
| LanguageCode  | string  | Language of the input documents        | en
| TextList      | array   | List containing the text of the input documents | ['Hello Syncano', 'Bonjour mademoiselle']

*_Response_*

```
{
  "ErrorList": [
    {
      "ErrorCode": "string",
      "ErrorMessage": "string",
      "Index": number
    }
  ],
  "ResultList": [
    {
      "Index": number,
      "Sentiment": string,
      "SentimentScore": [
        {
          "Mixed": number,
          "Negative": number,
          "Neutral": number,
          "Positive": number
        }
      ]
    }
  ]
}
```

#### describe-topics-detection-job
This endpoint gets the properties associated with a topic detection job. Use this operation to get the status of a detection job.

*_Parameters_*


| Name          | Type      | Description  | Example
| ------------- |-----------| ------------| ---------
| JobId      | string    | The identifier assigned by the user to the detection job | 1234

*Response*

```
{
  "TopicsDetectionJobProperties": {
    "EndTime": number,
    "InputDataConfig": {
      "InputFormat": "string",
      "S3Uri": "string"
    },
    "JobId": "string",
    "JobName": "string",
    "JobStatus": "string",
    "Message": "string",
    "NumberOfTopics": number,
    "OutputDataConfig": {
      "S3Uri": "string"
    },
    "SubmitTime": number
  }
}
```

#### detect-dominant-language
This endpoint determines the dominant language of the input text.

*_Parameters_*

| Name      | Type     | Description  | Example
| ----------|---------| ------------| ---------
| Text      | string   | A UTF-8 text string to detect dominant language | Bonjour monsieur Emmanuel

*_Response_*

```
{
  "Languages": [
    {
      "LanguageCode": "string",
      "Score": number
    }
  ]
}
```

#### detect-entities
This endpoint inspects text for named entities, and returns information about them.

*_Parameters_*

| Name      | Type     | Description  | Example
| ----------|---------| ------------| ---------
| Text      | string   | A UTF-8 text string to detect entities | Bonjour monsieur Emmanuel
| LanguageCode  | string  | Language of the input document  | en

*_Response_*

```
{
  "Entities": [
    {
      "BeginOffset": number,
      "EndOffset": number,
      "Score": number,
      "Text": "string",
      "Type": "string"
    }
  ]
}
```

#### detect-key-phrases
This endpoint detects the key noun phrases found in the text.

*_Parameters_*

| Name      | Type     | Description  | Example
| ----------|---------| ------------| ---------
| Text      | string   | A UTF-8 text string to detect key phrases | Bonjour monsieur Emmanuel
| LanguageCode  | string  | Language of the input document  | en

*_Response_*

```
{
  "KeyPhrases": [
    {
      "BeginOffset": number,
      "EndOffset": number,
      "Score": number,
      "Text": "string"
    }
  ]
}
```

#### detect-sentiment
This endpoint inspects text and returns an inference of the prevailing sentiment, POSITIVE, NEUTRAL, MIXED, or NEGATIVE.

*_Parameters_*

| Name      | Type     | Description  | Example
| ----------|---------| ------------| ---------
| Text      | string   | A UTF-8 text string to detect sentiment | Bonjour monsieur Emmanuel
| LanguageCode  | string  | Language of the input document  | en

*_Response_*

```
{
  "Sentiment": "string",
  "SentimentScore": {
    "Mixed": number,
    "Negative": number,
    "Neutral": number,
    "Positive": number
  }
}
```

#### list-topics-detection-jobs
Endpoint gets a list of the topic detection jobs that you have submitted

*_Parameters_*

| Name      | Type     | Description  | Example
| ----------|---------| ------------| ---------
| Filter      | object   | Identifies the next page of results to return | ``` { "jobName": "STRING_VALUE", "JobStatus": COMPLETED, "SubmitTimeAfter": 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)',"SubmitTimeBefore": 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)'}```
| MaxResults  | integer   | The maximum number of results to return in each page | 10
| NextToken   | string   | Identifies the next page of results to return | 12345
| LanguageCode | string  | Language of the input document  | en

*_Response_*

```
{
  "NextToken": "string",
  "TopicsDetectionJobPropertiesList": [
    {
      "EndTime": number,
      "InputDataConfig": {
        "InputFormat": "string",
        "S3Uri": "string"
      },
      "JobId": "string",
      "JobName": "string",
      "JobStatus": "string",
      "Message": "string",
      "NumberOfTopics": number,
      "OutputDataConfig": {
        "S3Uri": "string"
      },
      "SubmitTime": number
    }
  ]
}
```

#### start-topics-detection-job
Endpoint starts an asynchronous topic detection job
*_Parameters_*

| Name      | Type     | Description  | Example
| ----------|---------| ------------| ---------
| JobName  | string   | The identifier of the job | sample-job
| DataAccessRoleArn  | string   | The IAM Amazon Resource Name (ARN) | AmazonComprehendServiceRole-comprehend-role
| InputDataConfig      | object   | Identifies the next page of results to return | ``` { "S3Uri": "STRING_VALUE", "InputFormat": ONE_DOC_PER_FILE}```
| OutputDataConfig      | object   | Identifies the next page of results to return | ``` { "S3Uri": "STRING_VALUE"}```
| ClientRequestToken   | string   | A unique identifier for the request | sample-token
| NumberOfTopics  | integer   | The number of topics to detect | 10
| LanguageCode | string  | Language of the input document  | en

*_Response_*

```
{
  "JobId": "string",
  "JobStatus": "string"
}
```
