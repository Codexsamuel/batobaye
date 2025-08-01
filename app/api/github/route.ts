import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_PAT || ''
const GITHUB_REPO = 'Codexsamuel/batobaye'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    
    if (!path) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 })
    }

    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'File not found or access denied' }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, content, message, sha } = body

    if (!path || !content || !message) {
      return NextResponse.json({ error: 'Path, content, and message are required' }, { status: 400 })
    }

    const updateData: any = {
      message,
      content: Buffer.from(content).toString('base64'),
    }

    if (sha) {
      updateData.sha = sha
    }

    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.message || 'Failed to update file' }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...params } = body

    switch (action) {
      case 'get-file':
        return await GET(request)
      
      case 'update-file':
        return await PUT(request)
      
      case 'create-branch':
        const { branchName, baseBranch = 'main' } = params
        
        // D'abord, récupérer le SHA de la branche de base
        const baseResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/branches/${baseBranch}`, {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        })
        
        if (!baseResponse.ok) {
          return NextResponse.json({ error: 'Base branch not found' }, { status: 404 })
        }
        
        const baseData = await baseResponse.json()
        
        // Créer la nouvelle branche
        const branchResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/refs`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ref: `refs/heads/${branchName}`,
            sha: baseData.commit.sha
          })
        })
        
        if (!branchResponse.ok) {
          const errorData = await branchResponse.json()
          return NextResponse.json({ error: errorData.message || 'Failed to create branch' }, { status: branchResponse.status })
        }
        
        const branchData = await branchResponse.json()
        return NextResponse.json(branchData)
      
      case 'create-pull-request':
        const { title, body, headBranch, baseBranch: prBaseBranch = 'main' } = params
        
        const prResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/pulls`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            body,
            head: headBranch,
            base: prBaseBranch
          })
        })
        
        if (!prResponse.ok) {
          const errorData = await prResponse.json()
          return NextResponse.json({ error: errorData.message || 'Failed to create pull request' }, { status: prResponse.status })
        }
        
        const prData = await prResponse.json()
        return NextResponse.json(prData)
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 