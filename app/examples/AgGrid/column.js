export const columns = [
  {
    headerName: 'User Id',
    field: 'id',
  },
  {
    headerName: 'Name',
    field: 'name',
    cellRenderer: data => {
      const firstName =
        data.data && data.data.firstName ? data.data.firstName : '';
      const lastName =
        data.data && data.data.lastName ? data.data.lastName : '';

      return `${firstName} ${lastName}`;
    },
    filter: true,
    floatingFilter: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
  },
];
