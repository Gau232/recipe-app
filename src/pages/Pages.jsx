import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home/Home"
import ProductListing from "./ProductListing/ProductListing"
import ProductPage from "./ProductPage/ProductPage"

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:product_type" element={<ProductListing />} />
        <Route path="/recipes/:recipe" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Pages;