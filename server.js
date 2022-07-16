const express = require('express');
const session = require('express-session');
const exhbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const hbs = exhbs.create({})
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers')

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
    secret: 'Super Secret Secret',
    cookie: {
        maxAge: 43200
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
      }),
};

//adding
//app.use(routes);
//app.use('/', routes)

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`The server has started on http://localhost:${PORT}`))
})


// adfas
