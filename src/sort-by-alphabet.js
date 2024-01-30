export default function SortByAlphabet(toDos) {
    return toDos.sort((a, b) => {
      if (a.toDo.toLowerCase() < b.toDo.toLowerCase()) {
        return -1;
      }
      if (a.toDo.toLowerCase() > b.toDo.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }