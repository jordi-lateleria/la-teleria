'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayoutWrapper from '../../../components/AdminLayoutWrapper';
import ImageUpload, { UploadedImage } from '../../../components/ImageUpload';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  order: number;
}

interface Product {
  id: string;
  name: string;
  shortDescription: string | null;
  description: string;
  price: number;
  salePrice: number | null;
  stock: number;
  active: boolean;
  categoryId: string | null;
  category: Category | null;
  images: ProductImage[];
}

export default function EditarProductoPage() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    price: '',
    salePrice: '',
    categoryId: '',
    stock: '0',
    active: true,
  });

  useEffect(() => {
    if (productId) {
      fetchCategories();
      fetchProduct();
    }
  }, [productId]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categorias');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/productos/${productId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Producto no encontrado');
        }
        throw new Error('Error al cargar producto');
      }
      const product: Product = await response.json();

      setFormData({
        name: product.name || '',
        shortDescription: product.shortDescription || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        salePrice: product.salePrice?.toString() || '',
        categoryId: product.categoryId || '',
        stock: product.stock?.toString() || '0',
        active: product.active ?? true,
      });

      // Load existing images
      if (product.images && product.images.length > 0) {
        setImages(product.images.map((img) => ({
          url: img.url,
          publicId: img.id, // Use id as publicId for existing images
          alt: img.alt || '',
        })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldError(null);

    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      setFieldError('name');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('El precio debe ser mayor que 0');
      setFieldError('price');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/productos/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          shortDescription: formData.shortDescription.trim(),
          description: formData.description.trim(),
          price: formData.price,
          salePrice: formData.salePrice || null,
          categoryId: formData.categoryId || null,
          stock: formData.stock,
          active: formData.active,
          images: images.map((img, index) => ({
            url: img.url,
            alt: img.alt || null,
            order: index,
          })),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMsg = data.error || 'Error al actualizar producto';
        const errorDetails = data.details ? ` (${data.details})` : '';
        if (data.field) {
          setFieldError(data.field);
        }
        throw new Error(errorMsg + errorDetails);
      }

      router.push('/admin/productos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/productos/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      router.push('/admin/productos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      setDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayoutWrapper>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayoutWrapper>
    );
  }

  return (
    <AdminLayoutWrapper>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/productos"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a productos
        </Link>
        <h1 className="text-2xl lg:text-3xl font-light text-gray-900">Editar Producto</h1>
        <p className="text-gray-500 mt-1">Modifica los datos del producto</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                fieldError === 'name' ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ej: Cojin de lino natural"
              required
            />
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Descripcion corta
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="Breve descripcion del producto"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripcion larga
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
              placeholder="Descripcion detallada del producto"
            />
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={10}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Precio (EUR) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                fieldError === 'price' ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="0.00"
              required
            />
          </div>

          {/* Sale Price */}
          <div>
            <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-2">
              Precio oferta (EUR)
            </label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="Dejar vacio si no hay oferta"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${
                fieldError === 'categoryId' ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="0"
            />
          </div>

          {/* Active */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-400"
              />
              <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-700">
                Producto activo
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">Los productos inactivos no se muestran en la tienda</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            type="button"
            onClick={() => setDeleteConfirm(true)}
            className="px-6 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Eliminar producto
          </button>

          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <Link
              href="/admin/productos"
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                'Guardar cambios'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Eliminar producto</h3>
            <p className="text-gray-500 mb-6">
              ¿Estas seguro de que quieres eliminar este producto? Esta accion no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayoutWrapper>
  );
}
