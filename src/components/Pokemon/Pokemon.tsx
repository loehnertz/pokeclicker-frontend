import React, { Component, CSSProperties } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { PokemonResource } from '../../api/api';
import { Pokemon, Reference } from "../../models";
import { decrPage, incrPage } from "../../store/actions/globalappstate";
import { PokemonCollection, State } from "../../store/types";
import { abbreviate } from "../../utils";
import missingno from './missingno.png';
import './Pokemon.css';

interface PokemonStorageProps {
    pokemons: PokemonCollection;
    showcase: Array<[Pokemon, number]>;
    pokemonResource: PokemonResource;
    currentPage: number;
}
interface PokemonStorageDispatchProps {
    incrPage(): void;
    decrPage(): void;
}
class PokemonStorage extends Component<PokemonStorageProps & PokemonStorageDispatchProps> {
    pageSize: number;
    gridCols: number;
    constructor(props: PokemonStorageProps & PokemonStorageDispatchProps, context?: any) {
        super(props, context);
        this.pageSize = 64;
        this.gridCols = 8;
    }

    page(): number[] {
        const ids = this.props.pokemons.allIds;
        return ids.slice(this.pageSize * this.props.currentPage, this.pageSize * (this.props.currentPage + 1));
    }

    incrPage() {
        this.props.incrPage();

    }
    decrPage() {
        this.props.decrPage();
    }

    render() {
        const pkmns = this.props.pokemons;
        const ids = this.page();
        const items = ids.map((id) => pkmns.byId[id]).map((pkmn) => (
            <PokemonSprite
                pokemon={pkmn}
                key={pkmn.id}
            />
        ));
        return (
            <div className="PokemonStorage">
                <div className="PokemonStorage-pageselect">
                    <button
                        className="PokemonStorage-nextpage"
                        onClick={(e) => this.decrPage()}
                    >&lt;
                    </button>
                    <div className="PokemonStorage-currentpage">
                        Box {this.props.currentPage + 1}
                    </div>
                    <button
                        className="PokemonStorage-nextpage"
                        onClick={(e) => this.incrPage()}
                    >&gt;
                    </button>
                </div>
                <div className="PokemonStorage-page">
                    {items}
                </div>
                <Showcase showcase={this.props.showcase} />
            </div>);
    }
}


interface PokemonSpriteProps {
    pokemon: Pokemon;
}

class PokemonSprite extends Component<PokemonSpriteProps> {

    render() {
        const pkmn = this.props.pokemon;
        const pokeInfo = this.props.pokemon.thinApiInfo;
        let millis: number;
        if(typeof pkmn.aquisitionDateTime === "number") {
            millis = pkmn.aquisitionDateTime;
        } else {
            millis = pkmn.aquisitionDateTime.millis;
        }
        const aquisitionDateTime = new Date(millis).toLocaleString();
        const sprite = (pokeInfo && pokeInfo.sprite) || missingno;
        const name = (pokeInfo && pokeInfo.sprite && pokeInfo.name) || "MissingNo.";
        return (
            <div className="PokemonSprite" style={{'--sprite': `url(${sprite})`} as CSSProperties}>
            <img className="PokemonSprite-thumbnail" src={sprite} />
            <div className="PokemonSprite-popup">
                <div className="PokemonSprite-pokemon" id={`pokemon-${pkmn.id}`}>
                    <h3 className="PokemonSprite-title">{name}</h3>
                    <p className="PokemonSprite-details">{abbreviate(pkmn.xp, 2)} xp</p>
                    <p className="PokemonSprite-details">{aquisitionDateTime}</p>
                </div>
            </div>
            </div>
        );
    }
}

class Showcase extends Component<{showcase: Array<[Pokemon, number]>}> {
    render() {
        const items = this.props.showcase.map(([pkmn, packId]) =>
            <ShowcaseSprite key={pkmn.id} pokemon={pkmn} packId={packId} />
            );
        return <div className="PokemonShowcase">{items}</div>;
    }
}

class ShowcaseSprite extends Component<{pokemon: Pokemon, packId: number}, {animationProps: CSSProperties}> {
    constructor(props: {pokemon: Pokemon, packId: number}, ctx: any) {
        super(props, ctx);
        this.state = {
            animationProps: this.animationProps()
        };
    }

    animationProps(): CSSProperties {
        const maxSpread = 500;
        const x = Math.round(Math.random() * maxSpread - maxSpread / 2);
        const y = Math.round(Math.random() * maxSpread - maxSpread / 2);
        const bpProps: any = {};
        const bp = document.getElementById(`Boosterpack-${this.props.packId}`);
        if(bp != null) {
            const rect = bp.getClientRects()[0];
            const spriteWidth = 95;
            const bpy = rect.top + 0.5 * rect.height - spriteWidth / 2;
            const bpx = rect.left + 0.5 * rect.width - spriteWidth / 2;
            bpProps['--startx'] = `${bpx}px`;
            bpProps['--starty'] = `${bpy}px`;
        }
        return {
            '--midx': `calc(50% + ${x}px)`,
            '--midy': `calc(50% + ${y}px)`,
            ...bpProps
        } as CSSProperties;
    }

    render() {
        const sprite = this.props.pokemon.thinApiInfo && this.props.pokemon.thinApiInfo.sprite;
        const style = this.state.animationProps;
        return <img style={style} className="PokemonShowcase-sprite" src={sprite} />;
    }
}


function mapStateToProps(state: State): PokemonStorageProps {
    return {
        pokemons: state.entities.pokemons,
        showcase: state.globalAppState.showcase,
        pokemonResource: new PokemonResource(state.globalAppState.authentication.token),
        currentPage: state.globalAppState.pokemonStoragePage
    };
}

function mapDispatchToProps(dispatch: Dispatch): PokemonStorageDispatchProps {
    return {
        incrPage: bindActionCreators(incrPage, dispatch),
        decrPage: bindActionCreators(decrPage, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonStorage);
