import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { seedDb } from '../../server';

const LandingPage = (): JSX.Element => {
    const db = localStorage.getItem('wafi-test-database');
    const history = useHistory();

    useEffect(() => {
        if (!db) seedDb();
    }, [db]);

    useEffect(() => {
        const timer = setTimeout(() => {
            history.replace({ pathname: "/app" });
        }, 3000);
    
        return () => {
            clearTimeout(timer);
        };
    }, [history])

    return (
        <div>
            Landing page
        </div>
    )
}

export default LandingPage;
