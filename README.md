# Consumer Driven Contract Testing in Reactlandia

To spin up the broker:
```
$ cd broker && rackup config.ru -o 127.0.0.1
```

To generate and publish the `consumer-a` pacts:
```
$ cd consumer-a && npm install && npm run test:pact && npm run test:pact:publish
```

To generate and publish the `consumer-b` pacts:
```
$ cd consumer-b && npm install && npm run test:pact && npm run test:pact:publish
```

To verify that all the latest consumer pacts are honoured by the `provider`:
```
$ cd provider && npm install && npm run test:pact
```
