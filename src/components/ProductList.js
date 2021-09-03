import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
// filtered_products from filter_context from the attribute of FilterContext.Provider 
// with value={{...state}} which is coming from initialState
// products prop is coming from filter_context

const ProductList = () => {
  const { filtered_products: products, grid_view } = useFilterContext()
  // if filtered array equals 0 
  // using inline css becauase global css CAPS the text. don't want to CAP here.
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search.</h5>

    )
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  return (
    <GridView products={products} />


  )
}

export default ProductList
