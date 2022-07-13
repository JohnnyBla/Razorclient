import React, { useContext } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import { removeSingleLoad } from '../../../redux/loadInfoReducer';
import LocalShippingSharpIcon from '@mui/icons-material/LocalShippingSharp';
import { useDispatch } from 'react-redux/es/exports';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import DataTable, {
  createTheme,
  ExpanderComponentProps,
} from 'react-data-table-component';
import { ArrowDownward } from '@mui/icons-material';

const LoadBreakdown = (props) => {
  const loads = props.data;
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  // handle on click
  const handleDelete = (row) => {
    dispatch(removeSingleLoad({ lid: row, key: auth.token }));
    window.location.reload();
  };

  // columns
  const columns = [
    {
      cell: () => <LocalShippingSharpIcon style={{ fill: '#43a047' }} />,
      width: '56px', // custom width for icon button
      style: {
        marginBottom: '1px',
      },
      hide: 'md',
    },
    {
      name: 'Origin',
      selector: (row) => row.origin,
      sortable: true,
    },
    {
      name: 'Desitnation',
      selector: (row) => row.destination,
      sortable: true,
      hide: 'sm',
    },
    {
      name: 'Total Miles',
      selector: (row) => row.totalmiles,
      sortable: true,
      hide: 'md',
    },
    {
      name: 'Price Per Mile',
      selector: (row) => row.pricepermile,
      sortable: true,
      hide: 'sm',
    },
    {
      name: 'Total',
      selector: (row) => row.total,
      sortable: true,
    },

    {
      name: 'LoadId',
      selector: (row) => row.id,
      sortable: false,
      omit: true,
    },
    {
      cell: (row) => (
        <MDBBtn
          tag='a'
          onClick={() => {
            handleDelete(row.id);
          }}
          floating
          color='none'
          style={{ color: '#dd4b39' }}
        >
          <MDBIcon fas icon='trash' size='lg' />
        </MDBBtn>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '45px',
      left: true,
    },
  ];

  const data = loads.map((items) => {
    const info = {
      origin: items.Origin,
      destination: items.Destination,
      totalmiles: items.TotalMiles,
      pricepermile: `$${parseFloat(items.PricePerMile).toFixed(2)}`,
      total: `$${parseFloat(items.TotalPrice).toFixed(2)}`,
      id: items._id,
    };

    return info;
  });

  // styles

  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
    data,
  }) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  };

  // PageNation

  const paginationComponentOptions = {
    rowsPerPageText: 'Loads per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All Loads',
  };

  //export data function
  const convertArrayOfObjectsToCSV = (array) => {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  const downloadCSV = (array) => {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  };

  const Export = ({ onExport }) => (
    <MDBBtn onClick={(e) => onExport(e.target.value)}>Export</MDBBtn>
  );

  createTheme(
    'solarized',
    {
      text: {
        primary: '#268bd2',
        secondary: '#2aa198',
      },
      background: {
        default: '#002b36',
      },
      context: {
        background: '#cb4b16',
        text: '#FFFFFF',
      },
      divider: {
        default: '#073642',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    },
    'dark'
  );

  // delete selected rows

  // export data
  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );

  return (
    <div className='mt-3'>
      <DataTable
        title={'Load Report'}
        columns={columns}
        data={data}
        highlightOnHover
        pointerOnHover
        paginationComponentOptions={paginationComponentOptions}
        expandableRows
        actions={actionsMemo}
        expandableRowsComponent={ExpandedComponent}
        sortIcon={<ArrowDownward />}
        theme='solarized'
        responsive
        direction='auto'
        pagination
      />
    </div>
  );
};

export default LoadBreakdown;
