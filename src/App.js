import React from "react";
import RepoList from './components/repoList';
import SearchForm from './components/searchForm';
import CommitList from './components/commitList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      showRepos: true,
      selectedRepo: '',
      selectedOrgName: '',
      errorMessage: '',
    };
  }

  updateRepos = repos =>{
    /* you can use short hand for this set states.  Since the value and property
    //are repos you could do something like
      this.setState({
      repos
    })
  };
    */
    this.setState({
      repos: repos
    })
  };

  addRepo = repos => {
    this.setState(prevState => ({
      repos: [...prevState.repos, ...repos],
    }));
  };

  hideRepos = () => {
    this.setState({
      showRepos: false
    });
  };

  showRepoList = () => {
    this.setState({
      showRepos: true
    });
  };

  updateSelectedRepo = repo => {
    this.setState({
      selectedRepo: repo
    });
  };

  updateSelectedOrgName = orgName => {
    this.setState({
      selectedOrgName: orgName
    });
  };

  setError = error => {
    this.setState({
      errorMessage: error
    });
  };

  render() {
  /* you could consider doing something like 
   {selectedOrgName, selectedRepo, errorMessage } = this.state
   this avoid have 'this.state' appear so much this is just a style thing */
   
  return (
    <div className="App">
      <h1>Github Search</h1>
      <h2>{this.state.errorMessage}</h2>
    {this.state.showRepos ? (
      <RepoList orgName = {this.state.selectedOrgName} updateSelectedRepo = {this.updateSelectedRepo} hideRepos = {this.hideRepos} repos = {this.state.repos} />
    ) : 
      ( <CommitList orgName ={this.state.selectedOrgName} commit = {this.state.selectedRepo} /> )}
    {this.state.showRepos ? (
      <SearchForm updateRepos = {this.updateRepos} setError = {this.setError} updateSelectedOrgName = {this.updateSelectedOrgName} addRepo={this.addRepo}/>
    ) : (<button onClick={this.showRepoList}>Back to Search</button>
    )}
    </div>

  );

  }
}

export default App;
