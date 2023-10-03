import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    isLoading: false,
    repositoriesData: [],
    selectedLanguageFilter: 'ALL',
  }

  componentDidMount() {
    this.getRepositoriesData(languageFiltersData[0].id)
  }

  getRepositoriesData = async selectedLanguageFilter => {
    this.setState({
      isLoading: true,
    })
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selectedLanguageFilter}`,
    )
    const fetchedData = await response.json()
    console.log(fetchedData)
    const updatedData = fetchedData.popular_repos.map(eachRepository => ({
      id: eachRepository.id,
      imageUrl: eachRepository.avatar_url,
      name: eachRepository.name,
      starsCount: eachRepository.stars_count,
      forksCount: eachRepository.forks_count,
      issuesCount: eachRepository.issues_count,
    }))
    this.setState({
      isLoading: false,
      repositoriesData: updatedData,
    })
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  getFilterItem = () => {
    const {selectedLanguageFilter} = this.state

    return (
      <ul className="filterContEdit">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            details={eachItem}
            isActive={eachItem.id === selectedLanguageFilter}
            setNewActiveId={this.setNewActiveId}
          />
        ))}
      </ul>
    )
  }

  setNewActiveId = newFilterId => {
    this.setState({
      selectedLanguageFilter: newFilterId,
    })
    this.getRepositoriesData(newFilterId)
  }

  renderRepositoriesData = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="reposiContEdit">
        {repositoriesData.map(eachItem => (
          <RepositoryItem key={eachItem.id} details={eachItem} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="mainContEdit">
        <h1 className="head1Edit">Popular</h1>
        {this.getFilterItem()}
        {isLoading ? this.renderLoader() : this.renderRepositoriesData()}
      </div>
    )
  }
}

export default GithubPopularRepos
