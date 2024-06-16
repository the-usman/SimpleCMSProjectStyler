// "use client";
// import { useContext } from "react";

// import { AppContext, AppWrapper, AppWrapperProvider } from "@/context/indext";

// const context = useContext(AppContext)
// if (!context) {
//     throw new Error("No context provider");
// }

// const { isDragging, dragableComponent } = context;

// export const handleMove = (event: MouseEvent | TouchEvent) => {
//     if (isDragging) {
//         const movingDiv = document.getElementById(dragableComponent as string);
//         console.log(movingDiv);
//         // console.log(event);
//         let clientX: number;
//         let clientY: number;
//         if (movingDiv) {
//             if (event instanceof MouseEvent) {
//                 clientX = event.clientX;
//                 clientY = event.clientY;
//             } else {
//                 clientX = event.touches[0].clientX;
//                 clientY = event.touches[0].clientY;
//             }

//             const maxX = window.innerWidth - movingDiv.offsetWidth;
//             const maxY = window.innerHeight - movingDiv.offsetHeight;

//             const x = Math.min(Math.max(0, clientX), maxX);
//             const y = Math.min(Math.max(0, clientY), maxY);
//             if (x > 300 && event instanceof MouseEvent) {
//                 movingDiv.style.left = x + 'px';
//                 movingDiv.style.top = y + 'px';
//             }
//         }
//     }
// };
