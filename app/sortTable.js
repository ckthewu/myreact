import React, {Component} from 'react';

class SortBar extends Component{
    handleSortChange(category){
        this.props.onSortChange(category);
    }
    render() {
        let ths = [];
        ths.push(<th key="0"></th>)
        this.props.categories.forEach((category)=>{
            ths.push(<th key={category} onClick={(e)=>this.handleSortChange(category)} >{category}</th>)
        })
        return (
            <thead>
                <tr>{ths}</tr>
            </thead>
        )
    }
}
class SortItems extends Component{
    render() {
        let trs = [];
        let items = this.props.items;
        let sortCategory = this.props.order.sortCategory;
        if(sortCategory){
            items.sort((a, b)=>{
                return this.props.order.sortType*(a.values[sortCategory]-b.values[sortCategory])
            })
        }
        items.forEach((item)=>{
            let tr = [];
            tr.push(<td key={"item"+item.name}>{item.name}</td>)
            this.props.categories.forEach((category)=>{
                tr.push(<td key={item.name+category}>{item.values[category]}</td>);
            })
            trs.push(<tr key={"row"+item.name}>{tr}</tr>);
        })
        return (
            <tbody>
                {trs}
            </tbody>
        )
    }
}
class SortTable extends Component{
    constructor(props){
        super(props);
        this.state = {sortCategory: "", sortType: 1}//1 means asc
    }
    handleSortChange(category){
        if(this.state.sortCategory === category){
            this.setState({sortType: -1*this.state.sortType});
        }
        else{
            this.setState({sortCategory: category, sortType: 1});
        }
    }
    render() {
        return (
            <table>
                <SortBar categories={this.props.categories} onSortChange={(e)=>this.handleSortChange(e)}/>
                <SortItems items={this.props.items} categories={this.props.categories} order={this.state}/>
            </table>
        )
    }
}

export default SortTable;
