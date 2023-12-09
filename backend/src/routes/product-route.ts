import { Router } from 'express';
import * as productController from '../controllers/product-controller';

const router = Router();
productController.init();

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);

router.get('/:id', productController.getProductById);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;