const app = require('./app');

const port = Number(process.env.APP_PORT || 3000);

app.listen(port, () => {
  console.log(`bankqa-hermessonyuri-portfolio running on port ${port}`);
});
