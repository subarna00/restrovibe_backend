'use client'

import { useGetMenuCategoriesQuery, useGetMenuItemsQuery } from '@/lib/store/api/baseApi'

export function MenuExample() {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetMenuCategoriesQuery()
  const { data: items, isLoading: itemsLoading, error: itemsError } = useGetMenuItemsQuery()

  if (categoriesLoading || itemsLoading) {
    return <div>Loading menu data...</div>
  }

  if (categoriesError || itemsError) {
    return <div>Error loading menu data</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Menu Data (RTK Query Example)</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categories ({categories?.length || 0})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <div key={category.id} className="p-4 border rounded-lg">
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Menu Items ({items?.length || 0})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items?.slice(0, 6).map((item) => (
            <div key={item.id} className="p-4 border rounded-lg">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-lg font-bold text-primary">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
