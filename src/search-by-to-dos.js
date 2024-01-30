import { useContext } from 'react';
import { SearchContext } from './context';
import SortButton from './sort-button';

export default function SearchByToDos() {

    const { setSearch, setSearchFlag, searchFlag } = useContext(SearchContext)

    return (
        <div>
            <SortButton />
            <input
                type='text' 
                placeholder='Поиск по задачам'
                onChange={({target}) => {
                setSearch(target.value)
                setSearchFlag(!searchFlag)
                }}
            ></input>
      </div>
    )
}