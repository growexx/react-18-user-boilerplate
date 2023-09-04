/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Helmet } from 'react-helmet';
import { Controller, Form, useForm } from 'react-hook-form';
import {
  Space,
  Button,
  Modal,
  Popconfirm,
  Switch,
  Row,
  Col,
  Image,
  Form as antForm,
  Tooltip,
  notification,
  Input,
} from 'antd';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import request from 'utils/request';
import * as formValidations from 'utils/formValidations';
import {
  API_URL,
  API_ENDPOINTS,
  SORTING,
  GET_SORT_ORDER,
  GET_DEFAULT_PAGINATION,
  FULL_GENERIC_MOMENT_DATE_FORMAT,
} from 'containers/constants';
import { ACCOUNT_STATUS, POPUP_ACTION, MESSAGES, TEST_IDS } from './constants';
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
import { updateUserFormField } from './slice';

const logsTableProps = {
  showHeader: true,
};

const FormItem = antForm.Item;

export function Users({ demo }) {
  const [userList, setUserList] = useState([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [pagination, setPagination] = useState(GET_DEFAULT_PAGINATION());
  const [sortType] = useState(SORTING.ASC);
  const [sortKey] = useState('id');
  const [search, setSearch] = useState('');
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpAction, setPopUpAction] = useState('');
  const [isPopUpLoading, setIsPopUpLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const dispatch = useDispatch();
  const userStoreData = useSelector(state => state.usersExample);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    loadUserDetails({ pagination });
  }, []);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const debouncedLoadUserDetails = debounce(d => loadUserDetails(d), 300);

  const fillFields = (key, value) => {
    dispatch(updateUserFormField({ key, value }));
  };

  const getColumnProps = () => [
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
            setUserId(data.id);
            setIsPopUpLoading(true);
            handlePopupOk({
              status: active ? ACCOUNT_STATUS.ACTIVE : ACCOUNT_STATUS.SUSPENDED,
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
          {dayjs(v).format(FULL_GENERIC_MOMENT_DATE_FORMAT)}
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
              onClick={() => showPopConfirm(POPUP_ACTION.DELETE, data.id)}
              title={MESSAGES.TITLE.DELETE}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /**
   * Individual row Action Popup handler
   */
  const handlePopupCancel = () => {
    setUserId('');
    setInitialValues({});
    setPopUpAction('');
    setIsPopUpVisible(false);
  };

  /**
   * Individual row Action Popup handler
   * @param {*} action
   * @param {*} userId
   */
  const showPopConfirm = (action, userId) => {
    setUserId(userId);
    setPopUpAction(action);
    setIsPopUpVisible(true);
  };

  /**
   * Handles Popup Ok Action
   * Used for Delete, Toggle Status
   */
  const handlePopupOk = payload => {
    const resetAction = () => {
      setIsPopUpLoading(false);
      setIsPopUpVisible(false);
      setUserId('');
      setInitialValues({});
      setPopUpAction('');
    };

    const currentUser = userList.find(u => u.id === userId);
    const isDelete = popUpAction === POPUP_ACTION.DELETE;

    setIsPopUpLoading(true);

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
          notification.error({ message: error.message });
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
          notification.error({ message: error.message });
          resetAction();
        });
    }
  };

  const getLatestValue = (newValue, oldValue) =>
    newValue === '' ? newValue : newValue || oldValue;

  const getUpdatedPagination = ({ status: newStatus, pagination }) => {
    if (status !== newStatus) {
      return GET_DEFAULT_PAGINATION();
    }

    return pagination;
  };

  const loadUserDetails = ({
    pagination: newPagination,
    sortType: newSortType,
    sortKey: newSortKey,
    search: newSearch,
    status: newStatus,
  } = {}) => {
    let paginationData = newPagination || pagination;
    const sortTypeData = newSortType || sortType;
    const sortKeyData = newSortKey || sortKey;
    const searchData = getLatestValue(newSearch, search);
    const statusData = getLatestValue(newStatus, status);
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
      setUserList(get(response, 'data', []));
      setPagination(get(response, 'pagination', pagination));
      setIsListLoading(false);
      setStatus(status);
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
    setSearch(value);
    setPagination(GET_DEFAULT_PAGINATION());
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
    const user = userList.find(item => item.id === userId);
    if (user) {
      const storeData = {
        ...user,
      };
      Object.keys(storeData).forEach(key => {
        fillFields(key, storeData[key].toString());
      });
      setInitialValues(storeData);
      setUserId(userId);
      setShowUserModal(true);
      setIsPopUpVisible(false);
    }
  };

  /**
   * This modal handler verified data and submits to the backend
   */
  const updateUser = () => {
    setIsListLoading(true);
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
        setIsListLoading(false);
        setShowUserModal(!showUserModal);
        setUserId('');
        setInitialValues({});

        loadUserDetails();
        notification.success({ message: res.message });
        reset();
      })
      .catch(error => {
        notification.error({ message: error.message });
        setIsListLoading(false);
      });
  };

  /**
   * Toggle Modal
   */
  const toggleModals = () => {
    reset();
    setShowUserModal(!showUserModal);
    if (showUserModal) {
      setUserId('');
      setInitialValues({});
    }
  };

  /**
   * Modal
   * @returns {Modal} Form
   */
  const userModal = () => (
    <Modal
      title={userId ? 'Edit User' : 'Add User'}
      open={showUserModal}
      onOk={handleSubmit(updateUser)}
      confirmLoading={isListLoading}
      onCancel={() => toggleModals()}
      okButtonProps={{
        disabled: isListLoading,
        'data-testid': TEST_IDS.USER_MODAL_OK,
      }}
      okText={userId ? 'Update' : 'Add'}
      cancelButtonProps={{
        disabled: isListLoading,
        'data-testid': TEST_IDS.USER_MODAL_CANCEL,
      }}
    >
      <Form
        control={control}
        onSubmit={handleSubmit(updateUser)}
        className="mb-3"
      >
        <FormItem>
          <label htmlFor="email">Email *</label>
          <Controller
            control={control}
            name="email"
            rules={{
              required: formValidations.VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({ field }) => (
              <Input
                id="email"
                placeholder="john.doe@growexx.com"
                disabled={!!userId}
                {...field}
                onChange={e => {
                  field.onChange(e);
                  fillFields('email', e.target.value);
                }}
              />
            )}
          />
          {errors.email && (
            <div style={{ color: 'red' }}>{errors.email.message}</div>
          )}
        </FormItem>
        <FormItem>
          <label htmlFor="firstName">First Name *</label>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: formValidations.VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({ field }) => (
              <Input
                id="firstName"
                placeholder="John"
                {...field}
                onChange={e => {
                  field.onChange(e);
                  fillFields('firstName', e.target.value);
                }}
              />
            )}
          />
          {errors.firstName && (
            <div style={{ color: 'red' }}>{errors.firstName.message}</div>
          )}
        </FormItem>
        <FormItem>
          <label htmlFor="lastName">Last Name *</label>
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: formValidations.VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({ field }) => (
              <Input
                id="lastName"
                placeholder="Doe"
                {...field}
                onChange={e => {
                  field.onChange(e);
                  fillFields('lastName', e.target.value);
                }}
              />
            )}
          />
          {errors.lastName && (
            <div style={{ color: 'red' }}>{errors.lastName.message}</div>
          )}
        </FormItem>
      </Form>
    </Modal>
  );

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
          <FiltersWrapper key="users">
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
  demo: PropTypes.bool,
};

Users.defaultProps = {
  demo: true,
};

export default Users;
