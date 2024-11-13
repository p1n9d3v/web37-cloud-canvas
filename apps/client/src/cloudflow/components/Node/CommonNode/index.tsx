import Pointer from '@cloudflow/components/Node/CommonNode/Pointer';
import { CommonNodeType } from '@cloudflow/types';
import { createElement } from 'react';

const commonNodeFactory = (type: CommonNodeType) => {
    switch (type) {
        case 'pointer':
            return Pointer;
    }
};

type Props = {
    type: CommonNodeType;
    isSelected: boolean;
};

export default ({ type, isSelected }: Props) => {
    return (
        <>
            {createElement(commonNodeFactory(type), {
                isSelected,
            })}
        </>
    );
};
