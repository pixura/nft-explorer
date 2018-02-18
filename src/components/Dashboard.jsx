import React from 'react';
import '../index.css';
import AppBar from 'material-ui/AppBar';

// {
//   collectibleOwner: '8cc8da168762e1c8f27cb36be90d23e075b391ee',
//   collectibleTokenId: '0000000000000000000000000000000000000000000000000000000000000001',
//   collectibleInstagramId: '1346330791181662504_51228965',
//   collectibleLastSoldPrice: null,
//   collectibleCurrentBidder: null,
//   collectibleCurrentBidPrice: null,
//   collectibleCreator: '8cc8da168762e1c8f27cb36be90d23e075b391ee',
//   imgUrl: 'https://...'
// }

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const Dashboard = (props) => {

  const mappedCollectibles = props.collectibles.map((c) => {
    // console.log('collectible', c)
    // const bidData =
    return (


          <TableRow key={c.collectibleTokenId}>
            <TableRowColumn className="coll-img-column">
              <div className="coll-img-container">
                <img className="coll-img" src={ c.imgUrl } alt="collectible"/>
              </div>
            </TableRowColumn>
            <TableRowColumn>{parseInt(c.collectibleTokenId, 16)}</TableRowColumn>
            <TableRowColumn>
              <a href={`https://ropsten.etherscan.io/address/${c.collectibleOwner}`} target="_blank">
                {c.collectibleOwner}
              </a>
            </TableRowColumn>
            <TableRowColumn>
            <a href={`https://ropsten.etherscan.io/address/${c.collectibleCreator}`} target="_blank">
              {c.collectibleCreator}
            </a>
          </TableRowColumn>
          <TableRowColumn>
            {c.collectibleCurrentBidPrice || '-'}
            <br/>
            { c.bid[0] && `Bid tx hash: ${c.bid[0].bidEventTxHash}`}
          </TableRowColumn>
          </TableRow>

    )
  })

  return (
    <div className="dashboard">
      <AppBar
              title="Connected to the Ropsten Network"
              showMenuIconButton={false}
              style={{backgroundColor: '#34c36f'}}
            />
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Rare Asset</TableHeaderColumn>
            <TableHeaderColumn>Asset ID</TableHeaderColumn>
            <TableHeaderColumn>Owner</TableHeaderColumn>
            <TableHeaderColumn>Creator</TableHeaderColumn>
            <TableHeaderColumn>Bids</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
      { mappedCollectibles }
        </TableBody>
      </Table>
    </div>
  );
}

export default Dashboard;
