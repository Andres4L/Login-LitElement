const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router('db.json');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Ruta personalizada para autenticación
server.post('/auth', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username, password }).value();

  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});

  