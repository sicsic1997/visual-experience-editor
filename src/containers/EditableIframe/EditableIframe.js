import React from 'react';
import Attributes from "../../Attributes";
import { useParams } from 'react-router-dom';

const EditableIframe = () => {
    let { fileName } = useParams();
    console.log(fileName);
    return (
        <div>
            <Attributes />
        </div>
    );
};

export default EditableIframe;
