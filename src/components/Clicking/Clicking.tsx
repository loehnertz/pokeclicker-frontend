import React, {Component} from "react";
import {BoosterpackCollection, State} from "../../store/types";

import {connect} from "react-redux";
import {Dispatch} from "redux";
import './Clicking.css';
import pokeballImage from './Pokeball.png';
import {User} from "../../models/user";
import {BoosterpackResource} from "../../api/api";
import {Boosterpack, Reference} from "../../models";

interface ClickingProps {
    user: User;
}

interface ClickingDispatchProps {
    onPokeballClick(resource: BoosterpackResource, id: Reference<Boosterpack>): void;
}

class Clicking extends Component<ClickingProps & ClickingDispatchProps> {
    render() {
        return (
            <div className="Clicking">
                <Pokeball/>
                <PokeDollars amount={this.props.user.pokeDollars}/>
            </div>
        );
    }
}

class Pokeball extends Component {
    render() {
        return <div><img src={pokeballImage} alt=""/></div>;
    }
}

class PokeDollars extends Component<{amount: number}> {
    render() {
        return (
            <div className="PokeDollars">
                <p>{this.props.amount}</p>
            </div>
        );
    }
}

function mapStateToProps(state: State): ClickingProps {
    return {
        user: (state.entities.user as User)
    };
}

function mapDispatchToProps(dispatch: Dispatch): ClickingDispatchProps {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Clicking);
