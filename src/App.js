import { useEffect, useState } from 'react';
import styles from './styles/index.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchContext, ToDosContext } from './context';
import { fieldsScheme } from './fields-scheme';
import SortByAlphabet from './sort-by-alphabet';
import { debounce } from 'lodash';
import ToDos from './To-dos';
import SearchByToDos from './search-by-to-dos';
import SetDisplayCurrentDiv from './set-display-current-div';

function App() {

  const [toDos, setToDos] = useState([])
  const [refreshToDosFlag, setRefreshToDosFlag] = useState(false)
  const [newName, setNewName] = useState('')
  const [newToDo, setNewToDo] = useState('')
  const [sortByAlphabetFlag, setSortByAlphabetFlag] = useState(false)
  const [search, setSearch] = useState('')
  const [searchFlag, setSearchFlag] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
        userName: '',
        toDo: ''
    },
    resolver: yupResolver(fieldsScheme)
  });

  const error = errors.userName?.message || errors.toDo?.message

  const requestAddToDo = (formData) => {
    fetch('http://localhost:3005/toDos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({...formData, completed: false})
    })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
          console.log('Server response:', response)
          setRefreshToDosFlag(!refreshToDosFlag)
        })
  }

  useEffect(() => {
    fetch('http://localhost:3005/toDos')
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        if (!sortByAlphabetFlag) {
          setToDos(loadedToDos)
        } else {
          setToDos(SortByAlphabet(loadedToDos))
        }
        
      })
  }, [refreshToDosFlag, sortByAlphabetFlag])

  let searchToDo = debounce(() => {
    fetch('http://localhost:3005/toDos')
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {setToDos(loadedToDos.filter(({toDo}) => toDo.includes(search))); console.log(search)})
  }, 500);

    useEffect(() => {
      searchToDo()
    }, [searchFlag])

  const changeNameOnToDo = (id) => {
    fetch(`http://localhost:3005/toDos/${id}`)
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        fetch(`http://localhost:3005/toDos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({...response, userName: newName})
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
              console.log('Server response:', response)
              setRefreshToDosFlag(!refreshToDosFlag)
            })
            .finally(SetDisplayCurrentDiv(id, 'data-name-id'))
      })
  }
  
  const changeToDoOnToDo = (id) => {
    fetch(`http://localhost:3005/toDos/${id}`)
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        fetch(`http://localhost:3005/toDos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({...response, toDo: newToDo})
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
              console.log('Server response:', response)
              setRefreshToDosFlag(!refreshToDosFlag)
            })
            .finally(SetDisplayCurrentDiv(id, 'data-to-do-id'))
      })
  }
  
  const changeCompletedOnToDo = (id) => {
    fetch(`http://localhost:3005/toDos/${id}`)
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        fetch(`http://localhost:3005/toDos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({...response, completed: response.completed? false: true})
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
              console.log('Server response:', response)
              setRefreshToDosFlag(!refreshToDosFlag)
            })
      })  
  }

  const deleteToDo = (id) => {
    fetch(`http://localhost:3005/toDos/${id}`)
      .then(
        fetch(`http://localhost:3005/toDos/${id}`, {method: 'DELETE'})
          .then((response) => {
            console.log('Server response:', response)
            setRefreshToDosFlag(!refreshToDosFlag)
          })
      )
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(requestAddToDo)} className={styles.formContainer}>
        <div>
          {error && <div className={styles.errorLabel}>{error}</div>}

          <h2>Имя:</h2>
          <input 
              type='text' 
              {...register('userName')}
              placeholder='Введите имя'
          ></input>

          <h2>Новая задача:</h2>
          <input
              type='text'
              {...register('toDo')}
              placeholder='Введите новую Задачу'
          ></input>
        </div>

        <button  className={styles.createToDo} disabled={!!error}>Создать задачу</button>
      </form>

      <SearchContext.Provider value={{setSortByAlphabetFlag, sortByAlphabetFlag, setSearch, setSearchFlag, searchFlag}}>
        <SearchByToDos />
      </SearchContext.Provider>

      <ToDosContext.Provider value={{toDos, setNewName, changeNameOnToDo, setNewToDo, changeToDoOnToDo, changeCompletedOnToDo, deleteToDo}}>
        <ToDos />
      </ToDosContext.Provider>
    </div>
  );
}

export default App;
