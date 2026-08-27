import express from 'express';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'rohan_portfolio_cms_secret_key_2026_secure';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Paths
const DB_FILE = path.join(__dirname, 'data', 'db.json');
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

// DB Helpers
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return null;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB:', err);
    return null;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

// Authentication Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired authentication token' });
  }
}

// Multer Storage Configuration for Image & PDF File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e4)}`;
    cb(null, `${sanitizedBase}_${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.pdf', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${ext}. Allowed: ${allowedExtensions.join(', ')}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// ========================
// API ROUTES
// ========================

// 1. Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, error: 'Password is required' });
  }

  // Check password against environment variable
  if (password.trim() === ADMIN_PASSWORD.trim()) {
    const token = jwt.sign(
      { role: 'admin', user: 'rohan' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      expiresIn: '24h',
      message: 'Authentication successful. Admin session initialized.',
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Access Denied: Invalid administrator passcode',
  });
});

// 2. Token Verification Endpoint
app.get('/api/auth/verify', authMiddleware, (req, res) => {
  return res.json({ success: true, user: req.user });
});

// 3. Public GET Content Endpoint
app.get('/api/content', (req, res) => {
  const data = readDb();
  if (!data) {
    return res.status(500).json({ success: false, error: 'Database record unavailable' });
  }
  return res.json({ success: true, data });
});

// 4. Protected PUT Full / Partial Content Endpoint
app.put('/api/content', authMiddleware, (req, res) => {
  const newContent = req.body;
  if (!newContent || typeof newContent !== 'object') {
    return res.status(400).json({ success: false, error: 'Invalid content payload' });
  }

  const currentData = readDb() || {};
  const updatedData = {
    ...currentData,
    ...newContent,
    lastModified: new Date().toISOString(),
  };

  const ok = writeDb(updatedData);
  if (!ok) {
    return res.status(500).json({ success: false, error: 'Failed to write to database' });
  }

  return res.json({
    success: true,
    message: 'Portfolio content updated and published successfully',
    data: updatedData,
  });
});

// 5. Projects Specific Endpoints
app.post('/api/projects', authMiddleware, (req, res) => {
  const project = req.body;
  if (!project.title || !project.description) {
    return res.status(400).json({ success: false, error: 'Project title and description are required' });
  }

  const db = readDb();
  const id = project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newProject = {
    ...project,
    id: id || `project-${Date.now()}`,
    tech: Array.isArray(project.tech) ? project.tech : [],
    highlights: Array.isArray(project.highlights) ? project.highlights : [],
  };

  db.projects = [newProject, ...(db.projects || [])];
  writeDb(db);

  return res.status(201).json({ success: true, project: newProject });
});

app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const db = readDb();

  const idx = (db.projects || []).findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  db.projects[idx] = { ...db.projects[idx], ...updates };
  writeDb(db);

  return res.json({ success: true, project: db.projects[idx] });
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = readDb();

  const initialLen = (db.projects || []).length;
  db.projects = (db.projects || []).filter(p => p.id !== id);

  if (db.projects.length === initialLen) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  writeDb(db);
  return res.json({ success: true, message: `Project ${id} deleted successfully` });
});

// 5b. Certifications Specific Endpoints
app.post('/api/certifications', authMiddleware, (req, res) => {
  const cert = req.body;
  if (!cert.title || !cert.issuer) {
    return res.status(400).json({ success: false, error: 'Certificate title and issuer are required' });
  }

  const db = readDb();
  const id = cert.id || cert.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newCert = {
    ...cert,
    id: id || `cert-${Date.now()}`,
  };

  db.certifications = [newCert, ...(db.certifications || [])];
  writeDb(db);

  return res.status(201).json({ success: true, certificate: newCert });
});

app.put('/api/certifications/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const db = readDb();

  const idx = (db.certifications || []).findIndex(c => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Certificate not found' });
  }

  db.certifications[idx] = { ...db.certifications[idx], ...updates };
  writeDb(db);

  return res.json({ success: true, certificate: db.certifications[idx] });
});

app.delete('/api/certifications/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = readDb();

  const initialLen = (db.certifications || []).length;
  db.certifications = (db.certifications || []).filter(c => c.id !== id);

  if (db.certifications.length === initialLen) {
    return res.status(404).json({ success: false, error: 'Certificate not found' });
  }

  writeDb(db);
  return res.json({ success: true, message: `Certificate ${id} deleted successfully` });
});

// 6. File & Image Upload Endpoint
app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded or invalid file type' });
  }

  const fileUrl = `uploads/${req.file.filename}`;
  return res.json({
    success: true,
    message: 'File uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[PORTFOLIO CMS SERVER] Running on http://localhost:${PORT}`);
});
