import fs from 'fs';
import path from 'path';
import { Product } from '../models/i-product';
import { Request, Response } from 'express';

const productsFilePath = path.resolve(__dirname, '..', '..', '..', 'front', 'src', 'assets', 'products.json');

let productsData: Array<Product> = [];

function findProductByID(id: number) {
  return productsData.find(product => product.id === id);
}

export function init() {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    productsData = JSON.parse(data).data;
  } catch (error) {
    console.error('Error', error);
  }
}

export function getAllProducts(req: Request, res: Response) {
  res.json(productsData);
}

export function addProduct(req: Request, res: Response) {
  const newProduct = req.body;
  const isDuplicatedProduct = findProductByID(req.body.id);
  if (isDuplicatedProduct) {
    return res.status(404).json({ error: 'A product with the same ID already exists' });
  }
  productsData.push(newProduct as unknown as Product);
  fs.writeFileSync(productsFilePath, JSON.stringify({ data: productsData }, null, 2));
  res.json(newProduct);
}

export function getProductById(req: Request, res: Response) {
  const productId = parseInt(req.params.id);
  const product = findProductByID(productId);
  if (!product) {
    return res.status(404).json({ error_404: 'Product not found' });
  }
  res.json(product);
}

export function updateProduct(req: Request, res: Response) {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const indexToUpdate = productsData.findIndex(product => product.id === productId);

  if (indexToUpdate === -1) {
    return res.status(404).json({ error_404: 'Product not found' });
  }

  productsData[indexToUpdate] = { ...productsData[indexToUpdate], ...updatedProduct };
  fs.writeFileSync(productsFilePath, JSON.stringify({ data: productsData }, null, 2));
  res.json(productsData);
}

export function deleteProduct(req: Request, res: Response) {
  const productId = parseInt(req.params.id);
  if (!findProductByID(productId)) {
    return res.status(404).json({ error_404: 'Product not found' });
  }

  productsData = productsData.filter(product => product.id !== productId);
  fs.writeFileSync(productsFilePath, JSON.stringify({ data: productsData }, null, 2));
  res.json({ success: 'Product deleted' });
}
