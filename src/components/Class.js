
import React, { Component } from 'react'
import { submit } from '../actions/walletActions';
import { increment } from '../actions/walletActions';
import { decrement } from '../actions/walletActions';
import { connect } from 'react-redux';
import '../App.css';
class classComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Classes Template"
        }
    }
    
    render(){

        return (
            <>
              <h1>{this.state.title}</h1>
              <h3>{this.props.address}</h3>
              <h3>{this.props.walletData}</h3>
              <button onClick={this.props.decrement}>- Global State -</button>
              <button onClick={this.props.increment}>+ Global State +</button>
            </>
        )
    }
}
// useSelector => mapStateToProps
const mapStateToProps = (state) => {
    return {
        count: state.wallet.counter,
        address: state.wallet.address,
        walletData: state.wallet.walletData
    }
}
// useDispatch => mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
    return {
        submit: () => dispatch(submit(2)),
        increment: () => dispatch(increment(1)),
        decrement: () => dispatch(decrement(1))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(classComponent);