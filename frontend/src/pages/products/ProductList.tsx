import React from "react";
import { useGetProductsQuery, useGetCategoriesQuery } from "./apiSlice";
import { Table, Button, Spinner } from "reactstrap";

const ProductList = () => {
  // Fetch products and categories
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    error: productsFetchError,
    refetch: refetchProducts,
  } = useGetProductsQuery();

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesFetchError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  // Loading states
  // if (productsLoading || categoriesLoading) {
  //   return <p>Loading...</p>;
  // }

  // Error states
  if (productsError) {
    return (
      <p>Error fetching products: {productsFetchError.message as string}</p>
    );
  }
  if (categoriesError) {
    return (
      <p>Error fetching categories: {categoriesFetchError.message as string}</p>
    );
  }

  // Function to get category name by categoryId
  const getCategoryName = (categoryId: number): string => {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div className="py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Product List</h1>
        <Button
          color="success"
          onClick={() => {
            refetchProducts();
            refetchCategories();
          }}
          disabled={productsLoading || categoriesLoading}
          style={{ minWidth: "100px" }}
        >
          {productsLoading || categoriesLoading ? (
            <Spinner size="sm" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>
      {productsLoading || categoriesLoading ? (
        <div className="text-center py-4">
          <Spinner size={"md"} />
        </div>
      ) : (
        products &&
        products.length > 0 && (
          <Table bordered responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, index: any) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{getCategoryName(product.categoryId)}</td>
                  <td>{product.stock}</td>
                  <td>{product.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      )}
    </div>
  );
};

export default ProductList;
