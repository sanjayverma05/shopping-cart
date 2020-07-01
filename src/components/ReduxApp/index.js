import React, { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { updateViewport, fetchItems } from "Stores/shoppingStore/actions";
import Header from "Components/Header";
import Footer from "Components/Footer";
// import LazyLoad from "Utility/Lazyload";
import SelectView from "Components/SelectView";
import Checkout from "Components/Checkout";
// import {} from rea

import baseStyles from "Styles/base.scss";
import styles from "./index.scss";

// const SelectItemView = (props) => (
// 	<LazyLoad
// 		load={() => import(/* webpackChunkName: "lazyload-SelectView", webpackPreload: true */ "Components/SelectView")}
// 	>
// 		{(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
// 	</LazyLoad>
// );

// const CheckoutView = (props) => (
// 	<LazyLoad
// 		load={() => import(/* webpackChunkName: "lazyload-Checkout", webpackPrefetch: true */ "Components/Checkout")}
// 	>
// 		{(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
// 	</LazyLoad>
// );


const App = ()=>{
    let itemList = useSelector(({ items }) => items.itemList);
    const { items: selectedItems } = useSelector((state) => state.items.cart);
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchItems());
        let resizeListener = window.addEventListener("resize", () => {
			dispatch(updateViewport());
		});
        return ()=>{
            window.removeEventListener(resizeListener);
        }
    },[]);
    return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/checkout" render={() => <Checkout selectedItems={selectedItems} />} />
				<Route exact path="/" render={() => <SelectView items={itemList} addItemsToCart={() => {}} />} />
			</Switch>
			<Footer />
		</div>
	);
};

// const select = (state)=>{
//     return {ui: state.ui,items: state.items.itemList}
// }
// const addItem = (item)=>{
//     return {
//         type: "ADD_ITEM",
//         payload: item
//     }
// }
// const mapDispatchToProps = (dispatch)=>{
//     return {
// 		addItem: (item) => dispatch(addItems(item)),
// 	};
// }
// const List = ({ui,items,addItem})=>{
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         dispatch(fetchItems());
//         let resizeListener = window.addEventListener("resize", () => {
// 			dispatch(updateViewport());
// 		});
//         return ()=>{
//             window.removeEventListener(resizeListener);
//         }
//     },[]);
//     return <div>
//         {items.map(item=><div 
//                     onClick={()=>addItem(item)}
//                     >
//                          {item.name}
//         </div>)}
//     </div>
// }
// const App = connect(select,mapDispatchToProps)(List)
export default App;