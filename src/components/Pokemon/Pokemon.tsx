import chroma from "chroma-js";
import React, { Component, CSSProperties } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { PokemonResource } from '../../api/api';
import { Pokemon, Reference } from "../../models";
import { PokemonCollection, State } from "../../store/types";
import './Pokemon.css';

interface PokemonStorageProps {
    pokemons: PokemonCollection;
    pokemonResource: PokemonResource;
}

class PokemonStorage extends Component<PokemonStorageProps> {

    render() {
        const pkmns = this.props.pokemons;
        const items = pkmns.allIds.map((id) => pkmns.byId[id]).map((pkmn) =>
            <PokemonSprite
                pokemon={pkmn}
                key={pkmn.id}/>
        );
        return <div className="PokemonStorage">{items}</div>;
    }
}


interface PokemonSpriteProps {
    pokemon: Pokemon;
}

class PokemonSprite extends Component<PokemonSpriteProps> {

    render() {
        const pkmn = this.props.pokemon;
        const sprite = pkmn.thinApiInfo && pkmn.thinApiInfo.sprite;
        return (
            <div className="PokemonSprite" style={{'--sprite': `url(${sprite})`} as CSSProperties}>
            <img className="PokemonSprite-thumbnail" src={sprite} />
            <div className="PokemonSprite-popup">
                <div className="PokemonSprite-pokemon" id={`pokemon-${pkmn.id}`}>
                    <h3 className="PokemonSprite-title">{pkmn.thinApiInfo && pkmn.thinApiInfo.name}</h3>
                    <p className="PokemonSprite-details">{pkmn.xp} xp</p>
                </div>
            </div>
            </div>
        );
    }
}


function mapStateToProps(state: State): PokemonStorageProps {
    return {
        pokemons: state.entities.pokemons,
        pokemonResource: new PokemonResource(state.globalAppState.authentication.token)
    };
}

export default connect(mapStateToProps)(PokemonStorage);
