const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8085;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// PostgreSQL Configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dashboard',
    password: 'root',
    port: 5432,
});

// Function to initialize database schema
const initializeDatabase = async () => {
    try {
        await pool.query(`
            -- Users table
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );

            -- Gender Male table
            CREATE TABLE IF NOT EXISTS gendermale (
                idmale SERIAL PRIMARY KEY,
                annee INTEGER NOT NULL,
                pourcentage DECIMAL(5,2) NOT NULL
            );

            -- Gender Female table
            CREATE TABLE IF NOT EXISTS genderfemale (
                idfemale SERIAL PRIMARY KEY,
                annee INTEGER NOT NULL,
                pourcentage DECIMAL(5,2) NOT NULL
            );

            -- Domain Activity table
            CREATE TABLE IF NOT EXISTS domainactivity (
                iddomain SERIAL PRIMARY KEY,
                aspect VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL
            );

            -- Innovation table
            CREATE TABLE IF NOT EXISTS innovation (
                idinnovation SERIAL PRIMARY KEY,
                duration VARCHAR(255) NOT NULL
            );

            -- Maturite table
            CREATE TABLE IF NOT EXISTS maturite (
                idmaturite SERIAL PRIMARY KEY,
                level VARCHAR(255) NOT NULL
            );

            -- Label table
            CREATE TABLE IF NOT EXISTS label (
                idlabel SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );

            -- Revenue table
            CREATE TABLE IF NOT EXISTS revenue (
                idrevenue SERIAL PRIMARY KEY,
                amount DECIMAL(15,2) NOT NULL,
                annee INTEGER NOT NULL
            );

            -- Part Marche table
            CREATE TABLE IF NOT EXISTS partmarche (
                idpartmarche SERIAL PRIMARY KEY,
                pourcentage DECIMAL(5,2) NOT NULL,
                annee INTEGER NOT NULL
            );

            -- Funding Model table
            CREATE TABLE IF NOT EXISTS fundingmodel (
                idfunding SERIAL PRIMARY KEY,
                model VARCHAR(255) NOT NULL
            );

            -- Duree Startup table
            CREATE TABLE IF NOT EXISTS dureestartup (
                idduree SERIAL PRIMARY KEY,
                duration VARCHAR(255) NOT NULL
            );
        `);
        console.log('All tables created or already exist.');
    } catch (err) {
        console.error('Error initializing database schema:', err);
        process.exit(1);
    }
};

// Test database connection and initialize schema
const connectWithRetry = async () => {
    let retries = 5;
    while (retries > 0) {
        try {
            await pool.query('SELECT NOW()');
            console.log('Connected to PostgreSQL');
            await initializeDatabase(); // Initialize schema after successful connection
            return;
        } catch (err) {
            console.error('Failed to connect to PostgreSQL:', err);
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    console.error('Could not connect to PostgreSQL. Exiting...');
    process.exit(1);
};

// Initialize connection and schema
(async () => {
    await connectWithRetry();
})();

// Handle unexpected database errors
pool.on('error', (err) => {
    console.error('Unexpected error on PostgreSQL client:', err);
});

// Routes

// Signup Route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        console.error('Missing required fields:', { name, email, password });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        console.log('User inserted:', result.rows[0]);
        res.status(201).json({ message: 'User registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error during signup:', err);
        if (err.code === '23505') {
            res.status(409).json({ message: 'Email already exists.' });
        } else {
            res.status(500).json({ message: 'Database error.', error: err.message });
        }
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.error('Missing required fields:', { email, password });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );
        if (result.rows.length > 0) {
            console.log('User logged in:', result.rows[0].email);
            res.status(200).json({ message: 'Login successful.', user: result.rows[0] });
        } else {
            console.log('Login failed for:', email);
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Gender Male Routes
app.get('/gender-male', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gendermale');
        console.log('Gender male data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching gender male data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/gender-male', async (req, res) => {
    const { annee, pourcentage } = req.body;

    if (!annee || !pourcentage) {
        console.error('Missing required fields:', { annee, pourcentage });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO gendermale (annee, pourcentage) VALUES ($1, $2) RETURNING *',
            [annee, pourcentage]
        );
        console.log('Gender male data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting gender male data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/gender-male/:idmale', async (req, res) => {
    const { annee, pourcentage } = req.body;
    const { idmale } = req.params;

    if (!annee || !pourcentage) {
        console.error('Missing required fields:', { annee, pourcentage });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE gendermale SET annee = $1, pourcentage = $2 WHERE idmale = $3 RETURNING *',
            [annee, pourcentage, idmale]
        );
        if (result.rows.length === 0) {
            console.log('Gender male record not found:', idmale);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Gender male data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating gender male data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/gender-male/:idmale', async (req, res) => {
    const { idmale } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM gendermale WHERE idmale = $1 RETURNING *',
            [idmale]
        );
        if (result.rows.length === 0) {
            console.log('Gender male record not found:', idmale);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Gender male data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting gender male data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Gender Female Routes
app.get('/gender-female', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM genderfemale');
        console.log('Gender female data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching gender female data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/gender-female', async (req, res) => {
    const { annee, pourcentage } = req.body;

    if (!annee || !pourcentage) {
        console.error('Missing required fields:', { annee, pourcentage });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO genderfemale (annee, pourcentage) VALUES ($1, $2) RETURNING *',
            [annee, pourcentage]
        );
        console.log('Gender female data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting gender female data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/gender-female/:idfemale', async (req, res) => {
    const { annee, pourcentage } = req.body;
    const { idfemale } = req.params;

    if (!annee || !pourcentage) {
        console.error('Missing required fields:', { annee, pourcentage });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE genderfemale SET annee = $1, pourcentage = $2 WHERE idfemale = $3 RETURNING *',
            [annee, pourcentage, idfemale]
        );
        if (result.rows.length === 0) {
            console.log('Gender female record not found:', idfemale);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Gender female data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating gender female data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/gender-female/:idfemale', async (req, res) => {
    const { idfemale } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM genderfemale WHERE idfemale = $1 RETURNING *',
            [idfemale]
        );
        if (result.rows.length === 0) {
            console.log('Gender female record not found:', idfemale);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Gender female data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting gender female data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Domain Activity Routes
app.get('/domain-activity', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM domainactivity');
        console.log('Domain activity data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching domain activity data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/domain-activity', async (req, res) => {
    const { aspect, name } = req.body;

    if (!aspect || !name) {
        console.error('Missing required fields:', { aspect, name });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO domainactivity (aspect, name) VALUES ($1, $2) RETURNING *',
            [aspect, name]
        );
        console.log('Domain activity data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting domain activity data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/domain-activity/:iddomain', async (req, res) => {
    const { aspect, name } = req.body;
    const { iddomain } = req.params;

    if (!aspect || !name) {
        console.error('Missing required fields:', { aspect, name });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE domainactivity SET aspect = $1, name = $2 WHERE iddomain = $3 RETURNING *',
            [aspect, name, iddomain]
        );
        if (result.rows.length === 0) {
            console.log('Domain activity record not found:', iddomain);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Domain activity data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating domain activity data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/domain-activity/:iddomain', async (req, res) => {
    const { iddomain } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM domainactivity WHERE iddomain = $1 RETURNING *',
            [iddomain]
        );
        if (result.rows.length === 0) {
            console.log('Domain activity record not found:', iddomain);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Domain activity data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting domain activity data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Innovation Routes
app.get('/innovation', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM innovation');
        console.log('Innovation data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching innovation data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/innovation', async (req, res) => {
    const { duration } = req.body;

    if (!duration) {
        console.error('Missing required fields:', { duration });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO innovation (duration) VALUES ($1) RETURNING *',
            [duration]
        );
        console.log('Innovation data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting innovation data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/innovation/:idinnovation', async (req, res) => {
    const { duration } = req.body;
    const { idinnovation } = req.params;

    if (!duration) {
        console.error('Missing required fields:', { duration });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE innovation SET duration = $1 WHERE idinnovation = $2 RETURNING *',
            [duration, idinnovation]
        );
        if (result.rows.length === 0) {
            console.log('Innovation record not found:', idinnovation);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Innovation data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating innovation data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/innovation/:idinnovation', async (req, res) => {
    const { idinnovation } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM innovation WHERE idinnovation = $1 RETURNING *',
            [idinnovation]
        );
        if (result.rows.length === 0) {
            console.log('Innovation record not found:', idinnovation);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Innovation data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting innovation data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Maturite Routes
app.get('/maturite', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM maturite');
        console.log('Maturite data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching maturite data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/maturite', async (req, res) => {
    const { level } = req.body;

    if (!level) {
        console.error('Missing required fields:', { level });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO maturite (level) VALUES ($1) RETURNING *',
            [level]
        );
        console.log('Maturite data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting maturite data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/maturite/:idmaturite', async (req, res) => {
    const { level } = req.body;
    const { idmaturite } = req.params;

    if (!level) {
        console.error('Missing required fields:', { level });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE maturite SET level = $1 WHERE idmaturite = $2 RETURNING *',
            [level, idmaturite]
        );
        if (result.rows.length === 0) {
            console.log('Maturite record not found:', idmaturite);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Maturite data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating maturite data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/maturite/:idmaturite', async (req, res) => {
    const { idmaturite } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM maturite WHERE idmaturite = $1 RETURNING *',
            [idmaturite]
        );
        if (result.rows.length === 0) {
            console.log('Maturite record not found:', idmaturite);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Maturite data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting maturite data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Label Routes
app.get('/label', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM label');
        console.log('Label data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching label data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/label', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        console.error('Missing required fields:', { name });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO label (name) VALUES ($1) RETURNING *',
            [name]
        );
        console.log('Label data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting label data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/label/:idlabel', async (req, res) => {
    const { name } = req.body;
    const { idlabel } = req.params;

    if (!name) {
        console.error('Missing required fields:', { name });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE label SET name = $1 WHERE idlabel = $2 RETURNING *',
            [name, idlabel]
        );
        if (result.rows.length === 0) {
            console.log('Label record not found:', idlabel);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Label data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating label data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/label/:idlabel', async (req, res) => {
    const { idlabel } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM label WHERE idlabel = $1 RETURNING *',
            [idlabel]
        );
        if (result.rows.length === 0) {
            console.log('Label record not found:', idlabel);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Label data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting label data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Revenue Routes
app.get('/revenue', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM revenue');
        console.log('Revenue data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching revenue data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/revenue', async (req, res) => {
    const { amount, annee } = req.body;

    if (!amount || !annee) {
        console.error('Missing required fields:', { amount, annee });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO revenue (amount, annee) VALUES ($1, $2) RETURNING *',
            [amount, annee]
        );
        console.log('Revenue data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting revenue data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/revenue/:idrevenue', async (req, res) => {
    const { amount, annee } = req.body;
    const { idrevenue } = req.params;

    if (!amount || !annee) {
        console.error('Missing required fields:', { amount, annee });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE revenue SET amount = $1, annee = $2 WHERE idrevenue = $3 RETURNING *',
            [amount, annee, idrevenue]
        );
        if (result.rows.length === 0) {
            console.log('Revenue record not found:', idrevenue);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Revenue data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating revenue data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/revenue/:idrevenue', async (req, res) => {
    const { idrevenue } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM revenue WHERE idrevenue = $1 RETURNING *',
            [idrevenue]
        );
        if (result.rows.length === 0) {
            console.log('Revenue record not found:', idrevenue);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Revenue data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting revenue data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Part Marche Routes
app.get('/partmarche', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM partmarche');
        console.log('Partmarche data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching partmarche data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/partmarche', async (req, res) => {
    const { pourcentage, annee } = req.body;

    if (!pourcentage || !annee) {
        console.error('Missing required fields:', { pourcentage, annee });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO partmarche (pourcentage, annee) VALUES ($1, $2) RETURNING *',
            [pourcentage, annee]
        );
        console.log('Partmarche data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting partmarche data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/partmarche/:idpartmarche', async (req, res) => {
    const { pourcentage, annee } = req.body;
    const { idpartmarche } = req.params;

    if (!pourcentage || !annee) {
        console.error('Missing required fields:', { pourcentage, annee });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE partmarche SET pourcentage = $1, annee = $2 WHERE idpartmarche = $3 RETURNING *',
            [pourcentage, annee, idpartmarche]
        );
        if (result.rows.length === 0) {
            console.log('Partmarche record not found:', idpartmarche);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Partmarche data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating partmarche data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/partmarche/:idpartmarche', async (req, res) => {
    const { idpartmarche } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM partmarche WHERE idpartmarche = $1 RETURNING *',
            [idpartmarche]
        );
        if (result.rows.length === 0) {
            console.log('Partmarche record not found:', idpartmarche);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Partmarche data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting partmarche data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Funding Model Routes
app.get('/fundingmodel', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM fundingmodel');
        console.log('Fundingmodel data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching fundingmodel data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/fundingmodel', async (req, res) => {
    const { model } = req.body;

    if (!model) {
        console.error('Missing required fields:', { model });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO fundingmodel (model) VALUES ($1) RETURNING *',
            [model]
        );
        console.log('Fundingmodel data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting fundingmodel data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/fundingmodel/:idfunding', async (req, res) => {
    const { model } = req.body;
    const { idfunding } = req.params;

    if (!model) {
        console.error('Missing required fields:', { model });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE fundingmodel SET model = $1 WHERE idfunding = $2 RETURNING *',
            [model, idfunding]
        );
        if (result.rows.length === 0) {
            console.log('Fundingmodel record not found:', idfunding);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Fundingmodel data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating fundingmodel data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/fundingmodel/:idfunding', async (req, res) => {
    const { idfunding } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM fundingmodel WHERE idfunding = $1 RETURNING *',
            [idfunding]
        );
        if (result.rows.length === 0) {
            console.log('Fundingmodel record not found:', idfunding);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Fundingmodel data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting fundingmodel data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Duree Startup Routes
app.get('/dureestartup', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dureestartup');
        console.log('Dureestartup data fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching dureestartup data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.post('/dureestartup', async (req, res) => {
    const { duration } = req.body;

    if (!duration) {
        console.error('Missing required fields:', { duration });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO dureestartup (duration) VALUES ($1) RETURNING *',
            [duration]
        );
        console.log('Dureestartup data inserted:', result.rows[0]);
        res.status(201).json({ message: 'Registered successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error inserting dureestartup data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.put('/dureestartup/:idduree', async (req, res) => {
    const { duration } = req.body;
    const { idduree } = req.params;

    if (!duration) {
        console.error('Missing required fields:', { duration });
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await pool.query(
            'UPDATE dureestartup SET duration = $1 WHERE idduree = $2 RETURNING *',
            [duration, idduree]
        );
        if (result.rows.length === 0) {
            console.log('Dureestartup record not found:', idduree);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Dureestartup data updated:', result.rows[0]);
        res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error updating dureestartup data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

app.delete('/dureestartup/:idduree', async (req, res) => {
    const { idduree } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM dureestartup WHERE idduree = $1 RETURNING *',
            [idduree]
        );
        if (result.rows.length === 0) {
            console.log('Dureestartup record not found:', idduree);
            return res.status(404).json({ message: 'Record not found.' });
        }
        console.log('Dureestartup data deleted:', result.rows[0]);
        res.status(200).json({ message: 'Deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error('Error deleting dureestartup data:', err);
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await pool.end();
    console.log('PostgreSQL pool closed.');
    process.exit(0);
});