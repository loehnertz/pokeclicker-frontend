import chroma from "chroma-js";
import React, { Component, CSSProperties } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { PokemonResource } from '../../api/api';
import { Pokemon, Reference } from "../../models";
import { PokemonCollection, State } from "../../store/types";
import missingno from './missingno.png';
import './Pokemon.css';

interface PokemonStorageProps {
    pokemons: PokemonCollection;
    pokemonResource: PokemonResource;
}

class PokemonStorage extends Component<PokemonStorageProps> {
    currentPage: number;
    pageSize: number;

    constructor(props: PokemonStorageProps, context?: any) {
        super(props, context);
        this.currentPage = 0;
        this.pageSize = 64;
    }

    page(): number[] {
        const ids = this.props.pokemons.allIds;
        return ids.slice(this.pageSize * this.currentPage, this.pageSize * (this.currentPage + 1));
    }

    incrPage() {
        this.currentPage++;
        this.forceUpdate();

    }
    decrPage() {
        this.currentPage = Math.max(0, this.currentPage - 1);
        this.forceUpdate();
    }

    render() {
        const pkmns = this.props.pokemons;
        const ids = this.page();
        const items = ids.map((id) => pkmns.byId[id]).map((pkmn) =>
            <PokemonSprite
                pokemon={pkmn}
                key={pkmn.id}/>
        );
        return <div className="PokemonStorage">
            <div className="PokemonStorage-pageselect">
                <button
                    className="PokemonStorage-nextpage"
                    onClick={(e) => this.decrPage()}
                    >&lt;</button>
                <div className="PokemonStorage-currentpage">
                    Box {this.currentPage + 1}
                </div>
                <button
                    className="PokemonStorage-nextpage"
                    onClick={(e) => this.incrPage()}>></button>
            </div>
            <div className="PokemonStorage-page">{items}
            </div></div>;
    }
}


interface PokemonSpriteProps {
    pokemon: Pokemon;
}

class PokemonSprite extends Component<PokemonSpriteProps> {

    render() {
        const pkmn = this.props.pokemon;
        const pokeInfo = this.props.pokemon.thinApiInfo;
        const aquisitionDateTime = new Date(pkmn.aquisitionDateTime.millis).toLocaleString();
        const sprite = (pokeInfo && pokeInfo.sprite) || missingno;
        const name = (pokeInfo && pokeInfo.sprite && pokeInfo.name) || "MissingNo.";
        return (
            <div className="PokemonSprite" style={{'--sprite': `url(${sprite})`} as CSSProperties}>
            <img className="PokemonSprite-thumbnail" src={sprite} />
            <div className="PokemonSprite-popup">
                <div className="PokemonSprite-pokemon" id={`pokemon-${pkmn.id}`}>
                    <h3 className="PokemonSprite-title">{name}</h3>
                    <p className="PokemonSprite-details">{pkmn.xp} xp</p>
                    <p className="PokemonSprite-details">{aquisitionDateTime}</p>
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
