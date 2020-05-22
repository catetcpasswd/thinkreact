import React, { useState } from "react";

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$99.99",
    stocked: false,
    name: "Tennis"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

const ProductCategoryRow = props => {
  const category = props.category;
  const keyName = props.keyName;

  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
};

const ProductRow = props => {
  const item = props.item;
  const keyName = props.keyName;

  const name = item.stocked ? (
    item.name
  ) : (
    <span style={{ color: "red" }}>{item.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{item.price}</td>
    </tr>
  );
};

const ProductTable = props => {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;

  //console.log('filter ', filterText, ' ', inStockOnly)
  const rows = [];
  let lastCategory = null;

  props.products.forEach(product => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      lastCategory = product.category;
      rows.push(
        <ProductCategoryRow
          category={product.category}
          keyName={product.category}
        />
      );
    }
    rows.push(<ProductRow keyName={product.name} item={product} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const SearchBar = props => {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;

  const handleFilterTextChange = e => {
    props.onFilterTextChange(e.target.value);
  };

  const handleInStockChange = e => {
    props.onInStockChange(e.target.checked);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={handleInStockChange}
          />{" "}
          Only show products in stock
        </p>
      </form>
    </div>
  );
};

const FilterableProductTable = props => {
  const [state, setState] = useState({
    filterText: "",
    inStockOnly: false
  });

  const handleFilterTextChange = filterText => {
    setState({ ...state, filterText });
  };

  const handleInStockChange = inStockOnly => {
    setState({ ...state, inStockOnly });
  };

  return (
    <div>
      <SearchBar
        filterText={state.filterText}
        inStockOnly={state.inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />
      <ProductTable
        products={props.products}
        filterText={state.filterText}
        inStockOnly={state.inStockOnly}
      />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Compose Components!</h1>
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
};

export default App;
