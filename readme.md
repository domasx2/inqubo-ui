# Inqubo-UI

Monitoring web app for [Inqubo](https://github.com/domasx2/inqubo). Monitor running workflows, trigger new ones.

## run dev server
```bash
npm i
npm run dev
```

And open http://localhost:3000/

## run prod mode

```bash
npm i
npm i -g pm2
npm build
PORT=80 AMQP_URI=amqp://myrabbitmq npm start
```
