import React from 'react';
import {render} from 'react-dom';
import CommentBox from './demo1.js';
import FilterableProductTable from './demo2.js';
import SortTable from './sortTable.js';
let DATA1 = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
render(<CommentBox data={DATA1} flushtime={2000} />, document.getElementById('demo1'));

let PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
render(<FilterableProductTable products={PRODUCTS}/>, document.getElementById('demo2'));

let JSONDATA = {
    classList: ["Math","English","Chinese"],
    scoresList: [
        {"name": "小明", "values":{"Math": 80,"English": 90,"Chinese": 80}},
        {"name": "小红", "values":{"Math": 100,"English": 80,"Chinese": 70}},
        {"name": "小刚", "values":{"Math": 90,"English": 70,"Chinese": 90}}
    ]
}
render(<SortTable items={JSONDATA.scoresList} categories={JSONDATA.classList} />, document.getElementById('sorttable'));
