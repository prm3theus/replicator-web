# @prm3theus /replicator-web

Replicate data structures easily using hyperswarm-`web`

## Install

```js
npm install git+https://git@github.com/prm3theus/replicator-web
```

## Usage

You data structure has to support a .replicate() stream, then you can replicate
them using the hyperswarm replicator.

```js
const replicate = require('@hyperswarm/replicator')

const swarm = replicate(aHypercore, {
  live: true, // passed to .replicate
  ws: 'ws://localhost:4977' // use with `hyperswarm-web`
})

// swarm is a hyperswarm instance that replicates the passed in instance
```

## API

#### `swarm = replicate(dataStructure, [options])`

Options include

```js
{
  live: bool, // passed to .replicate
  upload: bool, // passed to .replicate
  download: bool, // passed to .replicate
  encrypt: bool, // passed to .replicate
  discoveryKey: <buf>, // optionally set your own discovery key
  announce: true, // should the swarm announce you?
  lookup: true, // should the swarm do lookups for you?
  keyPair: { publicKey, secretKey }, // noise keypair used for the connection
  onauthenticate (remotePublicKey, done) // the onauthenticate hook to verify remote key pairs
}
```

## License

MIT
