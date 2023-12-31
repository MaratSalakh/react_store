/* eslint-disable react/prop-types */

import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { uniqueId } from "lodash";
import ProductInCart from "./ProductInCart";

const col = (product, i, setProducts, products) => {
  return <Col className="mt-3" md={6} lg={4} xl={3} key={uniqueId()}>
    <ProductInCart i={i} product={product} products={products} setProducts={setProducts}></ProductInCart>
  </Col>
};

const groupOfCols = (products, setProducts) => {
  const result = [];
  let innerResult = [];
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    if (innerResult.length < 4 && product.count !== 0) {
      innerResult.push(col(product, i, setProducts, products));
    } else if (innerResult.length === 4 && product.count !== 0) {
      result.push(innerResult);
      innerResult = [];
      innerResult.push(col(product, i, setProducts, products));
    }

    if (i === products.length - 1) {
      result.push(innerResult);
    }
  }
  return result;
};

const groupOfRows = (products, setProducts) => {
  const dataOfCols = groupOfCols(products, setProducts);

  return dataOfCols.map((group) => {
    return <Row key={uniqueId()}>{group.map((col) => col)}</Row>
  });
};

const CartShowCase = (props) => {
  const { products, setProducts } = props;

  return (
    <Container>
      {groupOfRows(products, setProducts)}
    </Container>
  );
};

export default CartShowCase;
