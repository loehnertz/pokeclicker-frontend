import { BoosterpackCollection, State } from "../../store/types";
import { Component, CSSProperties } from "react";
import { Boosterpack, Reference } from "../../models";
import chroma from 'chroma-js';
import React from "react";

import './Store.css';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { buyBoosterpack } from "../../store/actions/boosterpack";

interface StoreFrontProps {
    boosterpacks: BoosterpackCollection
}

interface StoreFrontDispatchProps {
    onBoosterpackBuy(id: Reference<Boosterpack>): void;
}


class StoreFront extends Component<StoreFrontProps & StoreFrontDispatchProps>{

    render() {
        const bps = this.props.boosterpacks;
        const items = bps.allIds.map(id => bps.byId[id]).map(bp => <StoreItem boosterpack={bp} onBoosterpackBuy={this.props.onBoosterpackBuy}></StoreItem>)
        return <div className="StoreFront">{items}</div>
    }
}



interface StoreItemProps {
    boosterpack: Boosterpack;
}

interface StoreItemEventProps {
    onBoosterpackBuy(id: Reference<Boosterpack>): void;
}

class StoreItem extends Component<StoreItemProps & StoreItemEventProps>{

    color(): CSSProperties {
        const color = chroma(this.props.boosterpack.hexColor);
        const white = chroma('white');
        const black = chroma('black');
        const contrastwhite = chroma.contrast(white, color);
        const contrastblack = chroma.contrast(black, color);
        const fg = contrastwhite > contrastblack ? white : black;
        let bg = color;

        if (chroma.contrast(fg, bg) < 6) {
            if (fg.hex() == "#ffffff") {
                bg = bg.darken(0.5);
            }
            else {
                bg = bg.brighten(0.5);
            }
        }
        const bg0 = bg.set('lch.c', Math.max(bg.get('lch.c'), 20));
        const [l, c, h] = bg0.lch();
        const bg1 = chroma.lch(l, c / 3, h);
        const bg2 = chroma.lch(l, c / 3, h - 180);
        return {
            '--bg-from': bg0.hex(),
            '--bg-via': bg1.hex(),
            '--bg-to': bg2.hex(),
            '--fg': fg.hex()
        } as CSSProperties;
    }

    render() {
        const bp = this.props.boosterpack;
        const colorProps = this.color();
        return <div className="StoreItem" style={{ ...colorProps }}>
            <div className="StoreItem-boosterpack">
                <h3 className="StoreItem-title">{bp.name}</h3>
            </div>
            <button className="StoreItem-buybutton" onClick={() => this.props.onBoosterpackBuy(this.props.boosterpack.locationAreaId)}>${bp.price}</button>
        </div>
    }
}


function mapStateToProps(state: State): StoreFrontProps {
    return {
        boosterpacks: state.entities.boosterpacks
    }
}

function mapDispatchToProps(dispatch: Dispatch): StoreFrontDispatchProps {
    return {
        onBoosterpackBuy: bindActionCreators(buyBoosterpack, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);