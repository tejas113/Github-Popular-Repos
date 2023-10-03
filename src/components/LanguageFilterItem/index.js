import './index.css'

const LanguageFilterItem = props => {
  const {details, isActive, setNewActiveId} = props
  const {id, language} = details
  const buttonClassName = isActive
    ? 'buttonEdit selected-language-btn'
    : 'buttonEdit'

  const setNewRepo = () => {
    setNewActiveId(id)
  }

  return (
    <li className="filterLiEdit">
      <button type="button" className={buttonClassName} onClick={setNewRepo}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
