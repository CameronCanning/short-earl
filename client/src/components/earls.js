import { Accordion, Card } from "react-bootstrap";

const Earls = ({ earls }) => {
    const testEarls = [
        {earl: '3ljflj', url: 'https://youtube.com/wowzers'},
        {earl: 'fsdf', url: 'https://youtube.com/wowzers'},
        {earl: '3gge', url: 'https://youtube.com/wowzers'},
        {earl: '3rerwlj', url: 'https://youtube.com/wowzers'},
        {earl: '3231flj', url: 'https://youtube.com/wowzers'}
    ];
    console.log(testEarls);
    return (
        <Accordion id='earlsAccordion' flush>
            {
                testEarls.map((e, i) => {
                    return (
                    <Accordion.Item eventKey={i} key={e.earl}>
                        <Accordion.Header>
                            <h5>{e.url}</h5>  
                            <p className='ms-auto'>{e.earl}</p>
                        </Accordion.Header>
                        <Accordion.Body>
                            {e.url}
                        </Accordion.Body>
                    </Accordion.Item>
                )})
            }
        </Accordion>
    )
}

export default Earls;