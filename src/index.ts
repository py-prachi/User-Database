
console.log("Hello!");
import { Request, Response, NextFunction } from 'express';
import express, { Router } from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from './entity/User';
import { AppRoutes } from './routes';


AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");}).catch((err) => {
    console.error("Error during Data Source initialization", err);});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// AppRoutes.forEach(route => {
    
//     const { method, route: path, controller, action } = route;
//     app[method](path, (request: Request, response: Response, next: Function) => {
//         route.action(request, response)
//             .then(() => next)
//             .catch((err: any) => next(err));
//     });
// });

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
app.listen(port,() => console.log(`Listening on port ${port}..`));

// app.post('/api/users',(req,res)=>{
//     //joi can be used for validation
//     const users = {
//         first_name: req.body.firstName,
//         last_name: req.body.lastName,
//         age: req.body.age
//     };
//     console.log(req.body);
    // books.push(book);
    // res.send(book);
// });





// app.get('/', (req,res) =>{
//     res.send('Hello World!!! ');
// });


// const books = [
//     {book_id:1, book_name: 'Automic Habits', author: 'James Clear'},
//     {book_id:2, book_name: 'The Secret', author: 'Rhonda Brynes'},
//     {book_id:3, book_name: 'Harry Potter and the Chamber of Secrets', author: 'J K Rowling'}
// ];



// app.get('/api/books',(req, res)=>{
//     res.send(books);
// });

// app.get('/api/books/:book_id', (req,res) => {
//     let id = parseInt(req.params.book_id)
//     //res.send(`This handler has received the value ${req.params.book_id} for ID`);
//     let book = books.find(c => c.book_id === id);
//     if (!book) res.status(404).send(`The book with id ${id} is NOT found`);
//     res.send(book);
// })

// app.post('/api/books',(req,res)=>{
//     //joi can be used for validation
//     // if ((!req.body.book_name) || (req.body.book_name.length < 3) )
//     //     res.status(400).send(`Book name NOT provided or less than 3 charactes `)
//     //     return;
//     const book = {
//         book_id: books.length + 1,
//         book_name: req.body.book_name,
//         author: req.body.author
//     };
//     books.push(book);
//     res.send(book);
// });

// app.put('/api/books/:book_id',(req,res)=>{
//     let id = parseInt(req.params.book_id);
//     const book = books.find(c => c.book_id === id);
//     if (!book) res.status(404).send(`The book with id ${id} is NOT found`);

    
//     book.book_name = req.body.book_name,
//     book.author = req.body.author
    
//     res.send(book);

// });

// app.delete('/api/books/:book_id', (req,res)=>{
//     let id = parseInt(req.params.book_id);
//     const book = books.find(c => c.book_id === id);
//     if (!book) res.status(404).send(`The book with id ${id} is NOT found`);

//     const index = books.indexOf(book);
//     console.log(index);
//     books.splice(index,1);
//     res.send(book);

// });



