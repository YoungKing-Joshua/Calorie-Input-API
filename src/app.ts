import express from 'express';


const app = express();
const port = 4000;

app.use();

app.get("/");

app.get("/users/login");

app.get("/users/signup");

app.listen(port, async () => {
    console.log(`Go to port: ${port} to view project`);
});

export default app;