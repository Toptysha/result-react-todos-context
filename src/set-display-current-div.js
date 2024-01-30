export default function SetDisplayCurrentDiv (id, datasetName) {
    const currentDiv = document.querySelector(`[${datasetName}='${id}']`)
    currentDiv.style.display = currentDiv.style.display === 'block'? 'none' : 'block'
}