import { Accordion, Card } from "react-bootstrap";

const Earls = ({ earls }) => {

    return (
        <Accordion id='earlsAccordion'>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>Item 1</Accordion.Header>
                <Accordion.Body>
                    This is item 1
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Earls;