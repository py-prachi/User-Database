
console.log("Hello!");
import { Request, Response, NextFunction } from 'express';
import express, { Router } from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from './entity/User';
import { AppRoutes } from './routes';



const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


(async () => {
  await AppDataSource.initialize();
  console.log('Created DB connection');
})();

// Register routes
AppRoutes.forEach((route) => {
    const { method, route: path, controller, action } = route;
    
    // Dynamically create route handlers
    app[method](path, async (req: Request, res: Response) => {
      try {
        const result = await new controller()[action](req, res);
        if (result !== null && result !== undefined) {
          res.json(result);
        }
      } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: 'An internal server error occurred.' });
      }
    });
  });



//need to use an environment variable for the port
//this is done using a process obj
const port = process.env.PORT || 8080

app.listen(port,async() => {
  
  console.log(`Listening on port ${port}..`);
});

export {app};