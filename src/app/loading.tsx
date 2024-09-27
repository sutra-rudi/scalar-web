'use client';

import { CirclesWithBar } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CirclesWithBar
        width='100'
        color='#FF9A00'
        outerCircleColor='#FF9A00'
        innerCircleColor='#FF9A00'
        barColor='#FF9A00'
        ariaLabel='circles-with-bar-loading'
        visible={true}
      />
    </div>
  );
};

export default Loading;
