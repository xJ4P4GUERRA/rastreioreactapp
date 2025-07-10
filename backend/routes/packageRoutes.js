const express = require('express');
const router = express.Router();

const { 
  getTrackingInfo,
  createPackage,
  addHistoryEvent,
  getAllPackages,
  deletePackage
} = require('../controllers/packageController');

const { protect } = require('../middleware/authMiddleware');

// ROTA PÚBLICA
router.get('/track/:trackingCode', getTrackingInfo);

// ROTAS DE ADMIN
router.get('/admin/packages', protect, getAllPackages);
router.post('/admin/packages', protect, createPackage);
router.put('/admin/packages/:code/update', protect, addHistoryEvent);
router.delete('/admin/packages/:id', protect, deletePackage); // Rota de exclusão

module.exports = router;