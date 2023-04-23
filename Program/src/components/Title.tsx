import {FC, useState} from 'react';

interface PropTitle {
    title: string;
    subtitle: string;
    complement?: string;
}

const Title: FC<PropTitle> = ({title, subtitle, complement}) => {
    const [color, setColor] = useState<string>();


    const changeColor = () => {
        color === "red" ? setColor("yellow") : setColor("red");
    }

    return (
        <div>
            <h1>{title}-{color}</h1>
            <h2>{subtitle} -{color}</h2>
            {complement && <h3>{complement}</h3>}
            <button onClick={changeColor}> TEST</button>
        </div>
    )
}

export default Title;

