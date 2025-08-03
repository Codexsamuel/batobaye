'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export default function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    if (images.length + files.length > maxImages) {
      alert(`Vous ne pouvez pas ajouter plus de ${maxImages} images`)
      return
    }

    setIsUploading(true)

    try {
      const newImages: string[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Simuler l'upload vers un service comme Cloudinary
        // En production, vous devriez utiliser un vrai service d'upload
        const imageUrl = await simulateImageUpload(file)
        newImages.push(imageUrl)
      }

      onImagesChange([...images, ...newImages])
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error)
      alert('Erreur lors de l\'upload des images')
    } finally {
      setIsUploading(false)
    }
  }

  const simulateImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        // Simuler une URL d'image (en production, ce serait une vraie URL)
        const imageUrl = reader.result as string
        resolve(imageUrl)
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const setMainImage = (index: number) => {
    if (index === 0) return // Déjà l'image principale
    
    const newImages = [...images]
    const mainImage = newImages[0]
    newImages[0] = newImages[index]
    newImages[index] = mainImage
    
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <Label>Images du produit</Label>
      
      {/* Zone d'upload */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <CardContent className="p-6">
          <div className="text-center">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Glissez-déposez vos images ici ou cliquez pour sélectionner
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Formats acceptés: JPG, PNG, WEBP (max {maxImages} images)
            </p>
            <Button type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || images.length >= maxImages}
            >
              {isUploading ? 'Upload en cours...' : 'Sélectionner des images'}
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Images uploadées */}
      {images.length > 0 && (
        <div className="space-y-3">
          <Label>Images sélectionnées ({images.length}/{maxImages})</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                            Principal
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  {index !== 0 && (
                    <Button onClick={() => setMainImage(index)}
                      className="text-xs"
                    >
                      Principal
                    </Button>
                  )}
                  <Button onClick={() => removeImage(index)}
                    className="text-xs"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• La première image sera l'image principale du produit</p>
        <p>• Cliquez sur "Principal" pour changer l'image principale</p>
        <p>• Utilisez des images de haute qualité (minimum 800x600px)</p>
      </div>
    </div>
  )
} 