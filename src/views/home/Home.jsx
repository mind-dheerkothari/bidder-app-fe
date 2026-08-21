import React from 'react'
import './home.scss';
import OngoingAuction from './components/OngoingAuction';

export default function Home() {
  return (
    <div className='home-page-wrapper'>
      <OngoingAuction />
    </div>
  )
}
