import React from 'react';
import '../index.css';

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

// const CollectibleData = (collectible) => {
//   return (
//     <div className="container">
//       <img src={ collectible.imgUrl } alt="collectible"/>
//     </div>
//   )
// }


const Dashboard = (props) => {

  const mappedCollectibles = props.collectibles.map((c) => {
    console.log('collectible', c)
    return (
      <div className="coll-container" key={c.collectibleInstagramId}>
        <img className="coll-img" src={ c.imgUrl } alt="collectible"/>
        <p className="coll-owner" >Owner:
          <a href={`https://ropsten.etherscan.io/address/${c.collectibleOwner}`} target="_blank">{c.collectibleOwner}</a>
        </p>
        <p className="coll-id">Asset ID:{c.collectibleTokenId}</p>
      </div>
    )
  })



  return (
    <div className="foo">
      { mappedCollectibles }
    </div>
  );
}


export default Dashboard;
