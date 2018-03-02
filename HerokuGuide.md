# Deploying a Node Web Server to Heroku

This guide walks through the necessary steps to deploy your full stack Node.js application to Heroku!

### Prerequisites

To begin with, you'll need a git repository initialized locally with your basic web server code working and committed.

1. You should already have your repo created on GitHub and cloned to your computer.

2. Commit all changes.

3. Make sure you have a `.gitignore` file.  Make sure you don't push your `node_modules` folder to Heroku!!

### Steps to Deploy

1. Log in to Heroku.
   * If you are a windows user open Git Bash and type `heroku login`. Then, open Git Bash and navigate to the folder with your code.

   * If you are a mac open terminal and type the command `heroku login`. Enter your Heroku credentials and proceed with all the below steps in terminal. Navigate to the folder with your code.

2. Run the command: `git remote –v` .
   * This is to show you that right now, you do not have heroku listed as a remote repository.

3. Run the command `heroku create`.
   * This will create an app instance on the Heroku server and will add heroku as a remote for your local git repository.  

4. Run `git remote –v` again.
   * This isn't necessary, but helps to confirm that Heroku is now in your list of remotes. This time you should see the `heroku` remote.

5. Ensure that your `package.json` file is set up correctly. It must have a `start` script and all dependencies defined. E.g.:
   ```json
   {
     "name": "starwars",
     "version": "1.0.0",
     "description": "Helps you find the characters you are looking for",
     "main": "server.js",
     "dependencies": {
       "body-parser": "^1.15.0",
       "express": "^4.13.4"
     },
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

6. Ensure your web server is starting with a dynamic port.
   * For an express app, the code for this would look like:
   ```js
   var port = process.env.PORT || 3000;
   ...
   app.listen(port, function() {
   ```
   * This allows you to get the port from the bound environment variable (using `process.env.PORT`) if it exists, so that when your app starts on heroku's machine it will start listening on the appropriate port.
   * You app will still run on port 3000 locally if you haven't set an environment variable.

7. Commit any changes you've made up until this point using `git commit -am "<message>"`.  Using -am will both add and do your commit message.

8. Run the command `git push heroku master`. A series of processes will be initiated. Once the process is complete note the name of the app.

9. Log in to your Heroku account at www.heroku.com . You will see a list or a (single) app. Note the one that has the same funky name as you saw in bash. Click on it.

10. Click on settings. Then, scroll down until you see the part that says: "Domains". Note the URL listed under Heroku Domain.

11. Finally, go in your browser to the URL listed under the Heroku Domain. If all went well you should see your website!