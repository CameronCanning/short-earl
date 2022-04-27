import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CopyButton = ({ text, variant, variantClick, className }) => {
    const [copied, setCopied] = useState(false);

    const onClick = () => {  
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);            
        }, 1500);     
    }
    const var1 = variant || 'outline-secondary';
    const var2 = variantClick || 'dark';
    return (
        <Button variant={ copied ? var2 : var1 } onClick={onClick} className={className}>
            <FontAwesomeIcon className='mx-1 dark' icon={ copied ? faCheck : faCopy } fixedWidth/>
        </Button>
    )
}

export default CopyButton;

