import React, {Component} from 'react';

// This component is used to navigate the enterprise hierarchy
class BreadCrumbs extends Component {
    handleClick = () => {
        this.props.onBreadCrumbClick(this.props.value);
    }

    render() {
        return (
            <li className="breadcrumb-item" key={this.props.value} onClick={this.handleClick}><a href="#">{this.props.value}</a></li>
        );
    }
}

export default BreadCrumbs;
