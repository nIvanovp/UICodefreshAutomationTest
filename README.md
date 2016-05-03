# UICodefreshAutomationTest

## Build
```
npm install
```

## Run
Specify credentials in the file config.json for 2 type github accounts with authorize app and without.
```
npm start
npm test
```

## Results
All results you can find in the folder target/

# New feature public builds

```
{
  "accountName":"",
  "repositories":[
    {
      "repoOwner": "",
      "repoName": "",
      "buildid":"",
      "status": 1
    }
  ]
}
```
"status" - expected status 0 or 1, 0 - there're no results, 1 - there're results

Add a some account in one of the files ./data/* and run test.
Screenshots you can see in the folder target/.