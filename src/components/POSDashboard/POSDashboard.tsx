import React, { useState } from 'react'
import { useArticles, useCategories } from '../../hooks/useSupabase'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'

const POSDashboard: React.FC = () => {
  const { articles, loading: articlesLoading } = useArticles()
  const { categories, loading: categoriesLoading } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const filteredArticles = articles.filter(article => 
    (selectedCategory ? article.category_id === selectedCategory : true) &&
    article.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddToCart = (article: any) => {
    dispatch(addToCart(article))
  }

  if (articlesLoading || categoriesLoading) {
    return <div>Laden...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4">
        <input 
          type="text" 
          placeholder="Artikel suchen..." 
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex space-x-2 mb-4">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Alle
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredArticles.map(article => (
          <div 
            key={article.id} 
            className="border rounded p-4 hover:shadow-lg transition cursor-pointer"
            onClick={() => handleAddToCart(article)}
          >
            <h3 className="text-lg font-bold">{article.name}</h3>
            <p className="text-green-600 font-semibold">{article.price.toFixed(2)} €</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default POSDashboard
