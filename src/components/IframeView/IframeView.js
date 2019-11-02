import React, { Component } from 'react';
import Iframe from 'react-iframe'

function findAncestor (el, sel) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
    return el;
}

class IframeView extends Component {
    handleOnClick = e => {
        console.log(e);
    };

    componentDidMount() {
        const iframe = document.getElementById('iframe-view');
        const body = findAncestor(iframe, 'body');
        body.addEventListener('click', this.handleOnClick);
    }

    render() {
        return (
            <Iframe url="http://localhost:3001"
                    width="450px"
                    height="450px"
                    id="iframe-view"
                    onClick={this.handleOnClick}
                    style={{width: '100%', height: "800px"}} />
        )
    }
}

export default IframeView;
