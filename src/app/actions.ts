'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/options'
import clientPromise from '../lib/mongodb'

export interface SystemLink {
  id: string
  title: string
  url: string
  description: string
  color: string
}

async function getCollection() {
  const client = await clientPromise
  const db = client.db('bvys')
  return db.collection('links')
}

export async function getLinks(): Promise<SystemLink[]> {
  try {
    const collection = await getCollection()
    const links = await collection.find({}).toArray()
    
    return links.map(link => ({
      id: link.id,
      title: link.title,
      url: link.url,
      description: link.description,
      color: link.color
    }))
  } catch (error) {
    console.error('Failed to read links from MongoDB', error)
    return []
  }
}

async function verifyAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== 'gokhansucsuz@gmail.com') {
    throw new Error('Unauthorized')
  }
}

export async function addLink(formData: FormData) {
  await verifyAdmin()
  const collection = await getCollection()
  
  const newLink = {
    id: crypto.randomUUID(),
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    description: (formData.get('description') as string) || '',
    color: (formData.get('color') as string) || '#6366f1',
    createdAt: new Date()
  }
  
  await collection.insertOne(newLink)
  revalidatePath('/')
  revalidatePath('/settings')
}

export async function deleteLink(id: string) {
  await verifyAdmin()
  const collection = await getCollection()
  await collection.deleteOne({ id: id })
  revalidatePath('/')
  revalidatePath('/settings')
}
