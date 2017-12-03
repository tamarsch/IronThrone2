/**
*
* InputSelect
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, IconButton } from 'material-ui';
import ClearIcon from 'mdi-react/CloseIcon';


export default class InputSelect extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
  }
  onNewRequest(val) {
    this.handleClear();
    this.props.onNewRequest(val);
  }
  handleClear() {
    this.setState({ searchText: '' });
  }
  render() {
    return (
      <div style={{ marginTop: '-25px', marginRight: '10px' }}>
        <AutoComplete
          searchText={this.state.searchText}
          hintText={this.props.hint}
          floatingLabelText={this.props.hint}
          dataSource={this.props.dataSource}
          onUpdateInput={(value) => this.setState({ searchText: value })}
          onNewRequest={(val) => this.onNewRequest(val)}
          filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
          openOnFocus
          listStyle={{ maxHeight: 200, overflow: 'auto' }}
        />
        <IconButton
          style={{ color: 'grey' }}
          onClick={() => this.handleClear()}
        >
          <ClearIcon size={16} />
        </IconButton>
      </div>
    );
  }
}

InputSelect.propTypes = {
  hint: PropTypes.string,
  dataSource: PropTypes.array,
  onNewRequest: PropTypes.func,
};

