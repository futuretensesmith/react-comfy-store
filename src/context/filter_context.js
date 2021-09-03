import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  // changes as user filters products
  filtered_products: [],
  // default that you can reset filters to
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,

  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

  // ******* we pull products array from products_context ********but have to 
  // slip it in to filter_context through useEffect because 
  // Hooks can't get passed to simple function. Only another Hook
  // or a Component
  const { products } = useProductsContext()
  // passing in filter_reducer
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])
  // GridView / ListView components get rendered in ProductList component depending on grid_view being
  // true or false
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  // this function gets called in Sort component
  const updateSort = (e) => {
    // for demonstration in Sort component. In the Filters component we will need the name value
    // const name = e.target.name
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      // dataset is a custom attribute that we can pass our map color data to
      // in the filters component
      value = e.target.dataset.color
    }

    if (name === 'price') {
      // in Filters componentinput range o utputs number values as strings so we are 
      // using Number function to convert price variable from string to number
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }



  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      updateSort,
      updateFilters,
      clearFilters,
    }} >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
