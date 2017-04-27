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
ProductCategoryRow.defaultProps = { category: ""}


class ProductRow extends Component{
    constructor(props){
        super(props);
    }
    render() {
        let name = this.props.product.stocked ?
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
ProductRow.defaultProps = { product: {} }


class ProductTable extends Component{
    constructor(props){
        super(props);
    }
    render() {
        let rows = [];
        let lastCategory = null;
        //过滤文字
        let products = this.props.products.filter((product)=>
            product.name.toLowerCase().indexOf(this.props.filtertext.toLowerCase()) !== -1
        );
        //过滤stock
        if(this.props.instockonly){
            products = products.filter((product) => product.stocked);
        }
        products.forEach((product) => {
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
ProductTable.defaultProps = {products: [], filtertext: "", instockonly: false}

class SearchBar extends Component{
    handleFilterTextChange(e){
        this.props.onStateChange({filterText: e.target.value});
    }
    handleInStockOnlyChange(e){
        this.props.onStateChange({inStockOnly: e.target.checked});
    }
    render() {
        return (
            <form>
                <input type="text"
                value={this.props.filtertext}
                onChange={e=>this.handleFilterTextChange(e)}
                placeholder="Search..." />
                <input type="checkbox"
                checked={this.props.instockonly}
                onChange={e=>this.handleInStockOnlyChange(e)}
                />Only show products in stock
            </form>
        )
    }
}
SearchBar.defaultProps = {filtertext: "", instockonly: false}

class FilterableProductTable extends Component{
    constructor(props){
        super(props);
        this.state = {filterText: '', inStockOnly: false}
    }
    handleStateChange(obj){
        this.setState(obj);
    }
    render() {
        return (
            <div>
                <SearchBar
                filtertext={this.state.filterText}
                instockonly={this.state.inStockOnly}
                onStateChange={obj => this.handleStateChange(obj)}/>
                <ProductTable filtertext={this.state.filterText}
                instockonly={this.state.inStockOnly}
                products={this.props.products} />
            </div>
        )
    }
}
FilterableProductTable.defaultProps = {products: []}

export default FilterableProductTable
