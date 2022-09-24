import ProductCategories from '../modules/views/ProductCategories';
import ProductSmokingHero from '../modules/views/ProductSmokingHero';
import AppFooter from '../modules/views/AppFooter';
import ProductHero from '../modules/views/ProductHero1';
import ProductValues from '../modules/views/ProductValues';
import ProductHowItWorks from '../modules/views/ProductHowItWorks';
import ProductCTA from '../modules/views/ProductCTA';
import AppAppBar from '../modules/views/AppAppBar';
import withRoot from '../modules/withRoot';
import RaffleSession from '../modules/views/RaffleSession';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';


function Index() {
  const [params] = useSearchParams();

  const k = useCallback(() => {
    if(params.get("indicationCode")){
      const indicationCode = params.get("indicationCode") as string;
      localStorage.setItem('indicationCode', indicationCode);
    }
    console.log(params.get("indicationCode"))
  },[]);
  

  // useEffect(() => {
  //   if(params.get("indicationCode")){
  //     const indicationCode = params.get("indicationCode") as string;
  //     localStorage.setItem('indicationCode', indicationCode);
  //   }
  //   console.log(params.get("indicationCode"))
  // },[])


  // const indicationCode = params.get("indicationCode") || ''
  return (
    <>
      <AppAppBar />
      <RaffleSession/>
      {/* <ProductHero /> */}
      {/* <ProductValues /> */}
      {/* <ProductCategories /> */}
      {/* <ProductHowItWorks /> */}
      {/* <ProductCTA /> */}
      {/* <ProductSmokingHero /> */}
      {/* <AppFooter /> */}
    </>
  );
}

export default withRoot(Index);
