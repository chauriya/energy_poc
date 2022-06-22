import React from 'react';
import styled from 'styled-components';
import { EnergyContext } from '../context/context';
import { Column } from './Charts';
const Repos = () => {
  const { cityTemperature } = React.useContext(EnergyContext);
    const monthlyTemperature = [];
    for (const key in cityTemperature.properties.parameter.T2M) {
        if(cityTemperature.properties.parameter.T2M[key] !== -999)
        monthlyTemperature.push({label: key.substring(6,8), value: cityTemperature.properties.parameter.T2M[key]});
    }

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Column data={monthlyTemperature} {...cityTemperature}/>
      </Wrapper>
    </section>
  );
};
const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
