import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { environment = 'production', branch = 'main' } = body

    const deployHook = process.env.VERCEL_DEPLOY_HOOK
    const apiToken = process.env.VERCEL_API_TOKEN

    if (!deployHook) {
      return NextResponse.json(
        { error: 'Vercel deploy hook non configuré' },
        { status: 500 }
      )
    }

    // Appel au hook de déploiement Vercel
    const response = await fetch(deployHook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        environment,
        branch,
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Erreur Vercel:', errorData)
      return NextResponse.json(
        { error: 'Erreur lors du déclenchement du déploiement Vercel' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Log du déploiement
    console.log(`🚀 Déploiement Vercel déclenché:`, {
      environment,
      branch,
      timestamp: new Date().toISOString(),
      response: data
    })

    return NextResponse.json({
      success: true,
      message: 'Déploiement déclenché avec succès',
      data: data,
      environment,
      branch,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Erreur API déploiement:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const apiToken = process.env.VERCEL_API_TOKEN
    const projectId = 'prj_ecD3ym3TM6rd1GPnOGUGg3D02K6u'

    if (!apiToken) {
      return NextResponse.json(
        { error: 'Token Vercel non configuré' },
        { status: 500 }
      )
    }

    // Récupérer les informations du projet
    const projectResponse = await fetch(`https://api.vercel.com/v1/projects/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      }
    })

    if (!projectResponse.ok) {
      return NextResponse.json(
        { error: 'Impossible de récupérer les informations du projet' },
        { status: projectResponse.status }
      )
    }

    const projectData = await projectResponse.json()

    // Récupérer les derniers déploiements
    const deploymentsResponse = await fetch(`https://api.vercel.com/v1/projects/${projectId}/deployments?limit=5`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      }
    })

    let deployments = []
    if (deploymentsResponse.ok) {
      const deploymentsData = await deploymentsResponse.json()
      deployments = deploymentsData.deployments || []
    }

    return NextResponse.json({
      project: projectData,
      recentDeployments: deployments,
      deployHook: process.env.VERCEL_DEPLOY_HOOK ? 'Configuré' : 'Non configuré'
    })

  } catch (error) {
    console.error('Erreur récupération infos Vercel:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des informations Vercel' },
      { status: 500 }
    )
  }
} 