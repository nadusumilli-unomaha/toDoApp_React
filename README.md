# to do App
Project holding the source of a simple to do app.

## Backend instructions
* You can build the backend server with `docker-compose build` command
* You can start the backend server with `docker-compose up` command

### Setting up the database tables and admin
To actually store data in the backend server you would need tables to be migrate to the database.
To migrate the tables and create an admin user run the following commands.
```bash
docker-compose run web bash
python manage.py migrate
python manage.py createsuperuser
```
After runnning the commands you will have the database setup and can start using the app as an admin.

### App information
* You can access the app at [To Do App](http://localhost). 
* You can access the api endpoints at [To Do App API](http://localhost/api/)
  * All data can be access once the user has permissions to authenticate
* You can access the admin dashboard at [To Do Admin](http://localhost/admin/)
  * You can create users from the admin dashboard that can access the app.

## Frontend instruction
To work on the frontend you should run the following commands.
* Use `npm install` to install all the dependencies.
* Use `npm start` to run the server.
* Use `npm run build` to compile the code to a backend server.
* All the changes from the frontend are automatically bundled to the backend.
