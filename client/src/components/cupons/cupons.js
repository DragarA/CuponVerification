import { useEffect, useState } from 'react';

const Cupons = () => {

    const [cupons, setCupons] = useState([]);

    useEffect(() => {
        fetch('/api/cupons')
        .then(res => res.json())
        .then(data => setCupons(data));
    }, []);

    return (
        <div>
            <h2>Cupons</h2>
            <ul>
                {cupons.map(cupon =>
                    <li key={cupon.id}>{ cupon.recipient } | { cupon.issueDate }</li>    
                )}
            </ul>
        </div>
    );
}

export default Cupons;
