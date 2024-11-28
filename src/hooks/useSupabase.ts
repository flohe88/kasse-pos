import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Article, Category, Sale } from '../types'

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*, categories(*)')
          .order('name')

        if (error) throw error
        setArticles(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const addArticle = async (article: Omit<Article, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert(article)
        .select()

      if (error) throw error
      setArticles(prev => [...prev, data[0]])
    } catch (err: any) {
      setError(err.message)
    }
  }

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      setArticles(prev => prev.map(article => 
        article.id === id ? { ...article, ...updates } : article
      ))
    } catch (err: any) {
      setError(err.message)
    }
  }

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) throw error
      setArticles(prev => prev.filter(article => article.id !== id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  return { articles, loading, error, addArticle, updateArticle, deleteArticle }
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (error) throw error
        setCategories(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const addCategory = async (name: string) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({ name })
        .select()

      if (error) throw error
      setCategories(prev => [...prev, data[0]])
    } catch (err: any) {
      setError(err.message)
    }
  }

  return { categories, loading, error, addCategory }
}

export const useSales = () => {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const createSale = async (saleData: Omit<Sale, 'id' | 'created_at'>) => {
    try {
      // Verkauf erstellen
      const { data: saleResult, error: saleError } = await supabase
        .from('sales')
        .insert(saleData)
        .select()
        .single()

      if (saleError) throw saleError

      // Sale-Items für diesen Verkauf erstellen
      const saleItems = saleData.items.map(item => ({
        ...item,
        sale_id: saleResult.id
      }))

      const { error: saleItemsError } = await supabase
        .from('sale_items')
        .insert(saleItems)

      if (saleItemsError) throw saleItemsError

      return saleResult
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }

  const fetchSales = async (startDate?: string, endDate?: string) => {
    try {
      let query = supabase.from('sales').select('*')
      
      if (startDate) {
        query = query.gte('created_at', startDate)
      }
      
      if (endDate) {
        query = query.lte('created_at', endDate)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setSales(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { sales, loading, error, createSale, fetchSales }
}
