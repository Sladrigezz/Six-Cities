import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: `Paris`,
      };
    }

    render() {
      const {activeItem} = this.state;
      const itemClickHandler = (e) => {
        const newItem = e.currentTarget.id;
        this.setState({activeItem: newItem});
      };

      const setDefaultItem = (item) => {
        this.setState({activeItem: item});
      };

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onItemClickHandler={itemClickHandler}
          setDefaultItem={setDefaultItem}
        />
      );
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
