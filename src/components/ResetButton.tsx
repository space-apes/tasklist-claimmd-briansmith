import {FC} from 'react';

const handleClick = () => {
    localStorage.clear();
    location.reload();
};

export const ResetButton: FC = () => {
    return (
        <button onClick={handleClick}>
            reset local storage and refresh page
        </button>
    )
}; 