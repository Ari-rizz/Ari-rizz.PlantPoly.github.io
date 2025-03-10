// server.js (eller index.js, avhengig av hva du kaller filen)
import express from 'express';
import multer from 'multer';
import mysql from 'mysql2/promise';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Last inn miljøvariabler
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 📌 Hent alle innlegg
app.get('/posts', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(
      rows.map((post) => ({
        ...post,
        contentBlocks: post.contentBlocks
          ? JSON.parse(post.contentBlocks)
          : [],
      }))
    );
  } catch (error) {
    console.error('❌ Feil ved henting av innlegg:', error);
    res.status(500).json({ error: 'Kunne ikke hente innlegg' });
  }
});

// 📌 Last opp bilder
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Ingen filer ble lastet opp' });
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// 📌 Opprett et nytt innlegg
app.post('/posts', async (req, res) => {
  let { title, contentBlocks } = req.body;
  contentBlocks = contentBlocks ? JSON.stringify(contentBlocks) : '[]';

  if (!title) {
    return res.status(400).json({ error: 'Tittel er påkrevd' });
  }

  try {
    await db.execute(
      'INSERT INTO posts (title, contentBlocks) VALUES (?, ?)',
      [title, contentBlocks]
    );
    res.json({ message: 'Innlegg lagret' });
  } catch (error) {
    console.error('❌ Feil ved lagring av innlegg:', error);
    res.status(500).json({ error: 'Kunne ikke lagre innlegg' });
  }
});

// 📌 Oppdater et innlegg
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  let { title, contentBlocks } = req.body;
  contentBlocks = contentBlocks ? JSON.stringify(contentBlocks) : '[]';

  try {
    await db.execute(
      'UPDATE posts SET title = ?, contentBlocks = ? WHERE id = ?',
      [title, contentBlocks, id]
    );
    res.json({ message: 'Innlegg oppdatert' });
  } catch (error) {
    console.error('❌ Feil ved oppdatering av innlegg:', error);
    res.status(500).json({ error: 'Kunne ikke oppdatere innlegg' });
  }
});

// 📌 Slett et innlegg
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM posts WHERE id = ?', [id]);
    res.json({ message: 'Innlegg slettet' });
  } catch (error) {
    console.error('❌ Feil ved sletting av innlegg:', error);
    res.status(500).json({ error: 'Kunne ikke slette innlegg' });
  }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      
      console.log("Bruker hentet fra DB:", rows);
      
      if (rows.length === 0) {
        console.log("Ingen bruker funnet for", username);
        return res.status(401).json({ error: 'Ugyldig brukernavn eller passord' });
      }
    
      const user = rows[0];
    
      if (password === user.password) {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        console.log("Innlogging vellykket, token opprettet");
        return res.json({ token });
      } else {
        console.log("Passordet stemmer ikke");
        return res.status(401).json({ error: 'Ugyldig brukernavn eller passord' });
      }
    } catch (error) {
      console.error('❌ Feil ved innlogging:', error);
      res.status(500).json({ error: 'Feil ved innlogging' });
    }
  });
  


// 📌 Start serveren
app.listen(port, () => {
  console.log(`🚀 Server kjører på port ${port}`);
});
