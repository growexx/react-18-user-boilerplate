/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
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

// export class Users extends Component {
export const Users = ({
  demo,
  fillFields,
  dispatch,
  userStoreData,
  reset,
  pristine,
  submitting,
  invalid,
  updateField,
  handleSubmit}) => {
  // User Data
  const [userList, setUserList] = useState([])
  const [isListLoading, setIsListLoading] = useState(true)
  // Table Pagination
  const [pagination, setPagination] = useState(GET_DEFAULT_PAGINATION())
  const [sortType, setSortType] = useState(SORTING.ASC)
  const [sortKey, setSortKey] = useState('id')
  const [search, setSearch] = useState('')
  // Popup
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [popUpAction, setPopUpAction] = useState('')
  const [isPopUpLoading, setIsPopUpLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [status, setStatus] = useState('')
  // Modal
  const [showUserModal, setShowUserModal] = useState(false)

  useEffect(() => {
    loadUserDetails({pagination})
  }, [])

  const debouncedLoadUserDetails = debounce(d => loadUserDetails(d), 300);

  const getColumnProps = () => {
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
              setUserId(data.id)
              setIsPopUpLoading(true)
              handlePopupOk({
                status: active
                  ? ACCOUNT_STATUS.ACTIVE
                  : ACCOUNT_STATUS.SUSPENDED,
              });
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
              onClick={() => editUser(data.id)}
              title={userId ? 'Edit User' : 'Add User'}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Popconfirm
              title={MESSAGES.DELETE}
              open={
                isPopUpVisible &&
                popUpAction === POPUP_ACTION.DELETE &&
                userId === data.id
              }
              onConfirm={() => handlePopupOk({ isDeleted: true })}
              okButtonProps={{
                loading: isPopUpLoading,
                'data-testid': TEST_IDS.DELETE_BUTTON_CONFIRMED,
              }}
              cancelButtonProps={{
                'data-testid': TEST_IDS.DELETE_CONFIRMATION_CANCEL,
              }}
              onCancel={handlePopupCancel}
            >
              <Button
                data-testid={TEST_IDS.DELETE_BUTTON}
                type="secondary"
                htmlType="submit"
                onClick={() =>
                  showPopConfirm(POPUP_ACTION.DELETE, data.id)
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
  const handlePopupCancel = () => {
    setUserId('')
    setPopUpAction('')
    setIsPopUpVisible(false)
  };

  /**
   * Individual row Action Popup handler
   * @param {*} action
   * @param {*} userId
   */
  const showPopConfirm = (action, userId) => {
    setUserId(userId)
    setPopUpAction(action)
    setIsPopUpVisible(true)
  };

  const showError = (error) => {
    error.response
      .json()
      .then(err => notification.error({ message: err.message }));
  }

  /**
   * Handles Popup Ok Action
   * Used for Delete, Toggle Status
   */
  const handlePopupOk = payload => {
    const resetAction = () => {
      setIsPopUpLoading(false)
      setIsPopUpVisible(false)
      setUserId('')
      setPopUpAction('')
    };

    const currentUser = userList.find(u => u.id === userId);
    const isDelete = popUpAction === POPUP_ACTION.DELETE;

    setIsPopUpLoading(true)

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
          loadUserDetails();
        })
        .catch(error => {
          showError(error);
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
          loadUserDetails();
        })
        .catch(error => {
          showError(error);
          resetAction();
        });
    }
  };

  const getLatestValue = (newValue, oldValue) => {
    return newValue === '' ? newValue : newValue || oldValue;
  }

  const getUpdatedPagination = ({ status: newStatus, pagination }) => {
    if (status !== newStatus) {
      return GET_DEFAULT_PAGINATION();
    }

    return pagination;
  }

  const loadUserDetails = ({
    pagination: newPagination,
    sortType: newSortType,
    sortKey: newSortKey,
    search: newSearch,
    status: newStatus,
  } = {}) => {
    let paginationData = newPagination || pagination;
    let sortTypeData = newSortType || sortType;
    let sortKeyData = newSortKey || sortKey;
    let searchData = getLatestValue(newSearch, search);
    let statusData = getLatestValue(newStatus, status);
    paginationData = getUpdatedPagination({
      pagination: paginationData,
      status: statusData,
    });

    // Actual API Call
    const data = { method: 'GET' };

    let requestURL = `${API_URL}${API_ENDPOINTS.USERS}?pagination=1&pageSize=${paginationData.pageSize}&skip=${paginationData.current}&sortType=${sortTypeData}&`; // prettier-ignore
    if (searchData) {
      requestURL += `search=${searchData}&`;
    }
    if (statusData) {
      requestURL += `status=${statusData}&`;
    }

    (demo
      ? getUsersAPIMock({
          limit: paginationData.pageSize,
          skip: paginationData.current,
          sortType: sortTypeData,
          sortKey: sortKeyData,
          search: searchData,
          status: statusData,
        })
      : request(requestURL, data)
    )
      .then(response =>
        setUserDetails(response, {
          pagination: paginationData,
          search: searchData,
          status: statusData,
        }),
      )
      .catch(error => {
        notification.error({
          message: error && error.message,
        });
      });
  };

  const setUserDetails = (response, { pagination, status }) => {
    if (get(response, 'status')) {
      setUserList(get(response, 'data', []))
      setPagination(get(response, 'pagination', pagination))
      setIsListLoading(false)
      setStatus(status)
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
  const onTableOptionChange = (pagination, _filters, sorter) => {
    loadUserDetails({
      pagination,
      sortType: GET_SORT_ORDER(sorter.order),
      sortKey: sorter.columnKey,
    });
  };

  const onSearchUser = e => {
    const { value } = e.target;
    setSearch(value)
    setPagination(GET_DEFAULT_PAGINATION())
    debouncedLoadUserDetails({ search: value });
  };

  const onStatusSelectChange = status => {
    loadUserDetails({ status });
  };

  /**
   * Expandable row render
   * @param {*} record
   * @returns
   */
  const expandableRowRender = record => (
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
  const editUser = userId => {
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
      setUserId(userId)
      setShowUserModal(true)
      setIsPopUpVisible(false)
    }
  };

  /**
   * This modal handler verified data and submits to the backend
   */
  const updateUser = () => {
    setIsListLoading(true)
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
        setIsListLoading(false)
        setShowUserModal(!showUserModal)
        setUserId('')

        loadUserDetails();
        notification.success({ message: res.message });
        reset();
      })
      .catch(error => {
        showError(error);
        setIsListLoading(false)
      });
  };

  /**
   * Toggle Modal
   */
  const toggleModals = () => {
    reset();
    setShowUserModal(!showUserModal)
    setUserId(showUserModal ? '' : userId)
  };

  /**
   * Modal
   * @returns {Modal} Form
   */
  const userModal = () => {
    const performingAction = pristine || submitting || invalid || isListLoading;
    const cancelDisabled = submitting || isListLoading;

    return (
      <Modal
        title={userId ? 'Edit User' : 'Add User'}
        open={showUserModal}
        onOk={handleSubmit(updateUser)}
        confirmLoading={isListLoading}
        onCancel={() => toggleModals()}
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
        <form onSubmit={updateUser} className="mb-3">
          <Field
            name="email"
            disabled={!!userId}
            component={AInput}
            label="Email *"
            placeholder="john.doe@growexx.com"
            onChange={updateField}
            defaultValue={userStoreData && userStoreData.email}
          />
          <Field
            name="firstName"
            component={AInput}
            label="First Name *"
            placeholder="John"
            onChange={updateField}
            defaultValue={userStoreData && userStoreData.firstName}
          />
          <Field
            name="lastName"
            component={AInput}
            label="Last Name *"
            placeholder="Doe"
            onChange={updateField}
            defaultValue={userStoreData && userStoreData.lastName}
          />
        </form>
      </Modal>
    );
  };
  
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
                onChange={onStatusSelectChange}
                options={options}
                disabled={isListLoading}
              />
            </FilterItems>
            <FilterItems>
              <Tooltip title="Search by Name, Email">
                <SearchWrapper
                  allowClear
                  placeholder="Search User"
                  value={search}
                  onChange={onSearchUser}
                  onSearch={value => loadUserDetails({ search: value })}
                />
              </Tooltip>
            </FilterItems>
            <FilterItems>
              <Button
                data-testid={TEST_IDS.ADD_USER}
                color="primary"
                onClick={() => toggleModals()}
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
          expandedRowRender={expandableRowRender}
          rowKey={record => record.id}
          pagination={pagination}
          loading={isListLoading}
          columns={getColumnProps()}
          dataSource={userList}
          onChange={onTableOptionChange}
        />
        {userModal()}
      </MainContentWrapper>
    </div>
  );
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

const withConnect = connect(mapStateToProps, mapDispatchToProps); // prettier-ignore

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
