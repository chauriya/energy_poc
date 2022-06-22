import React from 'react';
import { Details, Repos,  Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { EnergyContext } from '../context/context';
const Dashboard = () => {
  const { isLoading } = React.useContext(EnergyContext);
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className='loading-img' alt='loding' />
      </main>
    );
  }
  return (
    <main>
      <Navbar></Navbar>
      <Search />
      {/* <Info /> */}
      <Details />
      <Repos /> 
    </main>
  );
};

export default Dashboard;
