/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { change } from 'redux-form';
import { Field, reduxForm } from 'redux-form/immutable';
import injectReducer from 'utils/injectReducer';
import * as formValidations from 'utils/formValidations';
import {
  API_URL,
  API_ENDPOINTS,
  SORTING,
  GET_SORT_ORDER,
  GET_DEFAULT_PAGINATION,
  FULL_GENERIC_MOMENT_DATE_FORMAT,
} from 'containers/constants';
import request from 'utils/request';
import {
  Space,
  Button,
  Modal,
  Popconfirm,
  Switch,
  Row,
  Col,
  Image,
  Tooltip,
  notification,
} from 'antd';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import reducer from './reducer';
import { AInput } from '../../utils/Fields';
import * as actions from './actions';
import { makeSelectUser } from './selectors';

import {
  ACCOUNT_STATUS,
  POPUP_ACTION,
  USERS_KEY,
  MESSAGES,
  TEST_IDS,
} from './constants';
import { deleteUserAPIMock, getUsersAPIMock, updateUserAPIMock } from './stub';
import {
  AccountStatusDropDown,
  DataTableWrapper,
  FilterItems,
  FiltersWrapper,
  MainContentWrapper,
  PageHeaderWrapper,
  SearchWrapper,
} from './styled';

const logsTableProps = {
  showHeader: true,
};

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // User Data
      userList: [],

      isListLoading: true,

      // Table Pagination
      pagination: GET_DEFAULT_PAGINATION(),

      sortType: SORTING.ASC,
      sortKey: 'id',
      search: '',

      // Popup
      isPopUpVisible: false,
      popUpAction: '',
      isPopUpLoading: false,
      userId: '',
      status: '',

      // Modal
      showUserModal: false,
    };
    this.debouncedLoadUserDetails = debounce(d => this.loadUserDetails(d), 300);
  }

  getColumnProps = () => {
    const { isPopUpVisible, popUpAction, userId, isPopUpLoading } = this.state;

    return [
      {
        title: 'User Id',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
      },
      {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        width: '20%',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        render: (_action, data) => `${data.firstName} ${data.lastName}`,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '20%',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '15%',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        render: (_action, data) => (
          <Switch
            data-testid={TEST_IDS.STATUS_TOGGLE}
            checkedChildren="Active"
            unCheckedChildren="Suspend"
            defaultChecked={data.status === ACCOUNT_STATUS.ACTIVE}
            loading={isPopUpLoading && userId === data.id}
            disabled={isPopUpLoading}
            onChange={active => {
              this.setState(
                {
                  userId: data.id,
                  isPopUpLoading: true,
                },
                () => {
                  this.handlePopupOk({
                    status: active
                      ? ACCOUNT_STATUS.ACTIVE
                      : ACCOUNT_STATUS.SUSPENDED,
                  });
                },
              );
            }}
          />
        ),
      },
      {
        title: 'Last Access Date',
        dataIndex: 'lastAccessDate',
        key: 'lastAccessDate',
        width: '15%',
        render: v => (
          <Space size="middle">
            {moment(v).format(FULL_GENERIC_MOMENT_DATE_FORMAT)}
          </Space>
        ),
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (action, data) => (
          <Space size="middle">
            <Button
              data-testid={TEST_IDS.EDIT_BUTTON}
              type="secondary"
              htmlType="submit"
              onClick={() => this.editUser(data.id)}
              title={userId ? 'Edit User' : 'Add User'}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Popconfirm
              title={MESSAGES.DELETE}
              visible={
                isPopUpVisible &&
                popUpAction === POPUP_ACTION.DELETE &&
                userId === data.id
              }
              onConfirm={() => this.handlePopupOk({ isDeleted: true })}
              okButtonProps={{
                loading: isPopUpLoading,
                'data-testid': TEST_IDS.DELETE_BUTTON_CONFIRMED,
              }}
              cancelButtonProps={{
                'data-testid': TEST_IDS.DELETE_CONFIRMATION_CANCEL,
              }}
              onCancel={this.handlePopupCancel}
            >
              <Button
                data-testid={TEST_IDS.DELETE_BUTTON}
                type="secondary"
                htmlType="submit"
                onClick={() =>
                  this.showPopConfirm(POPUP_ACTION.DELETE, data.id)
                }
                title={MESSAGES.TITLE.DELETE}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  };

  /**
   * Individual row Action Popup handler
   */
  handlePopupCancel = () => {
    this.setState({
      userId: '',
      popUpAction: '',
      isPopUpVisible: false,
    });
  };

  /**
   * Individual row Action Popup handler
   * @param {*} action
   * @param {*} userId
   */
  showPopConfirm = (action, userId) => {
    this.setState({
      userId,
      popUpAction: action,
      isPopUpVisible: true,
    });
  };

  showError(error) {
    error.response
      .json()
      .then(err => notification.error({ message: err.message }));
  }

  /**
   * Handles Popup Ok Action
   * Used for Delete, Toggle Status
   */
  handlePopupOk = payload => {
    const { demo } = this.props;
    const { userId, popUpAction, userList } = this.state;
    const resetAction = () => {
      this.setState({
        isPopUpLoading: false,
        isPopUpVisible: false,
        userId: '',
        popUpAction: '',
      });
    };
    const currentUser = userList.find(u => u.id === userId);
    this.setState(
      {
        isPopUpLoading: true,
      },
      () => {
        const isDelete = popUpAction === POPUP_ACTION.DELETE;
        if (isDelete) {
          (demo
            ? deleteUserAPIMock(userId)
            : request(`${API_URL}?id=${userId}`, { method: 'DELETE' })
          )
            .then(response => {
              resetAction();
              notification.success({
                message: response && response.message,
              });
              this.loadUserDetails();
            })
            .catch(error => {
              this.showError(error);
              resetAction();
            });
        } else {
          (demo
            ? updateUserAPIMock({ ...currentUser, ...payload })
            : request(`${API_URL}`, {
                method: 'PUT',
                body: {
                  ...currentUser,
                  ...payload,
                },
              })
          )
            .then(() => {
              resetAction();
              notification.success({ message: 'Updated User' });
              this.loadUserDetails();
            })
            .catch(error => {
              this.showError(error);
              resetAction();
            });
        }
      },
    );
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.loadUserDetails({ pagination });
  }

  getLatestValue(newValue, oldValue) {
    return newValue === '' ? newValue : newValue || oldValue;
  }

  getUpdatedPagination({ status: newStatus, pagination }) {
    const { status } = this.state;
    if (status !== newStatus) {
      return GET_DEFAULT_PAGINATION();
    }

    return pagination;
  }

  loadUserDetails = ({
    pagination: newPagination,
    sortType: newSortType,
    sortKey: newSortKey,
    search: newSearch,
    status: newStatus,
  } = {}) => {
    let { pagination, sortType, search, status, sortKey } = this.state;
    const { demo } = this.props;
    pagination = newPagination || pagination;
    sortType = newSortType || sortType;
    sortKey = newSortKey || sortKey;
    search = this.getLatestValue(newSearch, search);
    status = this.getLatestValue(newStatus, status);
    pagination = this.getUpdatedPagination({ pagination, status });

    // Actual API Call
    const data = { method: 'GET' };

    let requestURL = `${API_URL}${API_ENDPOINTS.USERS}?pagination=1&pageSize=${
      pagination.pageSize
    }&skip=${pagination.current}&sortType=${sortType}&`;
    if (search) {
      requestURL += `search=${search}&`;
    }
    if (status) {
      requestURL += `status=${status}&`;
    }

    (demo
      ? getUsersAPIMock({
          limit: pagination.pageSize,
          skip: pagination.current,
          sortType,
          sortKey,
          search,
          status,
        })
      : request(requestURL, data)
    )
      .then(response =>
        this.setUserDetails(response, {
          pagination,
          search,
          status,
        }),
      )
      .catch(error => {
        notification.error({ message: error && error.message });
      });
  };

  setUserDetails = (response, { pagination, status }) => {
    if (get(response, 'status')) {
      this.setState({
        userList: get(response, 'data', []),
        pagination: get(response, 'pagination', pagination),
        isListLoading: false,
        status,
      });
    } else {
      notification.error({ message: get(response, 'message') });
    }
  };

  /**
   * Table sort, pagination change
   * @param {*} pagination
   * @param {*} _filters
   * @param {*} sorter
   */
  onTableOptionChange = (pagination, _filters, sorter) => {
    this.loadUserDetails({
      pagination,
      sortType: GET_SORT_ORDER(sorter.order),
      sortKey: sorter.columnKey,
    });
  };

  onSearchUser = e => {
    const { value } = e.target;
    this.setState(
      { search: value, pagination: GET_DEFAULT_PAGINATION() },
      () => {
        this.debouncedLoadUserDetails({ search: value });
      },
    );
  };

  onStatusSelectChange = status => {
    this.loadUserDetails({ status });
  };

  /**
   * Expandable row render
   * @param {*} record
   * @returns
   */
  expandableRowRender = record => (
    <Row gutter={5} className="p-2">
      <Col span={6}>
        <Image src={record.profileUrl} width={100} height={100} />
      </Col>
      <Col span={6} />
    </Row>
  );

  /**
   * Edit existing User
   * @param {string} userId
   */
  editUser = userId => {
    const { userList } = this.state;
    const { fillFields, dispatch } = this.props;
    // eslint-disable-next-line no-underscore-dangle
    const user = userList.find(item => item.id === userId);
    if (user) {
      const storeData = {
        ...user,
      };
      Object.keys(storeData).forEach(key => {
        dispatch(change(USERS_KEY, key, storeData[key]));
        fillFields(key, storeData[key]);
      });
      this.setState({
        userId,
        showUserModal: true,
        isPopUpVisible: false,
      });
    }
  };

  /**
   * This modal handler verified data and submits to the backend
   */
  updateUser = () => {
    const { userStoreData, reset, demo } = this.props;
    const { showUserModal, userId } = this.state;
    this.setState(
      {
        isListLoading: true,
      },
      () => {
        const isUpdate = !!userId;
        const payload = {
          method: isUpdate ? 'PUT' : 'POST',
          body: {
            ...userStoreData,
            id: userStoreData.id,
          },
        };
        const URL = `${API_URL}`;

        (demo
          ? updateUserAPIMock(
              {
                ...userStoreData,
                id: userStoreData.id,
              },
              !isUpdate,
            )
          : request(URL, payload)
        )
          .then(res => {
            this.setState(
              {
                isListLoading: false,
                showUserModal: !showUserModal,
                userId: '',
              },
              () => {
                this.loadUserDetails();
              },
            );
            notification.success({ message: res.message });
            reset();
          })
          .catch(error => {
            this.showError(error);
            this.setState({
              isListLoading: false,
            });
          });
      },
    );
  };

  /**
   * Toggle Modal
   */
  toggleModals = () => {
    const { reset } = this.props;
    reset();
    const { showUserModal, userId } = this.state;
    this.setState({
      showUserModal: !showUserModal,
      userId: showUserModal ? '' : userId,
    });
  };

  /**
   * Modal
   * @returns {Modal} Form
   */
  userModal = () => {
    const { showUserModal, isListLoading, userId } = this.state;
    const {
      pristine,
      submitting,
      invalid,
      updateField,
      handleSubmit,
      userStoreData,
    } = this.props;
    const performingAction = pristine || submitting || invalid || isListLoading;
    const cancelDisabled = submitting || isListLoading;

    return (
      <Modal
        title={userId ? 'Edit User' : 'Add User'}
        visible={showUserModal}
        onOk={handleSubmit(this.updateUser)}
        confirmLoading={isListLoading}
        onCancel={() => this.toggleModals()}
        okButtonProps={{
          disabled: performingAction,
          'data-testid': TEST_IDS.USER_MODAL_OK,
        }}
        okText={userId ? 'Update' : 'Add'}
        cancelButtonProps={{
          disabled: cancelDisabled,
          'data-testid': TEST_IDS.USER_MODAL_CANCEL,
        }}
      >
        <form onSubmit={this.updateUser} className="mb-3">
          <Field
            name="email"
            disabled={!!userId}
            component={AInput}
            label="Email *"
            placeholder="john.doe@growexx.com"
            onChange={updateField}
            defaultValue={userStoreData.email}
          />
          <Field
            name="firstName"
            component={AInput}
            label="First Name *"
            placeholder="John"
            onChange={updateField}
            defaultValue={userStoreData.firstName}
          />
          <Field
            name="lastName"
            component={AInput}
            label="Last Name *"
            placeholder="Doe"
            onChange={updateField}
            defaultValue={userStoreData.lastName}
          />
        </form>
      </Modal>
    );
  };

  render() {
    const { userList, isListLoading, pagination, search } = this.state;
    const options = Object.keys(ACCOUNT_STATUS).map(key => ({
      value: ACCOUNT_STATUS[key],
      label: ACCOUNT_STATUS[key],
    }));

    return (
      <div>
        <Helmet>
          <title>Users List</title>
          <meta name="description" content="Users" />
        </Helmet>
        <PageHeaderWrapper
          title="Users"
          extra={[
            <FiltersWrapper>
              <FilterItems>
                <AccountStatusDropDown
                  placeholder="User Status"
                  allowClear
                  onChange={this.onStatusSelectChange}
                  options={options}
                  disabled={isListLoading}
                />
              </FilterItems>
              <FilterItems>
                <Tooltip title="Search by Name, Email">
                  <SearchWrapper
                    allowClear
                    placeholder="Search User"
                    isListLoading
                    value={search}
                    onChange={this.onSearchUser}
                    onSearch={value => this.loadUserDetails({ search: value })}
                  />
                </Tooltip>
              </FilterItems>
              <FilterItems>
                <Button
                  data-testid={TEST_IDS.ADD_USER}
                  color="primary"
                  onClick={() => this.toggleModals()}
                >
                  Add User
                </Button>
              </FilterItems>
            </FiltersWrapper>,
          ]}
        />
        <MainContentWrapper>
          <DataTableWrapper
            {...logsTableProps}
            expandedRowRender={this.expandableRowRender}
            rowKey={record => record.id}
            pagination={pagination}
            loading={isListLoading}
            columns={this.getColumnProps(this)}
            dataSource={userList}
            onChange={this.onTableOptionChange}
          />
          {this.userModal()}
        </MainContentWrapper>
      </div>
    );
  }
}

Users.propTypes = {
  // Redux-form
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,

  // Mocks API response
  demo: PropTypes.bool,
  // Action
  updateField: PropTypes.func.isRequired,
  fillFields: PropTypes.func.isRequired,
  // Store
  userStoreData: PropTypes.object,
};

// Mocks API Response
Users.defaultProps = {
  demo: true,
};

const withReducer = injectReducer({
  key: USERS_KEY,
  reducer,
});

const mapStateToProps = createStructuredSelector({
  userStoreData: makeSelectUser(),
});

export const mapDispatchToProps = dispatch => ({
  updateField: e =>
    dispatch(actions.updateField(e.target.name, e.target.value)),
  fillFields: (key, value) => dispatch(actions.updateField(key, value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  reduxForm({
    form: USERS_KEY,
    fields: ['firstName', 'lastName', 'email'],
    validate: formValidations.createValidator({
      firstName: [formValidations.required],
      lastName: [formValidations.required],
      email: [formValidations.required, formValidations.validEmail],
    }),
  }),
)(Users);
