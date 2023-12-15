# AG Grid React

AG Grid is a fully-featured and highly customizable JavaScript data grid.
There are 2 versions available for AG Grid (Community and Enterprise). We will be using community version which is free and available

## Step 1: Install Dependencies

Before you begin, make sure you have the required dependencies installed in your project.

`npm install ag-grid-react`

## Step 2: Import Dependencies

In your component file, import the necessary dependencies from the packages you'll be using.

```
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
```

## Step 3: Use AgGridReact Component with suitable props according to the requirements.

Here are the more detailed docs of AG Grid React: [`Docs`](https://ag-grid.com/react-data-grid/getting-started/)

```
<div className="ag-theme-quartz" style={{ height: 600 }}>
    <AgGridReact
      columnDefs={columns}
      rowModelType="infinite"
      pagination
      maxBlocksInCache={1}
      cacheBlockSize={10}
      paginationPageSize={10}
      onGridReady={onGridReady}
      suppressDragLeaveHidesColumns
      overlayNoRowsTemplate="No Users found"
      paginationPageSizeSelector={false}
      defaultColDef={{
        sortable: true,
        suppressMenu: true,
        floatingFilterComponentParams: {
          suppressFilterButton: true,
        },
      }}
      autoSizeStrategy={{
        type: 'fitGridWidth',
        defaultMinWidth: 100,
      }}
    />
</div>
```

### Note
In our boilerplate, we have implemented AG Grid React with searching, filtering (with  custom filter),  sorting and pagination including deep linking for all the operations

