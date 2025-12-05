'use client';

import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export interface UploadedImage {
  url: string;
  publicId: string;
  alt?: string;
}

interface ImageUploadProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onImagesChange, maxImages = 10 }: ImageUploadProps) {
  const [cloudinaryConfigured, setCloudinaryConfigured] = useState<boolean | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Cloudinary is properly configured
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
      console.error('[ImageUpload] Cloudinary configuration error: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
      setConfigError('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no está configurada');
      setCloudinaryConfigured(false);
    } else {
      console.log('[ImageUpload] Cloudinary configured with cloud name:', cloudName);
      console.log('[ImageUpload] Upload preset:', uploadPreset || 'ml_default (fallback)');
      setCloudinaryConfigured(true);
    }
  }, []);

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info !== 'string') {
      const newImage: UploadedImage = {
        url: result.info.secure_url,
        publicId: result.info.public_id,
        alt: '',
      };
      onImagesChange([...images, newImage]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    onImagesChange(newImages);
  };

  const handleAltChange = (index: number, alt: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], alt };
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Imágenes del producto
        </label>
        <span className="text-xs text-gray-500">
          {images.length} / {maxImages} imágenes
        </span>
      </div>

      {/* Cloudinary configuration warning */}
      {cloudinaryConfigured === false && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-yellow-800">
                Cloudinary no configurado
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                Para habilitar la subida de imágenes, configure las siguientes variables de entorno:
              </p>
              <ul className="text-xs text-yellow-600 mt-2 space-y-1 font-mono">
                <li>• NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</li>
                <li>• NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET (opcional)</li>
              </ul>
              {configError && (
                <p className="text-xs text-red-600 mt-2">
                  Error: {configError}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {cloudinaryConfigured === null && (
        <div className="w-full py-8 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-sm text-gray-400">Verificando configuración...</span>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.publicId || index}
              className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
            >
              <Image
                src={image.url}
                alt={image.alt || `Imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />

              {/* Order badge */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>

              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-1">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMoveImage(index, 'up')}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Mover arriba"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleMoveImage(index, 'down')}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Mover abajo"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alt text inputs */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Texto alternativo (opcional)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {images.map((image, index) => (
              <div key={`alt-${image.publicId || index}`} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-6">{index + 1}.</span>
                <input
                  type="text"
                  value={image.alt || ''}
                  onChange={(e) => handleAltChange(index, e.target.value)}
                  placeholder={`Descripción imagen ${index + 1}`}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button - only show when Cloudinary is configured */}
      {cloudinaryConfigured === true && images.length < maxImages && (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'}
          options={{
            multiple: true,
            maxFiles: maxImages - images.length,
            sources: ['local', 'url', 'camera'],
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            maxImageFileSize: 10000000, // 10MB
            cropping: false,
            showSkipCropButton: true,
            styles: {
              palette: {
                window: '#FFFFFF',
                windowBorder: '#90A0B3',
                tabIcon: '#0078FF',
                menuIcons: '#5A616A',
                textDark: '#000000',
                textLight: '#FFFFFF',
                link: '#0078FF',
                action: '#FF620C',
                inactiveTabIcon: '#0E2F5A',
                error: '#F44235',
                inProgress: '#0078FF',
                complete: '#20B832',
                sourceBg: '#E4EBF1',
              },
            },
          }}
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600">
                Haz clic para subir imágenes
              </span>
              <span className="text-xs text-gray-400">
                JPG, PNG, GIF o WebP (máx. 10MB)
              </span>
            </button>
          )}
        </CldUploadWidget>
      )}

      {/* Info text */}
      <p className="text-xs text-gray-500">
        La primera imagen será la imagen principal del producto. Arrastra para reordenar.
      </p>
    </div>
  );
}
