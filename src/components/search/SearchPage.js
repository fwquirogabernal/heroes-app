import React, { useMemo, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroByName } from '../../selectors/getHeroesByName';

export const SearchPage = ({ history }) => {
    const location = useLocation();
    const { q = "" } = queryString.parse(location.search);
    const [heroToSearch, setHeroToSearch] = useState({ value: q })
    const heroesFiltered = useMemo(() => getHeroByName(q), [q])

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push(`?q=${heroToSearch.value}`);
    }
    const handleChange = (event) => {
        setHeroToSearch(prev => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }
    return (
        <div>
            <h1>Search Page</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr></hr>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Find your hero" className="form-control" name="value" onChange={handleChange} value={heroToSearch.value} autoComplete="off" />
                        <button type="submit" className="btn btn-outline-primary m-1">Search</button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {heroesFiltered.map((hero) => (
                        <HeroCard key={hero.id} hero={hero} />
                    ))}
                </div>
            </div>
        </div>
    )
}
