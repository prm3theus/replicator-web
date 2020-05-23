const hyperswarm = require('hyperswarm-web')
const pump = require('pump')

module.exports = replicator

function replicator (r, opts) {
  if (!opts) opts = {}

  const swarm = hyperswarm({
    wsProxy: !!opts.wsProxy,
    announceLocalAddress: !!opts.announceLocalAddress
  })

  swarm.on('connection', function (connection, info) {
    const stream = r.replicate({
      initiator: info.client,
      live: opts.live,
      upload: opts.upload,
      download: opts.download,
      encrypt: opts.encrypt,
      keyPair: opts.keyPair,
      onauthenticate: opts.onauthenticate
    })

    pump(connection, stream, connection)
    if (opts.onstream) opts.onstream(stream, info)
  })

  if (typeof r.ready === 'function') r.ready(onready)
  else onready(null)

  return swarm

  function onready (err) {
    if (swarm.destroyed) return
    if (err) return swarm.destroy(err)

    swarm.join(opts.discoveryKey || r.discoveryKey, {
      announce: opts.announce !== false,
      lookup: opts.lookup !== false
    })
  }
}
