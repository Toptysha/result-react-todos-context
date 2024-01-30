import * as yup from 'yup'

export const fieldsScheme = yup.object().shape({
    userName: yup
        .string()
        .matches(/^([a-zA-Zа-яА-Я._-]+)*$/, 
          'ERROR: Имя должно содержать только кириллицу, латиницу, ".", "_" и "-"')
        .max(20, 'ERROR: Имя не должен быть длиннее 20 символов')
        .required('Все поля являются обязательными'),
    toDo: yup
        .string()
        .min(4, 'ERROR: новое дело не должен быть короче 4 символов')
        .required('Все поля являются обязательными'),
  })