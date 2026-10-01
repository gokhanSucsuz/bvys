'use server'

import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'links.json')

export interface SystemLink {
  id: string
  title: string
  url: string
  description: string
  color: string
}

export async function getLinks(): Promise<SystemLink[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to read links', error)
    return []
  }
}

export async function addLink(formData: FormData) {
  const links = await getLinks()
  const newLink: SystemLink = {
    id: crypto.randomUUID(),
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    description: (formData.get('description') as string) || '',
    color: (formData.get('color') as string) || '#6366f1'
  }
  links.push(newLink)
  await fs.writeFile(dataFilePath, JSON.stringify(links, null, 2))
  revalidatePath('/')
  revalidatePath('/settings')
}

export async function deleteLink(id: string) {
  const links = await getLinks()
  const updatedLinks = links.filter((link) => link.id !== id)
  await fs.writeFile(dataFilePath, JSON.stringify(updatedLinks, null, 2))
  revalidatePath('/')
  revalidatePath('/settings')
}
