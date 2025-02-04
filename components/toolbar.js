import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../assets/icon-search.svg';

import {
  Button,
  Dropdown,
  DropdownItem,
  navigation,
  Stack,
  StackItem,
  TextField,
} from 'nr1';

import AccountPicker from './account-picker';
export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      mounted: false,
      hostNames: [],
    };
    this.onEditStatusPageClick = this.onEditStatusPageClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onModalHideEnd = this.onModalHideEnd.bind(this);
  }

  async onEditStatusPageClick() {
    const nerdletWithState = {
      id: 'configure-status-pages',
      urlState: {
        accounts: this.props.accounts,
        accountId: this.props.selectedAccountId,
      },
    };

    if (this.props.entityGuid) {
      nerdletWithState.urlState.entityGuid = this.props.entityGuid;
    }
    navigation.openStackedNerdlet(nerdletWithState);
  }

  onModalClose() {
    this.setState({ hidden: true });
  }

  onModalHideEnd() {
    this.setState({ mounted: false });
  }

  render() {
    const { entityGuid, onAccountSelected } = this.props;
    const entityGuidExists = entityGuid !== null && entityGuid !== undefined;

    return (
      <Stack
        className="toolbar-container"
        fullWidth
        horizontalType={Stack.HORIZONTAL_TYPE.FILL}
        verticalType={Stack.VERTICAL_TYPE.CENTER}
        gapType={Stack.GAP_TYPE.NONE}
      >
        <StackItem className="toolbar-left-side">
          {!entityGuidExists && (
            <>
              <AccountPicker
                disabled={entityGuid !== null && entityGuid !== undefined}
                accountChangedCallback={onAccountSelected}
              />
              <hr />
            </>
          )}

          <div>
            <TextField
              label="Search"
              className="toolbar-search"
              onChange={this.props.setSearchQuery(event)}
            ></TextField>
          </div>

          <hr />
        </StackItem>
        <StackItem>
          <Stack
            className="toolbar-right-side"
            fullWidth
            horizontalType={Stack.HORIZONTAL_TYPE.RIGHT}
          >
            <Button
              type={Button.TYPE.PRIMARY}
              iconType={Button.ICON_TYPE.INTERFACE__SIGN__PLUS}
              sizeType={Button.SIZE_TYPE.MEDIUM}
              onClick={this.props.handleCreateTileModal}
            >
              Add new service
            </Button>
          </Stack>
        </StackItem>
      </Stack>
    );
  }
}
