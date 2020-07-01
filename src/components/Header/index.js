import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import { AppContext } from "Components/App";
import {useSelector,useDispatch} from "react-redux";
import { searchFilter } from "Stores/shoppingStore/actions";

const Header = () => {
  // const checkoutItemCount= 0;
  const {searchText} = useSelector(state=>state.items);
  const { count: checkoutItemCount } = useSelector((state) => state.items.cart);

  const dispatch = useDispatch();
  return (
		<header className="header">
			<section className="container">
				<NavLink to="/" className="header__logo">
					<span className="icon-star-full"></span>
				</NavLink>
				<div className="header__icon-container">
					<a className="header__search">
						<span className="icon-search">
							<input
								type="text"
								onChange={(e) => {
                  e.preventDefault();
                  dispatch(searchFilter(e.target.value))}
                }
								value={searchText}
								placeholder="Search"
							/>
						</span>
					</a>
					<NavLink
						to={`${checkoutItemCount > 0 ? "checkout" : ""}`}
						className="header__cart-link"
						// data-step={stepIndicator}
						// aria-label={`click ${stepIndicator} ${title}`}
					>
						{checkoutItemCount > 0 && <span className="header__cart-count">{checkoutItemCount}</span>}
						<span className="icon-cart"></span>
					</NavLink>
				</div>
			</section>
		</header>
  );
};

export default Header;
