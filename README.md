# Drivr

Welcome to Drivr, a Flickr clone built for people to post car pictures. 

Live link to the site: https://drivr-io.herokuapp.com/

Drivr currently has CRUD features for Images and Albums. Access to the site is restricted to logged in users, 
so feel free to browse through the site's functionality using the Demo-User account, which has full privileges.

Take a look at the full Wiki for more details surrounding the features list and databse schema:
https://github.com/robstrass/Drivr/wiki

Tech Stack Utilized:

* Javascript
* node.js
* PostgreSQL
* Sequelize
* Express
* React
* Redux

To clone the repo locally:
1. `git clone https://github.com/robstrass/Drivr`.
2. CD into both `/frontend` and `/backend` and `npm install` in both.
3. Create a .env file using .env.example file in `/backend`.
4. Setup a database and user in PostgreSQL using the information you made in the .env file.
5. Create your database by running `npx dotenv sequelize db:create` from `/backend`.
6. Migrate your database by running `npx dotenv sequelize db:migrate`.
7. Seed your database by running `npx dotenv sequelize db:seed:all`.

To start your servers, run `npm start` from both `/frontend` and `/backend`. 
