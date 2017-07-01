const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ampq = require('amqplib');

app.use(express.static('./'));
app.use(express.static('dist'));

console.log(`node env ${process.env.NODE_ENV}`)

app.get('*', (req, res) => {
  const index = process.env.NODE_ENV === 'development' ? `${__dirname}/src/index.html` : `${__dirname}/dist/index.html`;
  console.log(`serving ${index}`);
  res.sendFile(index);
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('app listening on', port);
});

const workflows = {};
const event_log = [];
const max_event_log_size=100;

io.on('connection', socket => {
    console.log('new connection')
    // replay workflow descriptions and latest events
    Object.keys(workflows).forEach(workflow_id => socket.emit('workflow', workflows[workflow_id]))
    event_log.forEach(event => socket.emit('workflow_event', event))
});

function onWorkflowEvent(msg) {
    const body = JSON.parse(msg.content.toString('utf-8'))
    const [step, name] = msg.fields.routingKey.split('.')
    const event = {
        workflow: msg.properties.headers['workflow_id'],
        instance: msg.properties.headers['workflow_instance_key'],
        timestamp: msg.properties.timestamp,
        step: step,
        name: name,
        meta: body.meta,
        payload: body.payload
    }
    event_log.push(event)
    if (event_log.length > max_event_log_size) event_log.shift()

    console.log(`got event ${event.workflow}.${event.step}.${event.name}`)
    io.sockets.emit('workflow_event', event)
}

// discover workflows and susbcribe
async function rabbits() {
    const EXCHANGE = 'inqubo_meta'
    const conn = await ampq.connect('amqp://guest:guest@localhost');
    const channel = await conn.createChannel()
    await channel.assertExchange('inqubo_meta', 'direct')
    const queue = (await channel.assertQueue('', {autoDelete: true})).queue;
    console.log('queue is ' + queue)
    await channel.bindQueue(queue, EXCHANGE, 'workflow_meta')
    channel.consume(queue, msg => {
        channel.ack(msg);
        const payload = JSON.parse(msg.content.toString('utf-8'))
        const workflow_id = payload.workflow_id;
        console.log(`got workflow [${workflow_id}] description`)
        io.sockets.emit('workflow', payload)
        if (!workflows[workflow_id]) {
            workflows[workflow_id] = payload;
            console.log(`listening to exchange ${workflow_id}`)
            channel.assertQueue('', {autoDelete: true})
                .then(({name}) => {
                    console.log(`created queue ${name} for listening to ${workflow_id}`)
                    return channel.bindQueue(name, workflow_id, '#').then(() => name)
                })
                .then(name => {
                    channel.consume(name, onWorkflowEvent)
                })
        }
    })
    channel.publish(EXCHANGE, 'workflow_meta_request', new Buffer(''))
}

rabbits().then(() => console.log('ampq connected'))