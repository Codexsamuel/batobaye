'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  FileText,
  BookOpen,
  BarChart3,
  Download,
  Plus,
  Eye,
  Settings,
  Calendar,
  Receipt,
  CreditCard,
  Banknote
} from 'lucide-react'
import { 
  calculateTaxes, 
  calculateRevenue,
  formatFCFA,
  validateAccountingEntry
} from '@/lib/sage-calculations'

interface AccountingEntry {
  id: number
  date: Date
  reference: string
  description: string
  debits: Array<{ account: string; amount: number }>
  credits: Array<{ account: string; amount: number }>
  totalDebits: number
  totalCredits: number
  isValid: boolean
}

interface JournalEntry {
  id: number
  date: Date
  journal: string
  reference: string
  description: string
  amount: number
  type: 'debit' | 'credit'
  account: string
}

export default function SageAccountingDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [accountingData, setAccountingData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    tvaCollected: 0,
    tvaPaid: 0,
    tvaBalance: 0,
    accountsReceivable: 0,
    accountsPayable: 0,
    cashBalance: 0
  })

  const [recentEntries, setRecentEntries] = useState<AccountingEntry[]>([])
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])

  // Simuler des données comptables
  useEffect(() => {
    // Données simulées pour la démonstration
    const mockData = {
      totalRevenue: 15487000,
      totalExpenses: 9875000,
      netProfit: 5612000,
      tvaCollected: 2980000,
      tvaPaid: 1900000,
      tvaBalance: 1080000,
      accountsReceivable: 3450000,
      accountsPayable: 2100000,
      cashBalance: 8765000
    }

    setAccountingData(mockData)

    // Entrées comptables récentes
    const mockEntries: AccountingEntry[] = [
      {
        id: 1,
        date: new Date('2024-01-15'),
        reference: 'FACT-2024-001',
        description: 'Vente réfrigérateur Samsung',
        debits: [{ account: '512 - Banque', amount: 450000 }],
        credits: [{ account: '701 - Ventes de marchandises', amount: 377400 }, { account: '4457 - TVA collectée', amount: 72600 }],
        totalDebits: 450000,
        totalCredits: 450000,
        isValid: true
      },
      {
        id: 2,
        date: new Date('2024-01-14'),
        reference: 'ACH-2024-001',
        description: 'Achat stock fournisseur',
        debits: [{ account: '607 - Achats de marchandises', amount: 320000 }, { account: '4456 - TVA déductible', amount: 61600 }],
        credits: [{ account: '401 - Fournisseurs', amount: 381600 }],
        totalDebits: 381600,
        totalCredits: 381600,
        isValid: true
      }
    ]

    setRecentEntries(mockEntries)

    // Entrées de journal
    const mockJournal: JournalEntry[] = [
      {
        id: 1,
        date: new Date('2024-01-15'),
        journal: 'Ventes',
        reference: 'FACT-2024-001',
        description: 'Vente réfrigérateur Samsung',
        amount: 450000,
        type: 'credit',
        account: '701 - Ventes de marchandises'
      },
      {
        id: 2,
        date: new Date('2024-01-15'),
        journal: 'Ventes',
        reference: 'FACT-2024-001',
        description: 'TVA collectée',
        amount: 72600,
        type: 'credit',
        account: '4457 - TVA collectée'
      },
      {
        id: 3,
        date: new Date('2024-01-15'),
        journal: 'Ventes',
        reference: 'FACT-2024-001',
        description: 'Encaissement banque',
        amount: 450000,
        type: 'debit',
        account: '512 - Banque'
      }
    ]

    setJournalEntries(mockJournal)
  }, [])

  const getProfitColor = (amount: number) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getBalanceColor = (amount: number) => {
    return amount >= 0 ? 'text-blue-600' : 'text-orange-600'
  }

  const exportToExcel = () => {
    // Simulation d'export Excel
    alert('Export Excel en cours...')
  }

  const generateReport = (type: 'balance' | 'income' | 'tva') => {
    // Simulation de génération de rapport
    alert(`Génération du rapport ${type} en cours...`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tableau de Bord Comptable SAGE</h2>
          <p className="text-gray-600">Gestion comptable complète inspirée de SAGE SAARI</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportToExcel} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="balance">Bilan</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Comptables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatFCFA(accountingData.totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12.5% par rapport au mois dernier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bénéfice Net</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getProfitColor(accountingData.netProfit)}`}>
                  {formatFCFA(accountingData.netProfit)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Marge: {((accountingData.netProfit / accountingData.totalRevenue) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Solde TVA</CardTitle>
                <Calculator className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getBalanceColor(accountingData.tvaBalance)}`}>
                  {formatFCFA(accountingData.tvaBalance)}
                </div>
                <p className="text-xs text-muted-foreground">
                  TVA collectée: {formatFCFA(accountingData.tvaCollected)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Détails comptables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="w-5 h-5 mr-2" />
                  Comptes Clients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Créances clients:</span>
                  <span className="font-semibold">{formatFCFA(accountingData.accountsReceivable)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dettes fournisseurs:</span>
                  <span className="font-semibold">{formatFCFA(accountingData.accountsPayable)}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm font-semibold">Solde net:</span>
                  <span className={`font-bold ${getBalanceColor(accountingData.accountsReceivable - accountingData.accountsPayable)}`}>
                    {formatFCFA(accountingData.accountsReceivable - accountingData.accountsPayable)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Banknote className="w-5 h-5 mr-2" />
                  Trésorerie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Solde banque:</span>
                  <span className="font-semibold">{formatFCFA(accountingData.cashBalance)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dépenses du mois:</span>
                  <span className="font-semibold text-red-600">{formatFCFA(accountingData.totalExpenses)}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm font-semibold">Flux net:</span>
                  <span className={`font-bold ${getProfitColor(accountingData.totalRevenue - accountingData.totalExpenses)}`}>
                    {formatFCFA(accountingData.totalRevenue - accountingData.totalExpenses)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Entrées comptables récentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Entrées Comptables Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Débits</TableHead>
                    <TableHead>Crédits</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date.toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{formatFCFA(entry.totalDebits)}</TableCell>
                      <TableCell>{formatFCFA(entry.totalCredits)}</TableCell>
                      <TableCell>
                        <Badge variant={entry.isValid ? "default" : "destructive"}>
                          {entry.isValid ? "Validé" : "Erreur"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Journal Comptable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Journal</TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Compte</TableHead>
                    <TableHead>Libellé</TableHead>
                    <TableHead>Débit</TableHead>
                    <TableHead>Crédit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journalEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date.toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{entry.journal}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell>{entry.account}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>
                        {entry.type === 'debit' ? formatFCFA(entry.amount) : '-'}
                      </TableCell>
                      <TableCell>
                        {entry.type === 'credit' ? formatFCFA(entry.amount) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bilan simplifié */}
            <Card>
              <CardHeader>
                <CardTitle>Actif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Trésorerie</span>
                  <span className="font-semibold">{formatFCFA(accountingData.cashBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Créances clients</span>
                  <span className="font-semibold">{formatFCFA(accountingData.accountsReceivable)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total Actif</span>
                  <span className="font-bold">{formatFCFA(accountingData.cashBalance + accountingData.accountsReceivable)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Passif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Dettes fournisseurs</span>
                  <span className="font-semibold">{formatFCFA(accountingData.accountsPayable)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">TVA à payer</span>
                  <span className="font-semibold">{formatFCFA(accountingData.tvaBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Capitaux propres</span>
                  <span className="font-semibold">{formatFCFA(accountingData.netProfit)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total Passif</span>
                  <span className="font-bold">{formatFCFA(accountingData.accountsPayable + accountingData.tvaBalance + accountingData.netProfit)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Rapport de Bilan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Générer le rapport de bilan OHADA
                </p>
                <Button onClick={() => generateReport('balance')} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Générer Bilan
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Compte de Résultat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Rapport des produits et charges
                </p>
                <Button onClick={() => generateReport('income')} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Générer Résultat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Déclaration TVA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Rapport TVA pour le fisc
                </p>
                <Button onClick={() => generateReport('tva')} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Générer TVA
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 