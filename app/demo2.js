import React,{Component} from 'react';
class ProductCategoryRow extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <tr>
                <td colSpan="2">{this.props.category}</td>
            </tr>
        )
    }
}
ProductCategoryRow.defaultProps = {
    category: ""
};


class ProductRow extends Component{
    constructor(props){
        super(props);
    }
    render() {
        var name = this.props.product.stocked ?
          this.props.product.name :
          <span style={{color: 'red'}}>
            {this.props.product.name}
          </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}
ProductRow.defaultProps = {
    product: {}
};


class ProductTable extends Component{
    constructor(props){
        super(props);
    }
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
          if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
          }
          rows.push(<ProductRow product={product} key={product.name} />);
          lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr><th>Name</th><th>Price</th></tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}
ProductTable.defaultProps = {
    products: []
};

class SearchBar extends Component{
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." />
                <input type="checkbox" />Only show products in stock
            </form>
        )
    }
}
class FilterableProductTable extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <SearchBar />
                <ProductTable products={this.props.products}/>
            </div>
        )
    }
}
FilterableProductTable.defaultProps = {
    products: []
};

export default FilterableProductTable
