import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import Menu from "./MenuComponent";

import DishDetail from "./DishdetailComponent ";
import HomeComponent from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { addComment, fetchDishes } from "../redux/ActionCreator";
import { actions } from "react-redux-form";
// import { DISHES } from "../shared/dishes";
// import { COMMENTS } from "../shared/comments";
// import { PROMOTIONS } from "../shared/promotions";
// import { LEADERS } from "../shared/leaders";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
});
class MainComponent extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // dishes: DISHES,
    // comments: COMMENTS,
    // promotions: PROMOTIONS,
    // leaders: LEADERS,
    // };
  }
  componentDidMount() {
    this.props.fetchDishes();
  }
  render() {
    const HomePage = () => {
      return (
        <HomeComponent
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <HeaderComponent />
        {/* <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <Dishdetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        /> */}
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route
            exact
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Redirect to="/home" />
        </Switch>
        <FooterComponent />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainComponent)
);
