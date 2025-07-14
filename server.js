import { create } from 'domain';
import express from 'express';
import Path from "path"
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename)

app.use(express.json());

let posts = [
    {
        id: 1,
        title: "My first Post",
        content: 'lorem ipsum alll',
        author: "Henry O.",
        createdAt: new Date()

    }
];

// Display Views
app.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname, 'public/index.html'));
})

// POST & GET posts
app.post('/api/posts', (req, res) => {
    const {id, title, author} = req.body;

    if (!id || !title || !author) {
        return res.status(400).json({error: 'Credentials not sufficient'});
    }

    const createPosts = {
        id: posts.length + 1,
        title,
        content,
        author,
        createdAt: new Date() 
    };

    posts.push(createPosts);
    res.status(201).json(createPosts)
});

app.get('/api/posts', (req, res) => {
    res.json(posts)
});

app.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) return res.status(404).json({error: 'Post Not Found'})
    res.json(post)
});

app.listen(PORT, () => {
    console.log(`This App running on port ${PORT}`);
})

// let db;
// function launchDB() {
//     const connect = window.indexedDB.open("blogpostDB", 1);
//     connect.onsuccess = (e) => {
//         db = connect.result;
//         console.log("Database connected successfully");
//     }
// }
// const conectRequest = window.indexedDB.open("blogpostDB", 1);

// launchDB();