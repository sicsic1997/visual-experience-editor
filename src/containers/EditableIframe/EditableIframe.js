import React from 'react';
import Attributes from "../../Attributes";
import { useParams } from 'react-router-dom';

const EditableIframe = () => {
    let { fileName } = useParams();
    console.log(fileName);
    return (
        <div>
            <h1>Attributes</h1>
            {/*<Attributes />*/}
        </div>
    );
};

export default EditableIframe;
