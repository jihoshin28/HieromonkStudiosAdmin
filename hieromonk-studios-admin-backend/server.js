require('dotenv').config();
console.log(process.env.DATABASE_URL)
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
const getPaginationParams = (req) => {
  const start = parseInt(req.query._start) || 0;
  const end = parseInt(req.query._end) || 10;
  const sortField = req.query._sort || 'id';
  const sortOrder = req.query._order === 'DESC' ? 'desc' : 'asc';
  
  return {
    skip: start,
    take: end - start,
    orderBy: { [sortField]: sortOrder }
  };
};

const setContentRange = (res, resourceName, start, end, total) => {
  res.set('Content-Range', `${resourceName} ${start}-${end}/${total}`);
  res.set('Access-Control-Expose-Headers', 'Content-Range');
};

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hieromonk Studios Admin API',
    version: '1.0.0',
    status: 'running'
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// CONTACTS
app.get('/api/contacts', async (req, res) => {
  try {
    const { skip, take, orderBy } = getPaginationParams(req);
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({ skip, take, orderBy }),
      prisma.contact.count()
    ]);
    setContentRange(res, 'contacts', skip, skip + take - 1, total);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { contracts: true }
    });
    if (!contact) return res.status(404).json({ error: 'Not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const contact = await prisma.contact.create({ data: req.body });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id, createdAt, updatedAt, contracts, ...data } = req.body;
        
    const contact = await prisma.contact.update({
      where: { id: parseInt(req.params.id) },
      data
    });
    
    console.log('✅ Update successful');
    res.json(contact);
  } catch (error) {
    console.error('❌ Error updating contact:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await prisma.contact.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CONTRACTS
app.get('/api/contracts', async (req, res) => {
  try {
    const { skip, take, orderBy } = getPaginationParams(req);
    const [contracts, total] = await Promise.all([
      prisma.contract.findMany({
        skip, take, orderBy,
        include: { contact: { select: { id: true, name: true } } }
      }),
      prisma.contract.count()
    ]);
    setContentRange(res, 'contracts', skip, skip + take - 1, total);
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contracts/:id', async (req, res) => {
  try {
    const contract = await prisma.contract.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { contact: true, projects: true }
    });
    if (!contract) return res.status(404).json({ error: 'Not found' });
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contracts', async (req, res) => {
  try {
    const data = {
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate)
    };
    const contract = await prisma.contract.create({ data });
    res.status(201).json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/contracts/:id', async (req, res) => {
  try {
    const {id, createdAt, updatedAt, contact, projects, ...bodyData } = req.body;
    const data = {...bodyData}
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);
    const contract = await prisma.contract.update({
      where: { id: parseInt(req.params.id) },
      data
    });
    console.log('✅ Update successful');
    res.json(contract);
  } catch (error) {
    console.error('❌ Error updating contact:', error);
  }
});

app.delete('/api/contracts/:id', async (req, res) => {
  try {
    await prisma.contract.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PROJECTS
app.get('/api/projects', async (req, res) => {
  try {
    const { skip, take, orderBy } = getPaginationParams(req);
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip, take, orderBy,
        include: { contract: { select: { id: true, title: true } } }
      }),
      prisma.project.count()
    ]);
    setContentRange(res, 'projects', skip, skip + take - 1, total);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { contract: true, tasks: true }
    });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const data = {
      ...req.body,
      dueDate: new Date(req.body.dueDate)
    };
    const project = await prisma.project.create({ data });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const {id, createdAt, updatedAt, contract, tasks, ...bodyData} = req.body;
    const data = { ...bodyData }
    if (data.dueDate) data.dueDate = new Date(data.dueDate);
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data
    });
    console.log('✅ Update successful');
    res.json(project);
  } catch (error) {
    console.error('❌ Error updating contact:', error);
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TASKS
app.get('/api/tasks', async (req, res) => {
  try {
    const { skip, take, orderBy } = getPaginationParams(req);
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        skip, take, orderBy,
        include: { project: { select: { id: true, name: true } } }
      }),
      prisma.task.count()
    ]);
    setContentRange(res, 'tasks', skip, skip + take - 1, total);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { project: true }
    });
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.dueDate) data.dueDate = new Date(data.dueDate);
    const task = await prisma.task.create({ data });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id, createdAt, updatedAt, project, ...bodyData} = req.body;
    const data = { ...bodyData }
    if (data.dueDate) data.dueDate = new Date(data.dueDate);
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data
    });
    console.log('✅ Update successful');
    res.json(task);
  } catch (error) {
    console.error('❌ Error updating contact:', error);
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
