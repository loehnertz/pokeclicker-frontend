import React, {Component} from "react";
import {Boosterpack, Reference} from "../../models";
import {BoosterpackCollection, State} from "../../store/types";

import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {buyBoosterpack} from "../../store/actions/boosterpack";
import './Clicking.css';
import pokeballImage from './Pokeball.png';

interface StoreFrontProps {
    boosterpacks: BoosterpackCollection;
}

interface StoreFrontDispatchProps {
    onBoosterpackBuy(id: Reference<Boosterpack>): void;
}

class Clicking extends Component<StoreFrontProps & StoreFrontDispatchProps> {
    render() {
        const bps = this.props.boosterpacks;
        return <Pokeball/>;
    }
}

class Pokeball extends Component {
    render() {
        return <div><img src={pokeballImage} alt=""/></div>;
    }
}

class PokeDollars extends Component {
    render() {
        return (
            <div>
                <img src={pokeballImage} alt=""/>
            </div>
        );
    }
}

function mapStateToProps(state: State): StoreFrontProps {
    return {
        boosterpacks: state.entities.boosterpacks
    };
}

function mapDispatchToProps(dispatch: Dispatch): StoreFrontDispatchProps {
    return {
        onBoosterpackBuy: bindActionCreators(buyBoosterpack, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clicking);
