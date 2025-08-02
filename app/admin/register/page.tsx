'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Shield, User, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin' as 'admin' | 'super_admin'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [debug, setDebug] = useState('')
  
  const { register } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setDebug(`Champ ${name} modifié: ${value}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setDebug('Soumission du formulaire...')

    console.log('🔄 Début de l\'inscription...')
    console.log('📋 Données du formulaire:', formData)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = 'Les mots de passe ne correspondent pas'
      setError(errorMsg)
      setDebug(errorMsg)
      setLoading(false)
      console.log('❌ Erreur de validation:', errorMsg)
      return
    }

    if (formData.password.length < 6) {
      const errorMsg = 'Le mot de passe doit contenir au moins 6 caractères'
      setError(errorMsg)
      setDebug(errorMsg)
      setLoading(false)
      console.log('❌ Erreur de validation:', errorMsg)
      return
    }

    try {
      console.log('📞 Appel de la fonction register...')
      setDebug('Appel de la fonction register...')
      
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
      
      console.log('📤 Résultat de l\'inscription:', result)
      setDebug(`Résultat reçu: ${JSON.stringify(result)}`)
      
      if (result.success) {
        const successMsg = 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
        setSuccess(successMsg)
        setDebug(successMsg)
        console.log('✅ Inscription réussie')
        
        setTimeout(() => {
          console.log('🔄 Redirection vers /admin/login...')
          router.push('/admin/login')
        }, 2000)
      } else {
        const errorMsg = result.error || 'Erreur lors de l\'inscription'
        setError(errorMsg)
        setDebug(errorMsg)
        console.log('❌ Erreur d\'inscription:', errorMsg)
      }
    } catch (error) {
      const errorMsg = 'Erreur lors de l\'inscription: ' + (error as Error).message
      setError(errorMsg)
      setDebug(errorMsg)
      console.log('❌ Exception lors de l\'inscription:', error)
    } finally {
      setLoading(false)
      console.log('🏁 Fin du processus d\'inscription')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              INSCRIPTION ADMIN
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Créez votre compte administrateur
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Debug info */}
            {debug && (
              <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                <AlertDescription>
                  <strong>Debug:</strong> {debug}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Inscription...
                </>
              ) : (
                'S\'inscrire'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link
              href="/admin/login"
              className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Déjà un compte ? Se connecter
            </Link>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Informations</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p>• Mot de passe minimum 6 caractères</p>
              <p>• Rôle Admin : Accès limité</p>
              <p>• Rôle Super Admin : Accès complet</p>
            </div>
          </div>

          {/* Test button */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Test</h4>
            <Button
              onClick={() => {
                console.log('🧪 Test de la fonction register...')
                setDebug('Test de la fonction register...')
                register({
                  name: 'Test User',
                  email: 'test@example.com',
                  password: 'password123',
                  role: 'admin'
                }).then(result => {
                  console.log('📤 Résultat du test:', result)
                  setDebug(`Test réussi: ${JSON.stringify(result)}`)
                }).catch(error => {
                  console.log('❌ Erreur du test:', error)
                  setDebug(`Test échoué: ${error.message}`)
                })
              }}
              variant="outline"
              className="w-full"
            >
              Tester l'inscription
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 