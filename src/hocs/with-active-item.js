import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };
      this._handleActiveItem = this._handleActiveItem.bind(this);
    }

    render() {
      return <Component
        activeItem={this.state.activeItem}
        onActiveItemChange={this._handleActiveItem}
        {...this.props}/>;
    }

    _handleActiveItem(activeItem) {
      this.setState({activeItem});
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
