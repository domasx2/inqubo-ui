# Inqubo-UI

Monitoring web app for Inqubo. Monitor running workflows, trigger new ones.

## run dev server
```bash
npm i
npm run dev
```

And open http://localhost:3000/

## run prod mode

```bash
npm i
npm build
PORT=80 AMQP_URI=amqp://myrabbitmq npm start
```
