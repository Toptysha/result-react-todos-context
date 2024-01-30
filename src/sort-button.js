import { useContext } from 'react';
import styles from './styles/index.module.css';
import { SearchContext } from './context';

export default function SortButton() {

    const {setSortByAlphabetFlag, sortByAlphabetFlag} = useContext(SearchContext)

    return (
        <button type='submit' className={styles.sortByAlphabet} onClick={() => setSortByAlphabetFlag(!sortByAlphabetFlag)}>Сортировать по алфавиту</button>
    )
}