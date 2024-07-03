import React, { useContext, useState } from 'react';
import { VideoCompoent, element } from './types';
import { AppContext } from '@/context';
import DraggableResizableComponent from './DragResizerWarpper';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebaseConfig';


const VideoComponent = ({ canvasRef, uploadVideo }: VideoCompoent) => {
    const context = useContext(AppContext);
    const headings = context?.elements?.filter((elem) => elem.type === "image")[0]?.elements;
    const [file, setFile] = useState(null);

    const onClick = (id: string) => {
        if (context?.setState) {
            context.setState(id);
            console.log(`Context updated with ID: ${id}`);
        }
    }

    const handleUpload = async () => {
        try {
            const url = await uploadVideo(file);
            console.log('File available at', url);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div>
            {headings?.map((heading: element) => (
                <div key={heading.id}>
                    <DraggableResizableComponent
                        key={heading.id}
                        id={heading.id as string}
                        conRef={canvasRef}
                        onClick={() => onClick(heading.id as string)}
                    >
                        <div style={{ width: '100%', height: '100%' }}>
                            <img
                                src={context?.images?.[heading.id as string] || 'https://img.icons8.com/?size=100&id=68826&format=png&color=000000'}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: '10px',
                                    msUserSelect: 'none',
                                    opacity: 1,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    zIndex: -1
                                }}
                                alt='Image'
                                onClick={() => console.log('Images:', context?.images)}
                                className='select-none'
                            />
                        </div>
                    </DraggableResizableComponent>
                </div>
            ))}
        </div>
    );
}

export default VideoComponent;
