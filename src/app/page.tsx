"use client"
// import React, { useRef, useState, useEffect } from 'react';
// import H1Component from './H1Component';
// import { Elemento, element } from './types';
// import TextComponent from './TextComponent';
// import ImageComponent from './ImageComponent';
// import Panel from './Panel';




// export default function Home() {
//   const canvasRef = useRef<HTMLDivElement>(null);

//   return (
//     <div className="home flex overflow-hidden relative">

//       <Panel />
//       <div className="canvas" ref={canvasRef} style={{ overflow: 'hidden !important', width: '70%', minHeight: '100vh', position: 'relative', marginLeft: '30%' }}>
//         <H1Component canvasRef={canvasRef} />
//         <TextComponent canvasRef={canvasRef} />
//         <ImageComponent canvasRef={canvasRef}/>
//       </div>



//     </div>
//   );
// }


import React, { useRef, useState, useEffect } from 'react';
import DivideableBox from './DivideableBox';
import Image from 'next/image';

const Home: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<React.ReactNode>(
    <div>
      <Image src={'/video.png'} alt="" width={80} height={80} />
    </div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setContent(
        <div style={{ overflow: "auto" }}>
          dkdhskjhdsadjslakdjoisadnsaudoisadn jdoisadusa disuad oisadusa odisadus oaiddkjde kdjewd d iewd wi wid ewid ewid ewdiwed iewd ewid ewid ewid ewid ewid ewid diwd wid wid wid wid wid wid widw diw dwid wid wid wid wid wid wusao idusaoid saudoisadusoa idusaodoisadusa oidusaoid
        </div>
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DivideableBox childRef={ref} content={content} isApplicable={true} divisionCount={[[32], [1, 3, 1]]}>
      <div ref={ref} style={{ width: '100vw', height: '100vh', backgroundColor: 'lightgray' }}></div>
    </DivideableBox>
  );
};

export default Home;